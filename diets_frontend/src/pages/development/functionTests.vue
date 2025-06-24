<template>
  <div>
    <p> Output: {{ check_position('Nurse I') }}</p>
  </div>
</template>

<script lang="ts" setup>


/**
 * Determines the code corresponding to a given job position title.
 *
 * This function maps a given position title to a specific code based on predefined job titles.
 * The mapping is case-insensitive and checks if any predefined title is included in the given position title.
 * If a position title matches any of the job titles within a category, the corresponding code is returned.
 * If no match is found, an empty string is returned.
 * 
 * Location: src/composables/useAuth.ts
 * @param {string} position - The job position title to check.
 * @returns {string} - The code corresponding to the job position title, or an empty string if no match is found.
 */

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
</script>

<style>

</style>