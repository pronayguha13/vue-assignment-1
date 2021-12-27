<template>
  <button class="floating-button" @click="addNewStudent">
    <img :src="addIcon" alt="add record" />
  </button>
</template>

<script>
import addIcon from "../assets/add.svg";

export default {
  setup(_, { emit }) {
    const addNewStudent = () => {
      const newStudentDetails = {};
      emit("add");
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
