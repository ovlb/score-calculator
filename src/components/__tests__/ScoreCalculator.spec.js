import { shallowMount } from '@vue/test-utils'
import ScoreCalculator from '../ScoreCalculator.vue'
import questions from '@/data/questions.json'

const buttonText = 'Test result'

const answeredQuestions = () =>
  questions.map((question) => ({ ...question, activeScore: 2 }))

const factory = (options = {}) => {
  const propsData = {
    buttonText,
    questions: options.questions || questions,
    questionsOptional: options.questionsOptional || false
  }

  return shallowMount(ScoreCalculator, {
    propsData
  })
}

describe('ScoreCalculator.vue', () => {
  it('allows to set the button text', () => {
    const wrapper = factory()

    const $btn = wrapper.find('[data-test="button-emit"]')

    expect($btn.text()).toBe(buttonText)
  })

  describe('Events', () => {
    it('emits the score if all questions have been answered', () => {
      const wrapper = factory({ questions: answeredQuestions() })

      const $btn = wrapper.find('[data-test="button-emit"]')

      $btn.trigger('click')

      expect(wrapper.emitted('scoreResult').length).toBe(1)
    })
    it('emits a warning if the button has been clicked but not all questions answered', () => {
      const wrapper = factory({ questions })
      const $btn = wrapper.find('[data-test="button-emit"]')

      $btn.trigger('click')

      expect(wrapper.emitted('missingQuestions').length).toBe(1)
    })

    it('emits the score if not all questions have been answered but questions are optional', () => {
      let incompleteQuestions = answeredQuestions()

      delete questions[0].activeScore

      const wrapper = factory({
        questions: incompleteQuestions,
        questionsOptional: true
      })

      const $btn = wrapper.find('[data-test="button-emit"]')

      $btn.trigger('click')

      expect(wrapper.emitted('scoreResult').length).toBe(1)
    })
  })

  describe('Score calculation', () => {
    it('calculates the correct score', () => {
      const wrapper = factory({ questions: answeredQuestions() })

      const $btn = wrapper.find('[data-test="button-emit"]')

      $btn.trigger('click')

      expect(wrapper.emitted('scoreResult')[0]).toStrictEqual([
        questions.length * 2
      ])
    })
  })
})
