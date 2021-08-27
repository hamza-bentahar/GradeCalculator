<template>
    <div class="columns">
        <div class="column">
            <div class="columns is-multiline">
                <div class="column is-4-desktop is-12-mobile is-6-tablet" v-for="course in courses"
                     :key="course.id">
                    <course :data="course" :letter-grades="letterGrades"></course>
                </div>
                <div class="column is-4-desktop is-12-mobile is-6-tablet">
                    <div class="tile is-parent">
                        <div class="tile is-child box">
                            <button class="button is-large is-primary" @click="addCourse">ADD COURSE</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="column is-one-fifth">
            <article class="tile notification fixed">
                <div class="content">
                    <p class="subtitle">Compute Your GPA</p>
                    <div class="content">
                        <div>
                            <div class="field">
                                <div class="control">
                                    <label for="credits">Credits Earned</label>
                                    <input type="number" class="input" placeholder="Credits Earned" id="credits"
                                           v-model.number="earnedCredits" min="0">
                                </div>
                            </div>
                            <div class="field">
                                <div class="control">
                                    <label for="gpa">Overall GPA</label>
                                    <input type="number" class="input" placeholder="Overall GPA" id="gpa"
                                           v-model.number="overallGpa" min="0" max="4">
                                </div>
                            </div>
                        </div>
                        <hr>
                        <p class="subtitle">Results</p>
                        <p>Number of credits for this semester: <strong>{{ getTotalCreditsForSemester }}</strong></p>
                        <p>Number of credits after this semester: <strong>{{ getTotalCreditsAfterCurrentSemester }}</strong></p>
                        <p>GPA for this semester: <strong>{{ getCurrentSemesterGPA }}</strong></p>
                        <p>Overall GPA: <strong>{{ getTotalGPA }}</strong></p>
                    </div>
                </div>
            </article>
        </div>
    </div>
</template>

<script>
  /* eslint-disable */
  import Course from './course'
  import {mapState, mapMutations, mapGetters} from 'vuex'

  export default {
    name: "courses",
    components: {
      Course
    },
    mounted() {
      Event.$on('new-input', data => {
        let objIndex = this.courses.findIndex(obj => obj.id === data.id)
        this.courses[objIndex].assignments = data.assignments
        this.courses[objIndex].name = data.name
        this.courses[objIndex].repeat = data.repeat
        this.courses[objIndex].letterGrades = data.letterGrades
      })
    },
    computed: {
      ...mapState(['courses', 'letterGrades']),
      ...mapGetters(['getTotalCreditsForSemester', 'getTotalCreditsAfterCurrentSemester', 'getCurrentSemesterGPA',
        'getTotalGPA']),
      earnedCredits: {
        get () {
          return this.$store.state.earnedCredits
        },
        set (value) {
          this.$store.commit('updateEarnedCredits', value)
        }
      },
      overallGpa: {
        get () {
          return this.$store.state.overallGpa
        },
        set (value) {
          this.$store.commit('updateOverallGPA', value)
        }
      }
    },
    methods: {
      ...mapMutations(['addCourse']),
    }
  }
</script>

<style scoped>
    @media (min-width: 769px) {
        .fixed {
            position: fixed;
        }
    }
</style>
