<script setup>
// Importar desde Vue, Vue-Router, Pinia en el orden respectivo 
import { onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { useProgressBarStore } from "@/stores"

const router = useRouter();

const progressBarStore = useProgressBarStore();
const { progress } = storeToRefs(progressBarStore)

onMounted(() => {
    this.checkProgress();
}) 

onBeforeUnmount(() => {
    clearInterval(this.progressInterval);
}) 
  </script>
<template>
    <div>
      <div class="progress-bar">
        <div
          class="progress-fill"
          :style="{ width: progress + '%' }"
        ></div>
      </div>
      <p>{{ progress }}%</p>
    </div>
  </template>
  
  <style scoped>
  .progress-bar {
    width: 100%;
    height: 24px;
    background-color: #e0e0e0;
    border-radius: 12px;
    overflow: hidden;
    margin: 20px 0;
  }
  
  .progress-fill {
    height: 100%;
    background-color: #4caf50;
    transition: width 0.5s;
  }
  </style>