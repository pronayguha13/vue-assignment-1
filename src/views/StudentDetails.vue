<template>
  <div v-if="isLoading">Loading...</div>
  <div
    v-else-if="
      studentDetails && Object.keys(studentDetails).length && !isLoading
    "
  >
    <Header />
    <div class="container">
      <div class="name">
        <h3>{{ studentDetails.Name }} - {{ gender }}</h3>
      </div>
      <p>{{ studentDetails?.Info }}</p>
    </div>
  </div>
  <div
    v-else-if="
      (!studentDetails || !Object.keys(studentDetails).length) && !isLoading
    "
  >
    No Data Found...
  </div>
</template>

<script>
import axios from "axios";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { GenderConfig } from "@/config/GenderConfig";

import Header from "@/components/Header";

export default {
  components: {
    Header,
  },
  setup() {
    const router = useRouter();
    const studentDetails = ref(null);
    const isLoading = ref(false);

    const id = router.currentRoute?.value?.params?.id;

    (async () => {
      try {
        isLoading.value = true;
        const response = await axios.get(
          "http://localhost:3000/students/" + id
        );
        const data = response.data;
        studentDetails.value = data;
      } catch (error) {
        console.log("error:>>", error);
      } finally {
        isLoading.value = false;
      }
    })();
    const gender = computed(() => {
      let genderData = null;

      for (const key in GenderConfig) {
        if (Object.hasOwnProperty.call(GenderConfig, key)) {
          if (key === studentDetails?.value?.Gender) {
            genderData = GenderConfig[key];
            break;
          }
        }
      }

      return genderData;
    });

    return { studentDetails, isLoading, gender };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  margin: 30% auto;
  background-color: #fffdfd;
  width: 80%;
  padding: 24px 0;
  border-radius: 16px;
}

.name {
  border-bottom: 1px solid #eee;
  margin-bottom: 8px;
  box-shadow: 0px 3px 2px 2px #ddd;
}
</style>
