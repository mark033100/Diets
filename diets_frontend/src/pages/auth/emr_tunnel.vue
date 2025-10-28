
<script lang="ts" setup>
import { useRoute } from 'nuxt/app';
import type { interface_userFetchResult } from '~/types/objectTypes';

definePageMeta({
    layout: false
})

const route = useRoute();
const params = route.query;
const authTokenCookie = useCookie('authToken', { maxAge: 60 * 60 * 24 });
const authUserCookie = useCookie<interface_userFetchResult | null>('authUser');

if (!params.token || !params.enccode || !params.hpercode) {
    navigateTo('/auth/login');
}

clearCookies(); 
setCookies();

navigateTo('/doctor/' + params.enccode + '+' + params.hpercode);

function clearCookies() {
    authTokenCookie.value = null;
    authUserCookie.value = null;
}

function setCookies() { 
    authTokenCookie.value = params.token as string;
    authUserCookie.value = {
        employeeid: String(params.employeeid),  // Ensure it's a string
        user_name: String(params.user_name),
        user_level: String(params.user_level),
        firstname: String(params.firstname),
        lastname: String(params.lastname),
        middlename: String(params.middlename),
        postitle: String(params.postitle),
    };
}

</script>
