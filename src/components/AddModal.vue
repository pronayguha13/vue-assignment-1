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
            cols="26"
            rows="5"
            v-model="studentInfo"
            placeholder="Enter student details..."
          ></textarea>
        </div>
      </div>
      <div id="button-section">
        <button
          @click="cancel"
          :disabled="isLoading"
          class="controller-button cancel-button"
        >
          Cancel
        </button>
        <button
          @click="createStudent"
          :disabled="isLoading"
          class="controller-button save-button"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import closeIcon from "../assets/close-icon.svg";
import { GenderConfig } from "../config/GenderConfig";
import { REQUEST_URL } from "@/config/UrlConfig";
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

          const response = await axios.post(REQUEST_URL, newStudent);
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
  justify-content: space-around;
  align-content: center;
  border-radius: 8px;
  padding-top: 4px;
}

#header-section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

#closeIcon {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
}

#inputSection {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.input-field {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
  margin-bottom: 8px;
}
.input-field input,
select {
  outline: none;
  width: 100%;
  border: none;
  border-bottom: 1px solid #000;
}

.input-field input,
select:active {
  outline: none;
  border-bottom: 2px solid #000;
}
.input-field textarea {
  outline: none;
  resize: none;
  padding: 4px;
}

#button-section {
  padding-bottom: 12px;
  width: 50%;
  align-self: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.controller-button {
  width: 45%;
  padding: 8px 4px;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
}

.cancel-button {
  background-color: crimson;
}

.save-button {
  background-color: #6a6ae6;
}
</style>
