<template>
  <div class="modal-wrapper" @click.self="toggleModalStatus">
    <div class="modal">
      <div class="closeIconContainer">
        <img :src="closeIcon" alt="close" @click="toggleModalStatus" />
      </div>
      <div class="modal-content">
        <div class="field-selection-section">
          <label for="fieldName"> Choose Field Name </label>
          <select name="fieldName" id="fieldName" v-model="selectedFieldName">
            <option value="name">Name</option>
            <option value="gender">Gender</option>
            <option value="info">Info</option>
          </select>
        </div>

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
              placeholder="Enter the student details..."
            ></textarea>
          </div>
          <div class="button-section">
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
    console.log(
      "🚀 ~ file: EditModal.vue ~ line 75 ~ setup ~ selectedFieldName",
      selectedFieldName
    );
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
  height: 50%;
  width: 50%;
  margin: 25% auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 8px;
}

.closeIconContainer {
  position: relative;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
}
.closeIconContainer img {
  cursor: pointer;
}

.modal-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.field-selection-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  margin-bottom: 10px;
}

.field-selection-section label {
  text-align: left;
  margin-bottom: 8px;
}

.inputFieldContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.inputField {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
}
.inputField label {
  text-align: left;
  margin-bottom: 8px;
}
.inputField textarea {
  resize: none;
}
.inputField input,
select {
  font-size: 16px;
  height: 24px;
  border: none;
  border-bottom: 1px solid #000;
}
.inputField input,
select,
textarea:focus {
  outline: none;
}

.button-section {
  margin-top: 10px;
  width: 50%;
  display: flex;
  justify-content: space-between;
}

.controller-button {
  padding: 10px;
  width: 45%;
  padding: 12px;
  color: #fff;
  border: 0;
  margin-top: 4px;
  margin-bottom: 4px;
  margin-right: 8px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 550;
  font-size: 18px;
}

.cancel-button {
  background-color: crimson;
}

.confirm-button {
  background-color: #8526e4;
}
</style>
