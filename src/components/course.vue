<template>
    <div class="tile is-parent">
        <modal v-show="showModal" @close="showModal = false">
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
                                    <td><input class="input is-small" type="text" v-model="letterGrade.min" v-if="letterGrade.min"></td>
                                    <td><input class="input is-small" type="text" v-model="letterGrade.max" v-if="letterGrade.max"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <footer class="card-footer">
                    <a href="#" class="card-footer-item">Save</a>
                    <a href="#" class="card-footer-item">Reset</a>
                </footer>
            </div>
        </modal>
        <div class="tile is-child box">
            <div v-if="course" @input="newInput">
                <div class="columns">
                    <div class="column is-9">
                        <div class="field">
                            <div class="control">
                                <input class="input" type="text" placeholder="Course Name" v-model="data.name">
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
        return (((parseFloat(this.prediction) * this.remainingWeight()) / 100) + this.weightedAverage()).toFixed(2)
      },
      remainingAssignments() {
        return (((this.remaining - this.weightedAverage()) * 100) / this.remainingWeight()).toFixed(2)
      }
    },
    mounted() {
      this.course = this.data
      this.userLetterGrades = this.letterGrades
    },
    methods: {
      weightedAverage() {
        let weight = 0
        for (let assignment in this.course.assignments) {
          let info = this.course.assignments[assignment]
          if (info.grade !== '' && info.weight !== '') {
            weight += parseFloat(info.grade) * (parseFloat(info.weight) / 100)
          }
        }
        return weight
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
        for (let letterGrade in this.course.letterGrades) {
          let value = this.course.letterGrades[letterGrade]
          if ((grade >= value.min) && (grade < value.max)) {
            result = value.letter
          }
          else if (!value.max && grade >= value.min) {
            result = value.letter
          } else if (!value.min && grade < value.max) {
            result = value.letter
          }
        }
        return result
      }
    }
  }
</script>

<style scoped>

</style>