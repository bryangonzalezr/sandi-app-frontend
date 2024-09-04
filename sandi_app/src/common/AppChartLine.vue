<script setup>
import { ref } from "vue";
import { Line } from "vue-chartjs";

const props = defineProps({
  data:{
    type: Array,
    required: true
  },
  options: {
    type: Object,
  },
  label: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  dates:{
    type: Array,
    required: true
  },
});

const dataProcessed = ref({});
const optionsProcessed = ref({});


  dataProcessed.value = {
    labels: props.dates,
    datasets: [
        {
            label: props.label,
            data: props.data,
            backgroundColor: 'rgba(236,196,220, 1)',
            borderColor: 'rgba(236,196,220, 1)',
            type: 'line',
        }
    ],
}

optionsProcessed.value = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: props.title,
      },
      legend: {
        display: false,
      }
    },
    ...props.options,
}
</script>

<template>
  <Line id="my-chart-id" :data="dataProcessed.value" :options="optionsProcessed.value" />
</template>