<template>
  <div @click="startReview" id="review-card">
    <div id="review-card-name">{{targetName}}</div>
  </div>
</template>
<script>
import {routes, serverAddress} from "../constants";

export default {
  name: 'ReviewCard',
  props: {
    to: String
  },
  data() {
    return {
      targetName: ''
    }
  },
  mounted() {
    this.getTargetName();
  },
  methods: {
    async getTargetName() {
      fetch(serverAddress + routes.employees + this.to).then((response) => {
        return response.json();
      }).then((data) => {
        this.targetName = data.name;
      }).catch(error => {
        console.log(error);
        //TODO log error properly
      });
    },
    startReview() {
      this.$emit('startReview', {name: this.targetName, id: this.to})
    }
  }
}
</script>
<style>
#review-card {
  display: flex;
  flex-direction: row;
  border-radius: 5px;
  cursor: pointer;
  padding: 0 0.2em;
  font-size: 18px;
}

#review-card:hover {
  background-color: var(--aquamarine);
}
</style>