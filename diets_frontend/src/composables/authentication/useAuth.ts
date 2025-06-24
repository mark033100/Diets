interface LoginResponse {
  user: any;
  token: string;
}

import type { interface_userFetchResult } from '~/types/objectTypes';

export const useAuth = () => {
  const user = useState('user', () => null);
  const response = ref();
  const authTokenCookie = useCookie('authToken');
  const authUserCookie = useCookie<interface_userFetchResult | null>('authUser');

  const login = async (credentials: { username: string; password: string }, rememberMe: boolean) => {

    try {
      const result: LoginResponse = await $fetch('/api/auth/login', {
        method: 'POST',
        body: credentials
      });

      const cookieOptions = rememberMe
        ? { maxAge: 60 * 60 * 24 * 30 }    // 30 days
        : { maxAge: 60 * 60 * 24 }; // 1 day

      const authTokenCookie = useCookie('authToken', cookieOptions);
      authTokenCookie.value = result.token;

      return response.value = {
        status: 'success',
        title: 'Login successful',
        description: 'You have successfully logged in',
        error: null
      };

    } catch (error) {

      return response.value = {
        status: 'error',
        title: 'Login failed',
        description: 'Error Logging in!',
        error: error
      }

    }


  }

  const logout = async () => {

    if (!authTokenCookie.value) {
      console.log('No auth token found, user is not logged in');
      return response.value = {
        status: 'error',
        title: 'Logout failed',
        description: 'You are not logged in',
        error: null
      };
    }

    try {

      const result = await $fetch(`/api/auth/logout`, {
        method: 'POST',
        body: { token: authTokenCookie.value }
      });

      authTokenCookie.value = null;
      authUserCookie.value = null;

      return response.value = {
        status: 'success',
        title: 'Logout successful',
        description: 'You have successfully logged out',
        error: null
      };

    } catch (error) {
      return response.value = {
        status: 'error',
        title: 'Logout failed',
        description: 'Something went wrong during logout',
        error
      };
    }


  };


  const fetchUserDetails = async () => {

    if (!authTokenCookie.value) {
      return response.value = {
        status: 'error',
        title: 'User fetch failed',
        description: 'You are not logged in',
        error: null,
        data: null
      };
    }

    try {

      const result: interface_userFetchResult = await $fetch(`/api/auth/user/`, {
        method: 'POST',
        body: { token: authTokenCookie.value }
      });

      const user_level = check_position(result.postitle);

      authUserCookie.value = {
        employeeid: result.employeeid,
        user_name: result.user_name,
        user_level: user_level,
        firstname: result.firstname,
        lastname: result.lastname,
        middlename: result.middlename,
        postitle: result.postitle
      };

      return response.value = {
        status: 'success',
        title: 'User fetched successfully',
        description: 'You have successfully fetched user',
        error: null,
        data: result
      };


    } catch (error) {
      return response.value = {
        status: 'error',
        title: 'User fetch failed',
        description: 'Something went wrong during user fetch',
        error,
        data: null
      };

    }
  }

  // Helper Functions

  function check_position(position: string): string {
    const positionsMap = new Map<string, string[]>([
      ['0', ['medical specialist', 'medical officer']], // Doctor
      ['1', ['programmer', 'computer programmer', 'computer maintenance technologist', 'information system analyst']], // Programmer
      ['59', ['nutritionist', 'dietitian', 'dietician']], // Dietitian
      ['60', ['food server', 'server']],
      ['63', ['nurse', 'nursing', 'nurse i']], // Nurse
    ]);

    const lowerCasePosition = position?.toLowerCase();
    for (const [code, titles] of positionsMap) {
      if (titles.some(title => lowerCasePosition?.includes(title))) {
        return code;
      }
    }

    return '';
  }

  return { user, login, logout, fetchUserDetails, check_position };
};
