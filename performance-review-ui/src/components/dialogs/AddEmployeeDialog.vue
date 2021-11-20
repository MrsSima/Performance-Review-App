<template>
  <div class="backdrop">
    <div id="add-employee-dialog-box"
         v-on:keyup.enter="addEmployee">
      <div id="add-dialog-close" class="close-dialog-button" @click="close">Close</div>
      <div id="add-employee-name">Name: <input v-model="name" class="employee-input"></div>
      <div id="add-employee-position">Position: <input v-model="position" class="employee-input"></div>
      <div
          @click="addEmployee"
          class="dialog-button"
          id="add-employee-button" >Add Employee
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AddEmployeeDialog',
  props: {},
  data() {
    return {
      name: '',
      position: ''
    }
  },
  methods: {
    addEmployee() {
      if (this.name !== '' && this.name !== 'admin') {
        this.$emit('add', {name: this.name, position: this.position});
      }
    },
    close() {
      this.$emit('close');
    }
  }
}
</script>
<style>
#add-employee-dialog-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 15em;
  height: 7em;
  background-color: var(--bondie-blue);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--polar);
  border-radius: 25px;
  box-shadow: 2px 2px 10px var(--pickled-bluewood);
}

#add-dialog-close {
  margin-left: 10em;
  cursor: pointer;
}

#add-dialog-close:hover {
  color: var(--aquamarine);
}

#add-employee-name {
  margin-top: 0.5em;
  margin-left: 0.8em;
}

#add-employee-position {
  margin-bottom: 0.5em;
}

.employee-input {
  border-style: none;
  font-size: 14px;
  border-radius: 3px;
}
</style>