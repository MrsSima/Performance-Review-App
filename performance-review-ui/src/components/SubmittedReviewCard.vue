<template>
  <div class="submitted-review-card">
    <div v-if="!pendingView" @click="showDialog" class="view-button">View</div>
    <div class="submitted-name">From <b>{{ fromName }}</b></div>
    <div class="submitted-name">to <b>{{ toName }}</b></div>
    <SubmittedReviewDialog
        v-if="showSubmittedReviewDialog && !pendingView"
        :fromName="fromName"
        :forName="toName"
        :content="content"
        @close="closeDialog"
    />
  </div>
</template>
<script>
import SubmittedReviewDialog from './dialogs/SubmittedReviewDialog'
import {routes, serverAddress} from "../constants";

export default {
  name: 'SubmittedReviewCard',
  components: {
    SubmittedReviewDialog
  },
  props: {
    from: String,
    to: String,
    content: Object,
    pendingView: Boolean
  },
  data() {
    return {
      fromName: '',
      toName: '',
      showSubmittedReviewDialog: false
    }
  },
  mounted() {
    this.getNames();
  },
  methods: {
    getNames() {
      fetch(serverAddress + routes.employees + this.to).then((response) => {
        return response.json();
      }).then((data) => {
        this.toName = data.name;
      }).catch(error => {
        console.log(error);
        //TODO log error properly
      });
      fetch(serverAddress + routes.employees + this.from).then((response) => {
        return response.json();
      }).then((data) => {
        this.fromName = data.name;
      }).catch(error => {
        console.log(error);
        //TODO log error properly
      });
    },
    showDialog() {
      this.showSubmittedReviewDialog = true;
    },
    closeDialog() {
      this.showSubmittedReviewDialog = false;
    }
  }
}
</script>
<style>
.submitted-review-card {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.submitted-name {
  width: 30%;
  text-align: left;
}

.view-button {
  padding: 0.2em;
  border-radius: 5px;
  cursor: pointer;
}

.view-button:hover {
  background-color: var(--scandal);
}
</style>