
<script lang="ts" setup>
  import { ref } from 'vue';
  import { useAuth } from '~/composables/authentication/useAuth';

const userInfo = useCookie('authUser') as unknown as { firstname: string; lastname: string; postitle: string };
const router = useRouter(); 
const loading = ref(false);
const toast = useToast();

const clickedLogout = async () => {
  loading.value = true;
  const result = await useAuth().logout();
  
  if (result.status === 'success') {
    router.push('/auth/login');
  } else {
    toast.add({ severity: 'error', summary: 'Logout Failed', detail: result.description, life: 3000  });
  }
  loading.value = false;

}

</script>



<template>
  <div class="p-2">
    <p class="font-semibold p-0 m-0"> <Icon name="healthicons:person" /> {{ userInfo.firstname }} {{ userInfo.lastname }}</p>
    <p style="font-style: italic" class="text-xs ml-5">{{ userInfo.postitle }}</p>
    <div class="w-full flex justify-end">
      <Button :label="loading ? 'Logging Out...' : 'Log Out'" severity="danger" :loading="loading" @click="clickedLogout" raised text />
    </div>
    
  </div>
</template>


<style>

</style>