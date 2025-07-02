<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';
import MenuLists from '~/assets/json/MenuLists.json';

const authUserCookie = useCookie('authUser');
const user_level = authUserCookie.value?.user_level || '-1';

const { AdminMenuList, DietaryMenuList, NurseMenuList, DefaultMenuList } = MenuLists;

const menu_list_options = {
    '1': AdminMenuList,
    '63': NurseMenuList,
    '59': DietaryMenuList
};

const menu_list = ref(menu_list_options[user_level] || DefaultMenuList);


</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in menu_list" >
            <app-menu-item v-if="!item.separator" :item="item" :index="i" :key="item"></app-menu-item>
            <li v-if="item.separator" class="menu-separator" :key="item"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped>

</style>
