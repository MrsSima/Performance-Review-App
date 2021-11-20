<template>
  <div id="employee-list">
    <div
        id="add-employee"
        @click="openAddEmployeeDialog">
      <img id="employee-add-icon" src="add.svg"/>Add Employee
    </div>
    <div class="employee-list-item" v-for="employee in employees" v-bind:key="employee.id" :ref="setItemRef">
      <EmployeeCard
          :name="employee.name"
          :position="employee.position"
          :id="employee.id"
          @delete="deleteCard"
          @update="updateCard"
          @assign="openAssignDialog"
      />
    </div>
    <div v-if="showEmptyTitle" id="no-employees-title">No employees found</div>
    <AddEmployeeDialog v-if="showAddDialog"
                       :idFrom="selectedEmployeeId"
                       :employees="employees"
                       @close="closeDialog"
                       @add="addEmployee"
    />
    <AddAssignReviewDialog
        v-if="showAssignDialog"
        :employees="employees"
        :idFrom="selectedEmployeeId"
        @close="closeReviewDialog"
        @assign="assignReview"/>
  </div>
</template>
<script>
import EmployeeCard from './EmployeeCard.vue'
import AddEmployeeDialog from './dialogs/AddEmployeeDialog.vue'
import AddAssignReviewDialog from './dialogs/AssignReviewDialog.vue'
import {routes, serverAddress} from "../constants";

export default {
  name: 'EmployeeList',
  components: {
    EmployeeCard,
    AddEmployeeDialog,
    AddAssignReviewDialog
  },
  data() {
    return {
      itemRefs: [],
      employees: [],
      showAddDialog: false,
      showAssignDialog: false,
      selectedEmployeeId: ''
    }
  },
  computed: {
    showEmptyTitle() {
      return this.employees.length === 0;
    }
  },
  mounted() {
    this.fetchEmployees();
  },
  methods: {
    async fetchEmployees() {
      fetch(serverAddress + routes.employees).then((response) => {
        return response.json();
      }).then((data) => {
        this.employees = data;
      }).catch(error => {
        console.log(error);
        //TODO log error properly
      });
    },
    setItemRef(el) {
      if (el) {
        this.itemRefs.push(el)
      }
    },
    deleteCard(id) {
      fetch(serverAddress + 'employees/' + id, {method: 'DELETE'})
          .then(response => {
            if (response.status === 200) {
              this.fetchEmployees();
            }
          });
    },
    updateCard(data) {
      fetch(serverAddress + routes.employees + data.id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }).then(response => {
        if (response.status === 200) {
          this.fetchEmployees();
        }
      });
    },
    openAssignDialog(data) {
      this.selectedEmployeeId = data;
      this.showAssignDialog = true;
    },
    openAddEmployeeDialog() {
      this.showAddDialog = true;
    },
    addEmployee(data) {
      this.showAddDialog = false;
      this.createEmployee(data);
    },
    createEmployee(data) {
      fetch(serverAddress + routes.employees, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }).then(response => {
        if (response.status === 200) {
          this.fetchEmployees();
        }
      });
    },
    assignReview(data) {
      const review = {
        from: this.selectedEmployeeId,
        to: data
      }
      fetch(serverAddress + routes.pendingReviews, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review)
      }).catch(error => {
        console.log(error);
        //TODO log error properly
      })
      this.showAssignDialog = false;
    },
    closeDialog() {
      this.showAddDialog = false;
    },
    closeReviewDialog() {
      this.showAssignDialog = false;
    }
  }
}
</script>
<style>
#add-employee {
  cursor: pointer;
  width: 18%;
  margin-bottom: 1em;
  margin-left: 1em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
}

#employee-add-icon {
  width: 15px;
  height: 15px;
  margin-right: 0.2em;
}

#add-employee:hover {
  background-color: var(--scandal);
}

#add-employee:active {
  background-color: var(--aquamarine);
}

.employee-list-item {
  border-bottom: solid 1px var(--bondie-blue);
  padding-bottom: 0.3em;
  margin-bottom: 0.3em;
}

.employee-list-item:last-child {
  border-style: none;
}
</style>