<template>
  <div>
    <Button rounded raised
      class="p-1 text-xl  hover:scale-110" 
      :severity="props.severity" 
      :class="props.css" 
      :size="props.size"
      :variant="props.variant"
      @click="$emit('clicked')">
      <Icon :name="props.icon" />
      {{ props.label }}
    </Button>
  </div>
</template>

<script lang="ts" setup>


const props = defineProps({

  label : {
    type : String,
    default : ''
  },
  icon: {
    type: String,
    default: ''
  },
  size: {
    type: String as () => 'small' | 'large' | undefined,
    default: ''
  },
  severity: {
    type: String,
    default: 'primary'
  },
  css: {
    type: String,
    default: ''
  },
  variant: {
    type: String as () => 'outlined' | 'text' | undefined,
    default: ''
  }

});


const emit = defineEmits(['clicked']);

</script>

<style>

</style>