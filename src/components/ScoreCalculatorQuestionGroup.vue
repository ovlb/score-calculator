<template>
  <section class="question-group">
    <h3 class="question-group__headline">{{ data.title }}</h3>
    <div class="question-group__answers">
      <label
        v-for="(answer, index) in data.answers"
        :key="index"
        class="answer-group"
      >
        <input
          v-model="score"
          :checked="score === answer.score"
          :value="answer.score"
          :name="data.id"
          :id="`${data.id}_${index}`"
          type="radio"
          class="answer-group__input"
        />
        <span class="answer-group__text">{{ answer.text }}</span>
      </label>
    </div>
  </section>
</template>

<script>
export default {
  name: 'score-calculator-question-group',
  data() {
    return {
      score: null
    }
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  watch: {
    score(score) {
      this.$emit('answerClicked', { score, id: this.data.id })
    }
  }
}
</script>

<style></style>
