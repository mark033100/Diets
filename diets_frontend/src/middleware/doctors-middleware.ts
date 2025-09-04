
import { useLayout } from "~/layouts/composables/layout.js";

export default defineNuxtRouteMiddleware((to, from) => {

    const { setMenuMode } = useLayout();

    setMenuMode('overlay');


})
