<template>
  <div class="employee-card">
    <div class="employee-card-delete employee-action" @click="deleteCard">
      <img class="employee-action-icon" src="delete.svg"/>
    </div>
    <div v-if="!editModeOn" class="employee-card-edit employee-action" @click="editCard">
      <img class="employee-action-icon" src="edit.svg"/>
    </div>
    <div v-else class="employee-card-edit employee-action" @click="saveCard">
      <img class="employee-action-save-icon" src="save.svg"/>
    </div>
    <div v-if="!editModeOn"
         class="employee-card-name">
      <b>{{ name }}</b>
    </div>
    <div v-else
         class="employee-card-name">
      <input v-on:keyup.enter="saveCard"
             v-model="inputtedName" class="employee-card-input">
    </div>
    <div
        v-if="!editModeOn"
        class="employee-card-position">
      {{ position }}
    </div>
    <div
        v-else
        class="employee-card-position">
      <input
          v-on:keyup.enter="saveCard"
          v-model="inputtedPosition" class="employee-card-input"/>
    </div>
    <div
        @click="assignReview"
        class="employee-card-assign employee-action">Assign Review</div>
  </div>
</template>
<script>
export default {
  name: 'EmployeeCard',
  props: {
    name: String,
    position: String,
    id: String
  },
  data() {
    return {
      editModeOn: false,
      inputtedName: this.name,
      inputtedPosition: this.position
    }
  },
  methods: {
    deleteCard() {
      this.$emit('delete', this.id);
    },
    editCard() {
      this.editModeOn = true;
    },
    saveCard() {
      this.editModeOn = false;
      this.$emit('update', {id: this.id, name: this.inputtedName, position: this.inputtedPosition});
    },
    assignReview() {
      this.$emit('assign', this.id);
    }
  }
}
</script>
<style>
.employee-card {
  display: flex;
  flex-direction: row;
}

.employee-action-icon {
  width: 15px;
  height: 15px;
  cursor: pointer;
}

.employee-action-save-icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.employee-card-delete {
  width: 6%;
  cursor: pointer;
}

.employee-card-edit {
  width: 6%;
  cursor: pointer;
}

.employee-card-name {
  width: 37%;
  text-align: left;
}

.employee-card-position {
  width: 37%;
  text-align: left;
  color: var(--ming);
}

.employee-card-assign {
  width: 24%;
  cursor: pointer;
  border-radius: 5px;
}

.employee-action:hover {
  background-color: var(--scandal);
}

.employee-card-input {
  border-radius: 5px;
  border-style: none;
  font-family: inherit;
  font-size: 16px;
}
</style>