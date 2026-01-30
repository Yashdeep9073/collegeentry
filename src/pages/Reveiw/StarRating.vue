<template>
  <div class="flex gap-2">
    <span
      v-for="star in 5"
      :key="star"
      class="cursor-pointer text-3xl"
      :class="star <= modelValue ? 'text-yellow-400' : 'text-gray-300'"
      @click="$emit('update:modelValue', star)"
    >
      ★
    </span>
  </div>
</template>

<script setup>
defineProps({
  modelValue: Number,
});
defineEmits(["update:modelValue"]);
</script>
