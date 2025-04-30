<template>
  <div>
    <Message severity="error"> 
      <template #icon>
        <Avatar :image="getErrorIcon(props.errorObject.errorIcon)" shape="circle" class="m-4" size="large"/>
      </template>
      <div>
        <p class="font-bold text-xl"> {{ props.errorObject.errorTitle }}</p>
        <p class=""> {{ props.errorObject.errorMessage }}</p>
      </div>
    </Message>
  </div>
</template>

<script lang="ts" setup>
import type { InlineErrorInterface } from '~/types/errorInterfaces/errorInterface_v1';

const props = defineProps<{
  errorObject: InlineErrorInterface;
}>();

</script>
