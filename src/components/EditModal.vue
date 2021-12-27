<template>
  <div class="modal-wrapper" @click.self="toggleModalStatus">
    <div class="modal">
      <div class="closeIconContainer">
        <img :src="closeIcon" alt="close" @click="toggleModalStatus" />
      </div>
      <label for="fieldName"> Choose Field Name </label>
      <select name="fieldName" id="fieldName" v-model="selectedFieldName">
        <option value="name">Name</option>
        <option value="gender">Gender</option>
        <option value="info">Info</option>
      </select>
      <div class="inputFieldContainer" v-if="selectedFieldName.length">
        <!-- name input field -->
        <div class="inputField" v-if="selectedFieldName === 'name'">
          <label for="name">Enter new name</label>
          <input type="text" v-model="editedName" @change="changeName" />
        </div>
        <!-- gender input field -->
        <div class="inputField" v-else-if="selectedFieldName === 'gender'">
          <label for="gender">Select Gender</label>
          <select name="gender" id="gender" v-model="editedGender">
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </div>
        <!-- info input field -->
        <div class="inputField" v-else-if="selectedFieldName === 'info'">
          <textarea
            name="info"
            id="info"
            cols="30"
            rows="10"
            v-model="editedInfo"
            @change="changeInfo"
          ></textarea>
        </div>
        <div>
          <button
            class="controller-button cancel-button"
            @click="toggleModalStatus"
          >
            Cancel
          </button>
          <button
            class="controller-button confirm-button"
            @click="confirmChangeHandler"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { GenderConfig } from "@/config/GenderConfig";
import { FieldNameConfig } from "@/config/FieldNameConfig";
import { capitalizeFirstLetter } from "../helper/index";
import closeIcon from "@/assets/close-icon.svg";

export default {
  props: ["studentData"],
  setup(props, { emit }) {
    const selectedFieldName = ref("name");
    const editedName = ref(props.studentData.Name);
    const editedGender = ref(
      GenderConfig[props.studentData.Gender].toLowerCase()
    );

    const editedInfo = ref(props.studentData.Info);

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
    const changeName = (e) => {
      // editedName.value = e.target.value;
    };

    watch(editedName, (newValue, oldValue) => {
      if (typeof newValue !== "object") changeName(newValue);
    });

    const changeGender = (e) => {
      for (const key in GenderConfig) {
        if (Object.hasOwnProperty.call(GenderConfig, key)) {
          const element = GenderConfig[key];
          if (e.target.value === element) {
            //edit studentDetails and fire custom event
          }
        }
      }
    };

    watch(editedGender, (newValue) => {
      //logic for changing gender
    });

    watch(editedInfo, (newValue) => {
      editedInfo.value = newValue;
    });
    const changeData = (updatedData) => {
      emit("changeData", updatedData);
      toggleModalStatus();
    };
    const confirmChangeHandler = () => {
      let tempDetails = { ...props.studentData };
      let genderKey;
      for (const key in GenderConfig) {
        if (Object.hasOwnProperty.call(GenderConfig, key)) {
          const element = GenderConfig[key];

          if (element === capitalizeFirstLetter(editedGender.value)) {
            genderKey = key;
            break;
          }
        }
      }
      let updatedName = "";
      if (editedName.value.length > 0) {
        updatedName = capitalizeFirstLetter(editedName.value);
      } else {
        updatedName = capitalizeFirstLetter(props.studentData.Name);
      }
      tempDetails["Name"] = updatedName;
      tempDetails["Gender"] = genderKey;
      tempDetails["Info"] = editedInfo.value;

      changeData(tempDetails);
    };

    return {
      closeIcon,
      toggleModalStatus,
      selectedFieldName,
      setSelectedField,
      editedName,
      // enterKeyPressHandler,
      changeName,
      editedGender,
      changeGender,
      editedInfo,
      confirmChangeHandler,
    };
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
  height: 100%;
}

.closeIconContainer {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.closeIconContainer img {
  cursor: pointer;
}
.inputFieldContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.inputField {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

.cancel-button {
  background-color: crimson;
}

.confirm-button {
  background-color: #8526e4;
}
</style>
