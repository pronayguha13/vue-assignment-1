<template>
  <div id="add-modal-container">
    <div id="add-modal">
      <div id="header-section">
        <p>Add New Student Details</p>
        <img :src="closeIcon" alt="close" />
      </div>
      <div id="inputSection">
        <input type="text" />
      </div>
    </div>
  </div>
</template>

<script>
import closeIcon from "../assets/close-icon.svg";

export default {
  setup() {
    return {
      closeIcon,
    };
  },
};
</script>

<style scoped>
#add-modal-container {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #0000005e;
}

#add-modal {
  background-color: white;
  color: #000;
  font-size: 20px;
  height: 50%;
  width: 50%;
  margin: 25% auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 8px;
}

#header-section {
  position: relative;
  top: 0;
}
</style>
