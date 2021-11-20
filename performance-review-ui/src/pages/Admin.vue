<template>
  <div id="admin-page">
    <div id="admin-nav">
      <div id="employee-tab-nav"
           class="nav-button"
           v-bind:class="{ 'nav-button-active': showEmployees }"
           @click="employeeTabClicked">
        Employees
      </div>
      <div id="submitted-review-tab-nav"
           class="nav-button"
           v-bind:class="{ 'nav-button-active': showSubmittedReviews }"
           @click="submittedReviewTabClicked">
        Submitted Reviews
      </div>
      <div id="pending-review-tab-nav"
           class="nav-button"
           v-bind:class="{ 'nav-button-active': showPendingReviews }"
           @click="pendingReviewTabClicked">
        Pending Reviews
      </div>
    </div>
    <div id="admin-body">
      <EmployeeList v-if="showEmployees" />
      <SubmittedReviewList v-if="showSubmittedReviews" />
      <PendingReviewList  v-if="showPendingReviews" />
    </div>
  </div>
</template>

<script>

import EmployeeList from '../components/EmployeeList.vue'
import SubmittedReviewList from '../components/SubmittedReviewList.vue'
import PendingReviewList from '../components/PendingReviewList.vue'

export default {
  name: 'Admin',
  components: {
    EmployeeList,
    SubmittedReviewList,
    PendingReviewList
  },
  data() {
    return {
      showEmployees: true,
      showSubmittedReviews: false,
      showPendingReviews: false
    }
  },
  methods: {
    employeeTabClicked() {
      if (!this.showEmployees) {
        this.showEmployees = true;
        this.showSubmittedReviews = false;
        this.showPendingReviews = false;
      }
    },
    submittedReviewTabClicked() {
      if (!this.showSubmittedReviews) {
        this.showSubmittedReviews = true;
        this.showEmployees = false;
        this.showPendingReviews = false;
      }
    },
    pendingReviewTabClicked() {
      if (!this.showPendingReviews) {
        this.showPendingReviews = true;
        this.showSubmittedReviews = false;
        this.showEmployees = false;
      }
    }
  }
}
</script>

<style>
#admin-page {
  width: 80%;
  margin: 0 auto;
}

#admin-nav {
  padding-top: 0.3em;
  color: var(--pickled-bluewood);
  font-size: 18px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  padding-left: 2em;
  margin-bottom: 1em;
}

#employee-tab-nav {
  cursor: pointer;
}

.nav-button {
  cursor: pointer;
  padding-left: 2em;
}

.nav-button:active  {
  color: var(--bondie-blue);
}

.nav-button-active {
  color: var(--bondie-blue);
}
</style>