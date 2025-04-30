<template>
  <div>
    <button class="button">
      <p class="button_text text-xl"> CREATE DIET ORDER </p>
    </button>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
button {
  --bg: #059669;
  position: relative;
  width: 250px;
  border: none;
  background: var(--primary-color);
  padding: 1em;
  transition: 0.2s;
  border-radius: 5px;
  letter-spacing: 1px;
  box-shadow: color-mix(in srgb, var(--primary-color) 40%, black) 0px 7px 2px, rgba(0, 0, 0, 0.7) 0px 8px 5px
}

button:hover {
  opacity: 1;
}

button:active {
  top: 4px;
  box-shadow: var(--primary-color) 0px 3px 2px,#000 0px 3px 5px;
}

.button_text {
  color: var(--primary-contrast-color);
  font-size: 1.35rem;
  font-weight: bolder;
}
</style>