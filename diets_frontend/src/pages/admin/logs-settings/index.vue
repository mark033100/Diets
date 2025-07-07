<script lang="ts" setup>

const submenu = [
    'Dietary Logs',
    'Diet Types',
    'Allergies & Precautions',
    'Diets'
]

const maintenanceMode = ref(false);


const confirm_settings_toggle_maintenance = () => {
    if (maintenanceMode.value) {
        // Logic to handle enabling maintenance mode
    } else {
        // Logic to handle disabling maintenance mode
    }
};

</script>


<template>
  <div>
    <section class="card">
      <p class=" flex items-center gap-2 mb-6 text-sm">
        <a><i class="pi pi-home"></i> Home</a>
        <a><i class="pi pi-angle-right"></i> General Settings</a>
      </p>
      <h3 class="m-0">Logs Settings </h3>
      <p class="text-sm"> History logs and other type of logs</p>
    </section>

    <Tabs value="0" class="card">
      <TabList>
        <Tab v-for="(item, index) in submenu" :key="index" :value="index.toString()">{{ item }}</Tab>
      </TabList>
      <ConfirmDialog />
      <TabPanel value='0'>
        <div class="p-4 mt-10">

          <div class="flex justify-between items-center mb-4">
            <section>
              <h4 class="text-lg font-semibold">Dietary Logs</h4>
              <p class="text-sm text-gray-600">Closes the DIETS Web Application and will show a maintenance page to users.</p>
            </section>
            <section>
              <ToggleSwitch v-model="maintenanceMode" @click="confirm_settings_toggle_maintenance" class="w-20" />
            </section>
          </div>

        </div>
      </TabPanel>
      <TabPanel value="1">
        <p>Diet Types Content</p>
      </TabPanel>
      <TabPanel value="2">
        <p>Allergies & Precautions Content</p>
      </TabPanel>
      <TabPanel value="3">
        <p>Diets Content</p>
      </TabPanel>
    </Tabs>
  </div>
</template>


<style>

</style>