<template>
  <div v-if="isLoading">Loading ...</div>
  <div v-else-if="students.length && !isLoading">
    <ol id="container">
      <div v-for="student in students" :key="student.id" class="card">
        <p>{{ student.Name }}</p>
        <div id="button-section">
          <button @click="deleteStudent(student.id)" id="delete-button">
            Delete
          </button>
          <button
            @click="viewStudentDetails(student.id)"
            id="view-details-button"
          >
            View
          </button>
        </div>
      </div>
    </ol>
    <FloatingButton @add="toggleAddModal" />
    <AddModal v-if="isAddModalOpen" @toggle="toggleAddModal" @create="create" />
  </div>
  <div v-else-if="!students.length && !isLoading">No Student found....</div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import FloatingButton from "@/components/FloatingButton";
import AddModal from "@/components/AddModal";

export default {
  name: "StudentList",
  components: {
    FloatingButton,
    AddModal,
  },

  setup() {
    const router = useRouter();
    const students = ref([]);
    const isLoading = ref(false);
    const isAddModalOpen = ref(false);

    const fetchStudents = async () => {
      try {
        isLoading.value = true;
        const response = await axios.get("http://localhost:3000/students");

        students.value = response.data;
      } catch (error) {
        students.value = [];
      } finally {
        isLoading.value = false;
      }
    };

    fetchStudents();

    const deleteStudent = async (id) => {
      let response = confirm("Do you really want to delete ?");
      if (response)
        try {
          isLoading.value = true;
          const response = await axios.delete(
            "http://localhost:3000/students/" + id
          );
          fetchStudents();
        } catch (error) {
        } finally {
          isLoading.value = false;
        }
    };

    const toggleAddModal = () => {
      isAddModalOpen.value = !isAddModalOpen.value;
    };

    const create = () => {
      toggleAddModal();
      fetchStudents();
    };

    function viewStudentDetails(id) {
      router.push(`/students/${id}`);
    }

    return {
      students,
      isLoading,
      isAddModalOpen,
      deleteStudent,
      viewStudentDetails,
      toggleAddModal,
      create,
    };
  },
};
</script>

<style scoped>
#container {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.card {
  padding-top: 10px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px 10px #ded6cf42;
  margin: 24px auto;
  width: 300px;
  height: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.card p {
  flex: 1;
}

#button-section {
  display: flex;
  flex-direction: row;
  width: 100%;
}

#delete-button {
  flex: 1;
  cursor: pointer;
  color: #fff;
  background-color: crimson;
  border: 1px solid crimson;
  border-bottom-left-radius: 8px;
  width: 64px;
  height: 32px;
  margin-right: 4px;
}

#view-details-button {
  flex: 1;
  cursor: pointer;
  color: #fff;
  background-color: green;
  border: 1px solid green;
  border-bottom-right-radius: 8px;
  width: 64px;
  height: 32px;
}
</style>
