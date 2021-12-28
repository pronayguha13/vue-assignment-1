<template>
  <div id="add-modal-container" @click.self="cancel">
    <div id="add-modal">
      <div id="header-section">
        <p>Add New Student Details</p>
        <img :src="closeIcon" alt="close" id="closeIcon" @click="cancel" />
      </div>
      <div id="inputSection">
        <div class="input-field">
          <label for="name">Name</label>
          <input type="text" v-model="studentName" />
        </div>
        <div class="input-field">
          <label for="gender">Gender</label>
          <select name="gender" id="gender" v-model="studentGender">
            <option value="none" disabled>Select your Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="input-field">
          <label for="info">Info</label>
          <textarea
            name="info"
            id="info"
            cols="30"
            rows="10"
            v-model="studentInfo"
          ></textarea>
        </div>
      </div>
      <div id="button-section">
        <button @click="cancel" :disabled="isLoading">Cancel</button>
        <button @click="createStudent" :disabled="isLoading">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import closeIcon from "../assets/close-icon.svg";
import { GenderConfig } from "../config/GenderConfig";
import { capitalizeFirstLetter } from "../helper";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default {
  setup(_, { emit }) {
    let studentName = ref("");
    let studentGender = ref("none");
    let studentInfo = ref("");
    let isLoading = ref(false);

    //create student handler
    const createStudent = async () => {
      isLoading.value = true;
      let genderKey;
      if (studentGender.value !== "none") {
        for (const key in GenderConfig) {
          if (Object.hasOwnProperty.call(GenderConfig, key)) {
            const element = GenderConfig[key];

            if (element === capitalizeFirstLetter(studentGender.value)) {
              genderKey = key;
              break;
            }
          }
        }
      } else {
        alert("Please select a gender...");
        return;
      }

      if (studentName.value.length && genderKey && studentInfo.value?.length) {
        try {
          const newStudent = {
            id: uuidv4(),
            Name: capitalizeFirstLetter(studentName.value),
            Gender: genderKey,
            Info: studentInfo.value,
          };

          const response = await axios.post(
            "http://localhost:3000/students",
            newStudent
          );
          emit("create");
        } catch (error) {
          console.log(
            "🚀 ~ file: AddModal.vue ~ line 90 ~ createStudent ~ error",
            error
          );
        } finally {
          isLoading.value = false;
        }
      } else {
        alert("Please fill in all the details...");
      }
    };

    //cancel handler
    const cancel = () => {
      emit("toggle");
    };

    return {
      closeIcon,
      studentName,
      studentGender,
      studentInfo,
      isLoading,
      createStudent,
      cancel,
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
  position: relative;
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
  padding-top: 4px;
}

#header-section {
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#closeIcon {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
}
</style>
