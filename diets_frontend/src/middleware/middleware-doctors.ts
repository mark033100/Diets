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
    '60': ['/foodserver']
} as const;


export default defineNuxtRouteMiddleware((to, from) => {

    // const user = useCookie<UserCookie | null>('authUser').value;
    // const userLevel = <string>user?.user_level;

    // if (userLevel !== '0') { //-------------------------------------------------- 1️⃣ If user is not a doctor

    //     if (!from.name || to.fullPath === from.fullPath) { //-------------------- 2️⃣ If user is not coming from a page

    //         if (['1', '59', '60'].includes(userLevel)) { //---------------------- 3️⃣ If user level is not included in the list, then redirect to guest
    //             return navigateTo('/guest');
    //         }

    //         // if (!to.path.startsWith(ALLOWED_PAGES[userLevel][0])) {
    //         //     return navigateTo(ALLOWED_PAGES[userLevel][0]);
    //         // }

    //     }
    // }

})
