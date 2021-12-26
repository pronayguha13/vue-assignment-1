<template>
  <div class="modal-wrapper" @click.self="toggleModalStatus">
    <div class="modal">
      <label for="fieldName"> Choose Field Name </label>
      <select
        name="fieldName"
        id="fieldName"
        :value="selectedFieldName"
        @change="setSelectedField"
      >
        <option value="name">Name</option>
        <option value="gender">Gender</option>
        <option value="info">Info</option>
      </select>
      <p>Selected Field Name: {{ selectedFieldName }}</p>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { FieldNameConfig } from "@/config/FieldNameConfig";

export default {
  setup(_, { emit }) {
    const selectedFieldName = ref("");
    const toggleModalStatus = () => {
      emit("toggleModal");
    };

    const setSelectedField = (e) => {
      const tempSelectedFieldName = e.target.value;
      for (const key in FieldNameConfig) {
        if (FieldNameConfig.hasOwnProperty(tempSelectedFieldName)) {
          const fieldName = FieldNameConfig[key];
          if (e.target.value === key) selectedFieldName.value = fieldName;
        }
      }
    };

    watch(selectedFieldName, (newValue, oldValue) => {
      console.log(
        "🚀 ~ file: EditModal.vue ~ line 46 ~ watch ~ newValue, oldValue",
        newValue,
        oldValue
      );
    });

    return { toggleModalStatus, selectedFieldName, setSelectedField };
  },
};
</script>

<style scoped>
.modal-wrapper {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.384);
}

.modal {
  background-color: white;
  color: #000;
  font-size: 20px;
}
</style>
