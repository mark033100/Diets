
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
    '/auth/access',
    '/development/functionTests'
];

const ALLOWED_PAGES = {
    '1': '/admin',
    '0': '/doctor',
    '59': '/dietary',
    '60': '/foodserver',
    '63': '/nurse'
} as const;

export default defineNuxtRouteMiddleware(async (to, from) => {

    if (GRANT_ALL_ACCESS) { // ----------------------------------------------------- 1️⃣ If GRANT_ALL_ACCESS is true then no authentication is required
        return;
    }

    if (EXCLUDED_PAGES.includes(to.path)) { // ------------------------------------- 2️⃣ If the page being accessed IS PART of excluded pages
        return handleExcludedPage(to);
    }

    return handleProtectedPage(to); // --------------------------------------------- 3️⃣ If the page being accessed IS NOT PART of excluded pages

});

function handleExcludedPage(to: { path: string }) {
    const authToken = useCookie('authToken').value;

    if (!authToken) { // ------------------------------------------------------------ 1️⃣ If user is not logged in: no authentication is required
        return;
    }

    const user = useCookie<UserCookie | null>('authUser').value;
    const userLevel = user?.user_level;

    if (!userLevel) { //------------------------------------------------------------- 2️⃣ If no user level found: Clear cookies and return
        clearCookies();
        return;
    }

    return navigateTo(ALLOWED_PAGES[userLevel]); // --------------------------------- 3️⃣ If user is logged in: Redirect to allowed page
}


function handleProtectedPage(to: { path: string }) {
    const authToken = useCookie('authToken').value;

    if (!authToken) { // ------------------------------------------------------------ 1️⃣ If user is not logged in: Redirect to login
        clearCookies();
        return navigateTo('/auth/login');
    }

    const user = useCookie<UserCookie | null>('authUser').value;
    const userLevel = user?.user_level;

    if (!userLevel) { //------------------------------------------------------------ 2️⃣ If no user level found: Clear cookies and redirect to login
        clearCookies();
        return navigateTo('/auth/login');
    }

    const allowed_page = ALLOWED_PAGES[userLevel]; // ------------------------------ 3️⃣ If the page being accessed is part of allowed pages

    if (!to.path.startsWith(allowed_page)) { // ------------------------------------ 4️⃣ If the page being accessed is not part of allowed pages: Redirect to allowed page
        return navigateTo(allowed_page);
    }
}

function clearCookies() {
    useCookie('authToken').value = null;
    useCookie<UserCookie | null>('authUser').value = null;
}