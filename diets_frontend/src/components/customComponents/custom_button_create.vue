<script lang="ts" setup>
const isDarkMode = document?.documentElement?.classList?.contains("app-dark");


const props = defineProps({

  label : {
    type : String,
    default : ''
  },
});

const emit = defineEmits(['clickedButton']);


</script>


<template>
  <div class="">
    <button href="#" class="button" style="--clr: #059669;" @click="emit('clickedButton')">
      <span class="button-decor"></span>
      <div class="button-content">
        <div class="button__icon">
          <i class="pi pi-plus-circle font-bold text-slate-100 text-xl" />
        </div>
        <span class="button__text">Create Doctors Order</span>
      </div>
    </button>
  </div>
</template>



<style scoped>
.button {
  text-decoration: none;
  line-height: 1;
  border-radius: 1.5rem;
  overflow: hidden;
  position: relative;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.05);
  background-color: #fff;
  color: #403F3F;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
}

.button-decor {
  position: absolute;
  inset: 0;
  background-color: var(--clr);
  transform: translateX(-100%);
  transition: transform 0.3s;
  z-index: 0;
}

.button-content {
  display: flex;
  align-items: center;
  font-weight: 600;
  position: relative;
  overflow: hidden;
}

.button__icon {
  width: 52px;
  height: 48px;
  background-color: var(--clr);
  display: grid;
  place-items: center;
  
}

.button__text {
  display: inline-block;
  transition: color 0.2s;
  padding-left: 0.5rem;
  padding-right: 0.75rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.button:hover .button__text {
  color: #fff;
}

.button:hover .button-decor {
  transform: translate(0);
}



</style>