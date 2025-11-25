<template>
  <svg :class="classes" viewBox="0 0 24 24" fill="url(#grad)">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#E04A00" />
        <stop offset="50%" stop-color="#FF5C00" />
        <stop offset="100%" stop-color="#FFA040" />
      </linearGradient>
    </defs>

    <component :is="icon" />
  </svg>
</template>

<script>
export default {
  props: {
    icon: Object,
    classes: String,
  },
};
</script>
