<script lang="ts" setup>

const submenu = [
    'Maintenance',
    'Services',
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
      <h3 class="m-0">General Settings </h3>
      <p class="text-sm"> General Settings for DIETS </p>
    </section>

    <Tabs value="0" class="card">
      <TabList>
        <Tab v-for="(item, index) in submenu" :key="index" :value="index.toString()">{{ item }}</Tab>
      </TabList>
      <ConfirmDialog />
      <TabPanel value='0'>
        <div class="p-4 mt-10">

          <h3 class="text-xl font-semibold"> System Maintenance</h3>
          <section class="flex justify-between items-center my-12 "> <!-- Maintenance Mode Section -->
            <div class="w-3/4">
              <h4 class="text-sm font-semibold">Enable System Maintenance</h4>
              <p class="text-sm text-gray-600">When enabled, the system will undergo maintenance and will restrict any user other than the admin to access the web app.</p>
            </div>
            <div class="w-1/4 text-right">
              <ToggleSwitch v-model="maintenanceMode" @click="confirm_settings_toggle_maintenance" class="w-20" />
            </div>
          </section>

          <Divider dashed class="my-6" />

          <h3 class="text-xl font-semibold"> Services Maintenance</h3>
          <section class="flex justify-between items-center my-12 "> <!-- Maintenance Mode Section -->
            <div class="w-3/4">
              <h4 class="text-sm font-semibold">Disable Doctor's Order</h4>
              <p class="text-sm text-gray-600">Disables the Create Doctor's Order Button and prevents Doctors to create new Diet Orders. </p>
            </div>
            <div>
              <ToggleSwitch v-model="maintenanceMode" @click="confirm_settings_toggle_maintenance" class="w-20" />
            </div>
          </section>

          <section class="flex justify-between items-center my-12 "> <!-- Maintenance Mode Section -->
            <div class="w-3/4">
              <h4 class="text-sm font-semibold">Disable Patient Search</h4>
              <p class="text-sm text-gray-600">Disables the Patient Search Button and prevents any users in clicking it. </p>
            </div>
            <div>
              <ToggleSwitch v-model="maintenanceMode" @click="confirm_settings_toggle_maintenance" class="w-20" />
            </div>
          </section>

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