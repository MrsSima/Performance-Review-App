<template>
  <div id="reviews-panel">
    <div v-if="reviews.length === 0">No submitted reviews</div>
    <div class="submitted-review" v-for="review in reviews" v-bind:key="review.from + review.to">
      <SubmittedReviewCard
          :from="review.from"
          :to="review.to"
          :content="review.content"
      />
    </div>
  </div>
</template>
<script>
import SubmittedReviewCard from './SubmittedReviewCard'
import {routes, serverAddress} from "../constants";

export default {
  name: 'SubmittedReviewList',
  components: {
    SubmittedReviewCard
  },
  data() {
    return {
      reviews: []
    }
  },
  mounted() {
    this.fetchSubmittedReviews();
  },
  methods: {
    async fetchSubmittedReviews() {
      fetch(serverAddress + routes.submittedReviews).then((response) => {
        return response.json();
      }).then((data) => {
        this.reviews = data;
      }).catch(error => {
        console.log(error);
        //TODO log error properly
      });
    }
  }
}
</script>
<style>
.submitted-review {
  border-bottom: solid 1px var(--bondie-blue);
  padding-bottom: 0.2em;
  margin-bottom: 0.2em;
}

.submitted-review:last-child {
  border-style: none;
}
</style>