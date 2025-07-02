
interface UserCookie {
    employeeid: string;
    user_name: string;
    user_level: string;
    firstname: string;
    lastname: string;
    middlename: string;
    postitle: string;
}

const ALLOWED_PAGES = {
    '1': ['/admin', '/doctor', '/dietary', '/foodserver', '/nurse'],
    '0': ['/doctor'],
    '59': ['/dietary', '/foodserver'],
    '60': ['/foodserver'],
    '63': ['/guest'],
} as const;


export default defineNuxtRouteMiddleware((to, from) => {
    // const authToken = useCookie('authToken').value;

    // if (!authToken && to.path !== '/auth/login') {
    //     clearCookies();
    //     return navigateTo('/auth/login');
    // }

    // const user = useCookie<UserCookie | null>('authUser').value;
    // const userLevel = user?.user_level;

    // if (!userLevel && to.path !== '/auth/login') {
    //     clearCookies();
    //     return navigateTo('/auth/login');
    // }
})


function clearCookies() {
    useCookie('authToken').value = null;
    useCookie<UserCookie | null>('authUser').value = null;
}