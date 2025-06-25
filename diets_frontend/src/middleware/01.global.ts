
interface UserCookie {
    employeeid: string;
    user_name: string;
    user_level: keyof typeof ALLOWED_PAGES;
    firstname: string;
    lastname: string;
    middlename: string;
    postitle: string;
}

const GRANT_ALL_ACCESS = false;
const EXCLUDED_PAGES = [
    '/auth/login',
    '/error',
    '/auth/access',
    'development/funtionTests'
];

const ALLOWED_PAGES = {
    '1': ['/admin', '/doctor', '/dietary', '/foodserver', '/nurse'],
    '0': ['/doctor'],
    '59': ['/dietary', '/foodserver'],
    '60': ['/foodserver'],
    '63': ['/nurse'],
} as const;

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (GRANT_ALL_ACCESS) {
        return;
    }

    if (EXCLUDED_PAGES.includes(to.path)) {
        return handleExcludedPage(to);
    } else {
        return handleProtectedPage(to);
    }
});

function handleExcludedPage(to: { path: string }) {
    const authToken = useCookie('authToken').value;

    if (!authToken) {
        return;
    }

    const user = useCookie<UserCookie | null>('authUser').value;
    const userLevel = user?.user_level;

    if (!userLevel) {
        clearCookies();
        return navigateTo('/auth/login');
    }

    return navigateTo(ALLOWED_PAGES[userLevel][0]);
}

function handleProtectedPage(to: { path: string }) {
    const authToken = useCookie('authToken').value;

    if (!authToken) {
        clearCookies();
        return navigateTo('/auth/login');
    }

    const user = useCookie<UserCookie | null>('authUser').value;
    const userLevel = user?.user_level;

    if (!userLevel) {
        clearCookies();
        return navigateTo('/auth/login');
    }

    if (!to.path.startsWith(ALLOWED_PAGES[userLevel][0])) {
        return navigateTo(ALLOWED_PAGES[userLevel][0]);
    }
}

function clearCookies() {
    useCookie('authToken').value = null;
    useCookie<UserCookie | null>('authUser').value = null;
}