<template>
  <div class="backdrop">
    <div id="submitted-review-dialog">
      <div class="close-submitted-review-dialog-button" @click="close">Close</div>
      <div>Review from <b>{{ fromName }}</b>
        for <b>{{ forName }}</b></div>
      <div id="submitted-review-contents">
        <div v-for="point in content" v-bind:key="point.name" class="point-panel">
          <div
              class="point-name-value-panel"
              v-bind:class="{'submitted-point-negative': point.value === 1, 'submitted-point-positive' : point.value === 0}">
            <div class="submitted-point-name"><b>{{ point.name }}:</b></div>
            <div v-if="point.value === 0" class="submitted-point-value"> Positive</div>
            <div v-if="point.value === 1" class="submitted-point-value"> Needs Work</div>
          </div>
          <div class="submitted-point-comment" v-if="point.comment != ''">{{ point.comment }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SubmittedReviewDialog',
  props: {
    fromName: String,
    forName: String,
    content: Object
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>
<style>
#submitted-review-dialog {
  position: absolute;
  top: calc(50% - 35%);
  left: calc(50% - 15%);
  width: 40%;
  height: 40%;
  background-color: var(--bondie-blue);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--polar);
  border-radius: 25px;
  box-shadow: 2px 2px 10px var(--pickled-bluewood);
}

.close-submitted-review-dialog-button {
  margin-left: 18em;
  cursor: pointer;
  margin-bottom: 0.5em;
}

#submitted-review-contents {
  display: flex;
  flex-direction: column;
  margin-top: 0.3em;
}

.point-panel {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.point-name-value-panel {
  display: flex;
  flex-direction: row;
}

.submitted-point-negative {
  color: var(--koromiko);
}

.submitted-point-positive{
  color: var(--aquamarine);
}

.submitted-point-value {
  padding-left: 1em;
}

.submitted-point-comment {
  color: var(--hint-of-green);
}
</style>