<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <score-calculator :questions="sample" />
  </div>
</template>

<script>
import ScoreCalculator from './components/ScoreCalculator.vue'
import questions from '@/data/questions.json'

export default {
  name: 'App',
  components: {
    ScoreCalculator
  },
  data() {
    return {
      sample: questions
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
