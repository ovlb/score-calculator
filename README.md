# 🧮 Score Calculator

Want to know a score, get it here.

See a version of this component in use with the [SwissPrEPared HIV risk calculator](https://www.swissprepared.ch/en/risk-calculator/).

---

## 👩‍💻 Usage

Install the calculator from NPM.

```
npm install @ovl/score-calculator
```

Next, import it in the component where you want to use it:

```js
import ScoreCalculator from '@ovl/score-calculator'
```

### Props

#### Questions

These questions _must_ be objects which have a unique ID, a title, and an array of answers. Let’s take this question as an example:

```js
{
  id: 123456789,
  title: 'How many nights do you sleep in a normal week?',
  answers: [
    { text: '≥10', score: 7 },
    { text: '6–9', score: 4 },
    { text: '0–5', score: 0 }
  ]
}
```

As you can see, all answers have a `score` property. That’s rather important, as the diligent score calculation robot making this component work needs scores to compute. As it’s diligent but not sophisticated, the scores need to be given to them.

In it’s former life it has been employed as the calculating soul of an abacus. Unfortunartely, abaci went out of fashion and our score calculating robot became a bit bored. Luckily we found them before something bad happened and they now works happily inside the score calculator.

Got a bit carried away there. Back to the component.

More formally:

An answer is an object of text and score.

```js
answer: Object {
  text: String,
  score: Number
}
```

A question has a mandatory, unique ID and a title as well as an array of answers which need to implement the answer interface.

```js
question: Object {
  id: String | Number,
  title: String,
  answers: Array [answer]
}
```

Finally, questions are an array of question types:

```js
questions: Array[question]
```

#### buttonText

To change the text content of the button, use the `buttonText` prop:

```js
buttonText: {
  type: String,
  default: 'Show results'
}
```

#### questionsOptional

By default all questions are required before a score is calculated. If some questions are optional, you can change this behaviour through the `questionsOptional` prop.

```js
questionsOptional: {
  type: Boolean,
  default: false
}
```

### Events

Once a user clicks on the button there two possibilities.

If all questions have been answered – or `questionsOptional` is set to `true` – the component emits `scoreResult` with the accumulated score as its payload.

If not all questions have been answered and `questionsOptional` is set to `false` the emitted event is `missingQuestions` without the missing questions as its payload.

## 🥼 Development setup

You’ll need to install the project’s dependencies first:

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
