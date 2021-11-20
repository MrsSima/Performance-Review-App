<template>
  <div id="employee-screen">
    <div v-if="!showReviewView">
      <div id="pending-reviews-title">
        {{title}}
      </div>
      <div id="pending-reviews-list">
        <div id="pending-review-name-card" v-for="review in reviewList" v-bind:key="review.to" :ref="setItemRef">
          <ReviewCard
              @startReview="openReviewDialog"
              :to="review.to"
          />
        </div>
      </div>
    </div>
    <AddReviewPage
        v-else
        :targetData="selectedTarget"
        :review="getReview"
        @submit="submitReview"
        @save="saveReview"
        @close="closeReviewDialog"/>
  </div>
</template>
<script>
import ReviewCard from '../components/PendingReviewCard.vue'
import AddReviewPage from './AddReviewPage.vue'
import {routes, serverAddress} from "../constants";

export default {
  name: "EmployeePanel",
  components: {
    ReviewCard,
    AddReviewPage
  },
  props: {
    id: String
  },
  data() {
    return {
      reviewList: [],
      itemRefs: [],
      showReviewView: '',
      selectedTarget: {}
    }
  },
  computed: {
    title() {
      if (this.reviewList.length === 0) {
        return 'No reviews assign!'
      }
      return 'Your pending performance reviews:'
    },
    getReview() {
      return this.reviewList.find(review => review.to === this.selectedTarget.id);
    }
  },
  mounted() {
    this.fetchReviewList();
  },
  methods: {
    fetchReviewList() {
      fetch('http://localhost:3001/reviews/pending/' + this.id).then((response) => {
        return response.json();
      }).then((data) => {
        this.reviewList = data;
      }).catch(error => {
        console.log(error)
        //TODO log error properly
      });
    },
    setItemRef(el) {
      if (el) {
        this.itemRefs.push(el)
      }
    },
    openReviewDialog(data) {
      this.selectedTarget = data;
      this.showReviewView = true;
    },
    submitReview(data) {
      data.from = this.id;
      fetch(serverAddress + routes.submit, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }).then((response) => {
        if (response.status === 200) {
          this.showReviewView = false;
          this.fetchReviewList();
        }
      }).catch(error => {
        console.log(error);
        //TODO log error properly
      });
    },
    saveReview(data) {
      data.from = this.id;
      fetch(serverAddress + routes.pendingReviews, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }).then((response) => {
        if (response.status === 200) {
          console.log('fetching');
          this.fetchReviewList();
        }
      }).catch(error => {
        console.log(error);
        //TODO log error properly
      });
    },
    closeReviewDialog() {
      this.showReviewView = false;
    }
  }
}
</script>
<style>
#employee-screen {
  margin-left: 10%;
  padding-bottom: 3em;
}

#pending-reviews-title {
  font-size: 18px;
  text-align: left;
  padding-left: 1.2em;
  margin-top: 0.4em;
}

#pending-reviews-list {
  display: flex;
}

#pending-review-name-card {
  margin-left: 1em;
}
</style>