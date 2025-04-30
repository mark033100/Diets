<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';
import MenuLists from '~/assets/json/MenuLists.json';


const doctorsSideMenuItems = ref([
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
    },
    {
        label: 'Services',
        items: [
            { label: 'Search Patient', icon: 'pi pi-search', to: '/doctor/search-patient' },
            { label: 'NAR', icon: 'pi pi-fw pi-check-square', to: '/doctor/nar' },
        ]
    },
]);

const adminMenuList = MenuLists.AdminMenuList;

</script>

<template>
    <ul class="layout-menu">
        <!-- <template v-for="(item, i) in doctorsSideMenuItems" >
            <app-menu-item v-if="!item.separator" :item="item" :index="i" :key="item"></app-menu-item>
            <li v-if="item.separator" class="menu-separator" :key="item"></li>
        </template> -->
        <template v-for="(item, i) in adminMenuList" >
            <app-menu-item v-if="!item.separator" :item="item" :index="i" :key="item"></app-menu-item>
            <li v-if="item.separator" class="menu-separator" :key="item"></li>

        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
