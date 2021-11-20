<template>
  <div id="reviews-panel">
    <div v-if="reviews.length === 0">No pending reviews</div>
    <div class="pending-review" v-for="review in reviews" v-bind:key="review.from + review.to">
      <SubmittedReviewCard
          :from="review.from"
          :to="review.to"
          :pendingView="true"
      />
    </div>
  </div>
</template>
<script>
import SubmittedReviewCard from './SubmittedReviewCard'
import {routes, serverAddress} from "../constants";

export default {
  name: 'PendingReviewList',
  components: {
    SubmittedReviewCard
  },
  props: {},
  data() {
    return {
      reviews: []
    }
  },
  computed: {},
  mounted() {
    this.fetchSubmittedReviews();
  },
  methods: {
    async fetchSubmittedReviews() {
      fetch(serverAddress + routes.pendingReviews).then((response) => {
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
.pending-review {
  border-bottom: solid 1px var(--bondie-blue);
  padding-bottom: 0.2em;
  margin-bottom: 0.2em;
}

.pending-review:last-child {
  border-style: none;
}
</style>