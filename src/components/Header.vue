<template>
  <div class="wrapper">
    <button class="controller-button delete-button">Delete</button
    ><button class="controller-button edit-button">Edit</button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.wrapper {
  width: 100%;
  background-color: #fff;
  color: #000;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  box-shadow: 0px 3px 4px 4px #b6989845;
}
.controller-button {
  padding: 10px;
  width: 64px;
  color: #fff;
  border: 0;
  margin-top: 4px;
  margin-bottom: 4px;
  margin-right: 8px;
  border-radius: 8px;
  cursor: pointer;
}

.controller-button:hover {
  font-weight: 600;
}

.delete-button {
  background-color: crimson;
}

.edit-button {
  background-color: #a5a1a1;
}
</style>
