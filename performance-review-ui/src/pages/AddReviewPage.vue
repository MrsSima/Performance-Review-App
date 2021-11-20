<template>
  <div id="add-review-page">
    <div class="close-dialog-button" id="review-back-button" @click="close">Back</div>
    <div id="review-title">Performance Review for <b>{{ targetName }}</b></div>
    <div class="pending-review-card" v-for="point in evaluationPoints" v-bind:key="point.name">
      <div class="point-name"><b>{{ point.name }}</b></div>
      <div class="review-options">
        <div
            class="review-option"
            @click="() => {point.value = 0}"
            v-bind:class="{'option-selected-positive': point.value === 0}">
          Positive
        </div>
        <div
            class="review-option"
            @click="() => {point.value = 1}"
            v-bind:class="{'option-selected-needswork': point.value === 1}">
          Needs Work
        </div>
      </div>
      <div class="point-comment">
        Comment: <textarea id="review-comment-textarea" v-model="point.comment"></textarea>
      </div>
    </div>
    <div
        v-if="showSubmissionError"
        id="submit-error">
      Some points are not estimated
    </div>
    <div
        @click="save"
        id="save-review-button">Save
    </div>
    <div
        @click="submitReview"
        id="submit-review-button">Submit
    </div>
  </div>
</template>
<script>
export default {
  name: 'AddReviewDialog',
  props: {
    targetData: Object,
    review: Object
  },
  data() {
    return {
      evaluationPoints: [
        {name: 'Attendance', value: '', comment: ''},
        {name: 'Innovation and Creativity', value: '', comment: ''},
        {name: 'Leadership', value: '', comment: ''},
        {name: 'Communication Skills', value: '', comment: ''},
        {name: 'Collaboration and Teamwork', value: '', comment: ''},
        {name: 'Time Management', value: '', comment: ''},
        {name: 'Customer Experience', value: '', comment: ''},
        {name: 'Problem Solving', value: '', comment: ''},
        {name: 'Work-Ethics', value: '', comment: ''},
        {name: 'Productivity', value: '', comment: ''},
        {name: 'Interpersonal Skills', value: '', comment: ''},
      ],
      showSubmissionError: false
    }
  },
  computed: {
    targetName() {
      if (this.targetData) {
        return this.targetData.name;
      }
      return '';
    }
  },
  mounted() {
    console.log('mounted');
    if (this.review && this.review.content && this.review.content.length != 0) {
      this.evaluationPoints = [...this.review.content];
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    submitReview() {
      if (!this.evaluationPoints.find(point => point.value === '')) {
        this.$emit('submit', {to: this.targetData.id, content: this.evaluationPoints});
        this.showSubmissionError = false;
      } else {
        this.showSubmissionError = true;
      }
    },
    save() {
      this.$emit('save', {to: this.targetData.id, content: this.evaluationPoints})
    }
  }
}
</script>
<style>
#add-review-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--polar);
  overflow-y: scroll;
  color: var(--pickled-bluewood);
  width: 90%;
  margin-bottom: 1em;
}

#review-title {
  font-size: 18px;
}

.pending-review-card {
  display: flex;
  flex-direction: column;
  width: 60%;
  padding-top: 1.5em;
}

.point-name {
  color: var(--bondie-blue)
}

.review-options {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.review-option {
  cursor: pointer;
  border-radius: 5px;
  padding: 0 0.3em;
}

.option-selected-positive {
  background-color: var(--aquamarine);
}

.option-selected-needswork {
  background-color: var(--koromiko);
}

.point-comment {
  display: flex;
  flex-direction: column;
}

#review-comment-textarea {
  font-size: 16px;
  font-family: inherit;
  border-color: var(--pickled-bluewood);
  resize: none;
  height: 4em;
}

#review-back-button {
  margin: 1em 30em 0 0;
}

#save-review-button {
  cursor: pointer;
  margin-top: 1em;
}

#save-review-button:hover {
  color: var(--aquamarine)
}

#submit-error {
  color: var(--bondie-blue);
}

#submit-review-button {
  padding: 0.2em 0.2em;
  margin: 0.5em 0;
  border-radius: 3px;
  cursor: pointer;
  background-color: var(--pickled-bluewood);
  color: var(--polar)
}

#submit-review-button:hover {
  background-color: var(--aquamarine);
  color: var(--pickled-bluewood)
}
</style>