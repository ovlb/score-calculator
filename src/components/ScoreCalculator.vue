<template>
  <div class="score-calculator">
    <score-calculator-question-group
      v-for="question in questions"
      :key="question.id"
      :data="question"
      @answerClicked="onAnswerClick"
    />
    <div class="score-calculator__score-container">
      <button data-test="button-emit" @click="emitScore">
        {{ buttonText }}
      </button>
    </div>
    <footer class="score-calculator__footer">
      <slot name="footerText" />
    </footer>
  </div>
</template>

<script>
import ScoreCalculatorQuestionGroup from './ScoreCalculatorQuestionGroup.vue'

export default {
  components: {
    ScoreCalculatorQuestionGroup
  },
  data() {
    return {
      showsScore: false
      // accumulatedScore: null,
    }
  },
  props: {
    questions: {
      type: Array,
      required: true
    },
    buttonText: {
      type: String,
      default: 'Show result'
    },
    questionsOptional: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    accumulatedScore() {
      const reducer = (accumulator, currentValue) => accumulator + currentValue

      const values = this.questions.map((q) => q.activeScore || 0)

      return values.reduce(reducer)
    },
    hasAllAnswers() {
      return this.questions.every((q) =>
        Object.prototype.hasOwnProperty.call(q, 'activeScore')
      )
    }
  },
  methods: {
    emitScore() {
      if (!this.hasAllAnswers && !this.questionsOptional) {
        const missing = this.questions.filter(
          (question) =>
            !Object.prototype.hasOwnProperty.call(question, 'activeScore')
        )
        this.$emit('missingQuestions', missing)

        return
      }

      this.$emit('scoreResult', this.accumulatedScore)
    },
    onAnswerClick(answer) {
      const { questions } = this
      const clickedQuestion = questions.find((q) => q.id === answer.id)

      this.$set(clickedQuestion, 'activeScore', answer.score)
    }
  }
}
</script>
