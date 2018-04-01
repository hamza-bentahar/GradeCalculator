<template>
    <div class="tile is-parent">
        <modal v-show="showModal" @close="closeModal">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">
                        Change Letter Grades for {{ data.name }}
                    </p>
                </header>
                <div class="card-content">
                    <div class="content">
                        <table class="table is-narrow">
                            <thead>
                            <tr>
                                <th>Letter</th>
                                <th>Min</th>
                                <th>Max</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr :key="index" v-for="(letterGrade, index) in userLetterGrades">
                                <td>{{ letterGrade.letter}}</td>
                                <td><input class="input is-small" type="text" v-model.number="letterGrade.min"
                                           v-if="letterGrade.min"></td>
                                <td><input class="input is-small" type="text" v-model.number="letterGrade.max"
                                           v-if="letterGrade.max"></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <footer class="card-footer">
                    <a href="#" class="card-footer-item" @click="save">Save</a>
                    <a href="#" class="card-footer-item" @click="reset">Reset</a>
                </footer>
            </div>
        </modal>
        <div class="tile is-child box">
            <div v-if="course" @input="newInput">
                <div class="columns">
                    <div class="column is-8">
                        <div class="field">
                            <div class="control">
                                <input class="input" type="text" placeholder="Course Name" v-model="data.name">
                            </div>
                        </div>
                        <div class="field">
                            <div class="control">
                                <input type="number" class="input" placeholder="Credits" v-model.number="data.credits" min="0" max="7" step="1">
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <button class="button" @click="showModal = true">Settings</button>
                    </div>
                </div>
                <table class="table is-narrow">
                    <thead>
                    <tr>
                        <th>Assignment</th>
                        <th>Grade</th>
                        <th>Weight</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(assignment, index) in course.assignments" :key="index">
                        <td>
                            <div class="field">
                                <div class="control">
                                    <input class="input is-small" type="text" placeholder="Name"
                                           v-model="assignment.name">
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="field">
                                <div class="control">
                                    <input class="input is-small" type="number" v-model="assignment.grade">
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="field">
                                <div class="control">
                                    <input class="input is-small" type="number" v-model="assignment.weight">
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <h6>Your average grade : <strong>{{ weightedAverage()}} ({{ getLetterGrade(weightedAverage())}})</strong></h6>
                <button class="button is-small is-primary" @click="add">Add Assignment</button>
                <button class="button is-small is-danger" @click="remove">Remove last row</button>
                <button class="button is-small is-danger" @click="deleteCourse">Remove this course from the list
                </button>
                <hr>
                <div class="columns">
                    <div class="column">
                        <div class="field">
                            <div class="control">
                                <label>What is your desired grade?</label>
                                <input class="input" type="number" placeholder="Grade (%)" v-model="remaining">
                            </div>
                        </div>
                        <p v-if="remaining">
                            To end up with a grade of {{ remaining }}% ({{ getLetterGrade(remaining)}}), you will need
                            <strong>{{ remainingAssignments
                                }}%</strong> on the
                            remaining assignments.
                        </p>
                    </div>
                    <div class="column">
                        <div class="field">
                            <div class="control">
                                <label>Prediction on the future assignments</label>
                                <input class="input" type="number" placeholder="Grade (%)" v-model="prediction">
                            </div>
                        </div>
                        <p v-if="prediction">
                            Your final grade is going to be <strong>{{ finalGrade }} ({{
                            getLetterGrade(finalGrade)}})</strong> if you get {{ prediction }}%
                            on
                            the remaining assignments
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  /* eslint-disable */
  import modal from './modal'

  export default {
    name: "course",
    components: {
      modal
    },
    props: {
      data: {
        required: true,
        type: Object
      },
      letterGrades: {
        type: Array
      }
    },
    data() {
      return {
        course: null,
        prediction: null,
        remaining: null,
        showModal: false,
        userLetterGrades: []
      }
    },
    computed: {
      finalGrade() {
        return (((parseFloat(this.prediction) * this.remainingWeight()) / 100) + this.average()).toFixed(2)
      },
      remainingAssignments() {
        return (((this.remaining - this.average()) * 100) / this.remainingWeight()).toFixed(2)
      }
    },
    mounted() {
      this.course = this.data
      this.userLetterGrades = this.course.letterGrades
    },
    methods: {
      average() {
        let weight = 0
        this.course.assignments.forEach(assignment => {
          if (assignment.grade !== '' && assignment.weight !== '') {
            weight += parseFloat(assignment.grade) * (parseFloat(assignment.weight) / 100)
          }
        })
        return weight
      },
      weightedAverage(){
        let total = 0
        this.course.assignments.forEach(assignment => {
          if (assignment.grade !== '' && assignment.weight !== '') {
            total += parseFloat(assignment.grade) * (parseFloat(assignment.weight) / (100 - this.remainingWeight()))
          }
        })
        this.course.grade = this.getLetterGrade(total)
        Event.$emit('new-input', this.course)
        return total.toFixed(2)
      },
      remainingWeight() {
        let result = 0
        for (let assignment in this.course.assignments) {
          let info = this.course.assignments[assignment]
          if (info.grade !== '' && info.weight !== '') {
            result += parseFloat(info.weight)
          }
        }
        return (100 - result)
      },
      add() {
        this.course.assignments.push({
          name: '',
          grade: '',
          weight: ''
        })
      },
      remove() {
        this.course.assignments.pop()
      },
      save() {
        this.course.letterGrades = this.userLetterGrades
        Event.$emit('new-input', this.course)
      },
      reset() {
        this.userLetterGrades = this.letterGrades
        Event.$emit('new-input', this.course)
      },
      closeModal() {
        this.showModal = false
      },
      deleteCourse() {
        if (confirm("Are you sure that you want to remove the course " + this.course.name + " from the list?")) {
          Event.$emit('delete-course', this.course.id)
        }
      },
      newInput() {
        Event.$emit('new-input', this.course)
      },
      getLetterGrade(grade) {
        let result = ''
        this.course.letterGrades.forEach(function (element) {
          if (!element.max && grade >= element.min) {
            result = element.letter
          } else if ((grade >= element.min) && (grade < element.max)) {
            result = element.letter
          } else if (!element.min && grade < element.max) {
            result = element.letter
          }
        })
        return result
      }
    }
  }
</script>

<style scoped>

</style>