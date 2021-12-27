<template>
  <button class="floating-button" @click="addNewStudent">
    <img :src="addIcon" alt="add record" />
  </button>
</template>

<script>
import addIcon from "../assets/add.svg";
export default {
  setup() {
    const addNewStudent = () => {
      const newStudentDetails = {};
      console.log("Add button clicked");
    };
    return {
      addIcon,
      addNewStudent,
    };
  },
};
</script>

<style scoped>
.floating-button {
  position: sticky !important;
  bottom: 10% !important;
  left: 90%;
  z-index: 100;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background-color: #ddd;
  cursor: pointer;
}
</style>
