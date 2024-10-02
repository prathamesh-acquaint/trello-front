<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
</script>

<template>
  <h1 class="font-semibold text-2xl text-center">The Counter</h1>
  <div class="mx-auto w-fit mt-5">
    <div class="flex gap-5 items-center">
      <button class="btn" @click="counter.increment">+</button>
      <p class="font-semibold text-2xl">{{ counter.count }}</p>
      <button class="btn" @click="counter.decreament">-</button>
    </div>
  </div>
</template>
