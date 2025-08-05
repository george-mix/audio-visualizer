<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from "vue";

const canvasName = "canvas";
const canvas = useTemplateRef<HTMLCanvasElement>(canvasName);

const canvasContext = ref();
const audioData = ref<ArrayBuffer>();

const audioContext = ref(new AudioContext());

const isControlsVisible = ref(false);
const toggleShowControls = () => {
  isControlsVisible.value = !isControlsVisible.value;
};

const visualize = (audioBuffer: AudioBuffer) => {
  const width = canvas.value?.width;
  const height = canvas.value?.height;

  if (!width || !height) return;

  const analyser = audioContext.value.createAnalyser();
  analyser.fftSize = 256;

  const frequencyBufferLength = analyser.frequencyBinCount;
  const frequencyData = new Uint8Array(frequencyBufferLength);

  const source = audioContext.value.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(analyser);
  analyser.connect(audioContext.value.destination);
  source.start();

  const barWidth = width / frequencyBufferLength;

  const draw = () => {
    requestAnimationFrame(draw);
    canvasContext.value.fillStyle = "rgb(173, 216, 230)";
    canvasContext.value.fillRect(0, 0, width, height);

    analyser.getByteFrequencyData(frequencyData);

    for (let i = 0; i < frequencyBufferLength; i++) {
      canvasContext.value.fillStyle = "rgb(" + frequencyData[i] + ",118, 138)";
      canvasContext.value.fillRect(
        i * barWidth,
        height - frequencyData[i],
        barWidth - 1,
        frequencyData[i]
      );
    }
  };

  draw();
};

const changeFile = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files) return;
  const file = target.files[0];

  const reader = new FileReader();
  reader.addEventListener("load", (event) => {
    const arrayBuffer = event.target?.result;
    if (!arrayBuffer || typeof arrayBuffer === "string") return;

    audioContext.value.decodeAudioData(arrayBuffer, (audioBuffer) => {
      visualize(audioBuffer);
    });
  });
  reader.readAsArrayBuffer(file);
};

onMounted(async () => {
  if (!canvasContext.value && canvas.value) {
    canvasContext.value = canvas.value.getContext("2d");
  }
});
</script>

<template>
  <div class="App">
    <canvas class="canvas" :ref="canvasName"></canvas>
    <div class="controlsBlock">
      <button v-if="!isControlsVisible" @click="toggleShowControls">
        Show controls
      </button>
      <div class="controls" :class="{ visible: isControlsVisible }">
        <button @click="toggleShowControls">close controls</button>\
        <input
          class="audioInput"
          type="file"
          accept="audio/*"
          @change="changeFile"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.App {
  width: 100vw;
  min-height: 100vh;
  position: relative;

  .canvas {
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    bottom: 0;
  }

  .controlsBlock {
    position: fixed;
    top: 0;
    height: 200px;
    width: 100%;
  }

  .controls {
    height: 100%;
    width: 100%;
    background-color: black;
    visibility: hidden;
  }

  .visible {
    visibility: visible;
  }

  .audioInput {
  }
}
</style>
