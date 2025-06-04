<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';
import MenuLists from '~/assets/json/MenuLists.json';


const { AdminMenuList, DoctorDietMenu } = MenuLists;

</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in DoctorDietMenu" >
            <app-menu-item v-if="!item.separator" :item="item" :index="i" :key="item"></app-menu-item>
            <li v-if="item.separator" class="menu-separator" :key="item"></li>

        </template>
    </ul>
</template>

<style lang="scss" scoped>

</style>
