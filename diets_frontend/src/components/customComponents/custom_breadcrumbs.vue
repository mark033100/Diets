<template>
    <div> 
        <!-- {{ store.currentRoute }} -->
        <Breadcrumb :home="home" :model="list" class="rounded-lg p-12">
            <template #item="{ item, props }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a :href="href" v-bind="props.action" @click="navigate">
                        <span :class="[item.icon, 'text-color']" />
                        <span class="text-primary font-semibold">{{ item.label }}</span>
                    </a>
                </router-link>
                <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                    <span class="text-surface-700 dark:text-surface-0">{{ item.label }}</span>
                </a>
            </template>
        </Breadcrumb>

        <h1>Patient Details</h1>
    </div>
</template>

<script lang="ts" setup>
import { useMyMiscellaneousStore } from '@/stores/miscellaneous';
const store = useMyMiscellaneousStore();

const emit = defineEmits(['clickedButton_patientSearch']);
const props = defineProps({ selectedItem: String });
const router = useRouter();

const RouteList = router.currentRoute.value.fullPath.split('/').filter(Boolean);
const list = RouteList.map(item => ({ label: item }));

const home = ref({
    icon: 'pi pi-home',
    route: '/'
});

const currentRoute = ref(RouteList[RouteList.length - 1]);


</script>

<style>

</style>