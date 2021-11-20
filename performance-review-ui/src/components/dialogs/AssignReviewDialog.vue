<template>
  <div class="backdrop">
    <div id="assign-review-dialog">
      <div class="close-dialog-button" @click="close">Close</div>
      <div id="assign-title">Assign {{ nameOfSender }} performance review for
        <select id="assign-select" v-model="selected">
          <option v-for="employeeTo in filteredEmployees" v-bind:value="employeeTo.id" v-bind:key="employeeTo.id">
            {{ employeeTo.name }}
          </option>
        </select>
        ?</div>
      <div
          @click="assignReview"
          id="assign-button"
          class="dialog-button">
        Assign
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AssignReviewDialog',
  props: {
    idFrom: String,
    employees: Array
  },
  data() {
    return {
      selected: ''
    }
  },
  computed: {
    nameOfSender() {
      if (this.idFrom) {
        return this.employees.find(employee => employee.id === this.idFrom).name;
      }
      return '';
    },
    filteredEmployees() {
      return this.employees.filter(employee => employee.id !== this.idFrom);
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    assignReview() {
      this.$emit('assign', this.selected);
    }
  }
}
</script>
<style>
#assign-review-dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 15em;
  height: 9em;
  background-color: var(--bondie-blue);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--polar);
  border-radius: 25px;
  box-shadow: 2px 2px 10px var(--pickled-bluewood);
}

#assign-select {
  border-style: none;
  font-size: 16px;
  font-family: inherit;
  color: var(--pickled-bluewood);
}

#assign-button {
  margin-top: 0.5em;
}
</style>