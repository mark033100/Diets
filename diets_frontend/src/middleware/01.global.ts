import { useAuth } from '~/composables/authentication/useAuth';

export default defineNuxtRouteMiddleware(async (to, from) => {

    const grantAllAccess = false;
    if (grantAllAccess) {
        return
    }
    interface interface_userAuth {
        data: {
            user_level: keyof typeof allowedPages
        },
        status: 'success' | 'error'
    }

    interface user_cookie {
        employeeid: string;
        user_name: string;
        user_level: keyof typeof allowedPages;
        firstname: string;
        lastname: string;
        middlename: string;
        postitle: string;
    }

    // List of pages that should be excluded from the middleware
    const excludedPages = [
        '/auth/login',
        '/error',
        '/auth/access',
    ]

    const allowedPages = {
        '1': ['/admin', '/doctor', '/dietary', '/foodserver', '/nurse'],
        '0': ['/doctor'],
        '59': ['/dietary', '/foodserver'],
        '60': ['/foodserver'],
        '63': ['/nurse'],
    }

    if (excludedPages.includes(to.path)) {

        const user_auth_cookie = useCookie('authToken');

        if (user_auth_cookie.value) {

            const user = useCookie<user_cookie | null>('authUser');
            const userLevel = user.value?.user_level;

            if (!userLevel) {
                clear_cookies();
                return navigateTo('/auth/login');
            }

            return navigateTo(allowedPages[userLevel][0]);
        }

    } else {

        const user_auth_cookie = useCookie('authToken');

        if (!user_auth_cookie.value) {
            clear_cookies();
            return navigateTo('/auth/login');
        }

        const user = useCookie<user_cookie | null>('authUser');
        const userLevel = user.value?.user_level;

        if (!userLevel) {
            clear_cookies();
            return navigateTo('/auth/login');
        }

        // If path is not in allowed pages for the user level, redirect to the first allowed page
        if (!allowedPages[userLevel].includes(to.path)) {

            return navigateTo(allowedPages[userLevel][0]);
        }

    }


    function clear_cookies() {
        const user_auth_cookie = useCookie('authToken');
        const user = useCookie<user_cookie | null>('authUser');

        user_auth_cookie.value = null;
        user.value = null;
    }


})
