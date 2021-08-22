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
                        <p>Number of credits for this semester: <strong>{{ totalCreditsForSemester() }}</strong></p>
                        <p>Number of credits after this semester: <strong>{{ overallTotalCredits( )}}</strong></p>
                        <p>GPA for this semester: <strong>{{ semesterGpa }}</strong></p>
                        <p>Overall GPA: <strong>{{ totalGpa }}</strong></p>
                    </div>
                </div>
            </article>
        </div>
    </div>
</template>

<script>
  /* eslint-disable */
  import Course from './course'

  export default {
    name: "courses",
    components: {
      Course
    },
    data() {
      return {
        earnedCredits: null,
        overallGpa: null,
        courses: [],
        letterGrades: [
          {
            letter: 'A+',
            min: 97,
            max: null,
            gpa: 4.0
          },
          {
            letter: 'A',
            min: 93,
            max: 97,
            gpa: 4.0
          },
          {
            letter: 'A-',
            min: 90,
            max: 93,
            gpa: 3.7
          },
          {
            letter: 'B+',
            min: 87,
            max: 90,
            gpa: 3.3
          },
          {
            letter: 'B',
            min: 83,
            max: 87,
            gpa: 3.0
          },
          {
            letter: 'B-',
            min: 80,
            max: 83,
            gpa: 2.7
          },
          {
            letter: 'C+',
            min: 77,
            max: 80,
            gpa: 2.3
          },
          {
            letter: 'C',
            min: 73,
            max: 77,
            gpa: 2.0
          },
          {
            letter: 'C-',
            min: 70,
            max: 73,
            gpa: 1.7
          }, {
            letter: 'D+',
            min: 67,
            max: 70,
            gpa: 1.3
          },
          {
            letter: 'D',
            min: 60,
            max: 67,
            gpa: 1.0
          },
          {
            letter: 'F',
            min: null,
            max: 60,
            gpa: 0.0
          }
        ]
      }
    },
    mounted() {
      let courses = this.$ls.get('courses')
      if (courses === null) {
        this.$ls.set('courses', this.courses)
      } else {
        this.courses = courses
      }
      Event.$on('delete-course', id => {
        this.courses = this.courses.filter(course => course.id !== id)
      })
      Event.$on('new-input', data => {
        courses = this.courses
        let objIndex = courses.findIndex(obj => obj.id === data.id)
        courses[objIndex].assignments = data.assignments
        courses[objIndex].name = data.name
        courses[objIndex].repeat = data.repeat
        courses[objIndex].letterGrades = data.letterGrades
        this.$ls.set('courses', courses)
      })
    },
    computed: {
      semesterGpa() {
        let total = 0
        this.courses.forEach(course => {
          let result = this.letterGrades.find(letterGrade => letterGrade.letter === course.grade)
          if (result) {
            total += result.gpa * course.credits
          }
        })
        return (total / this.totalCreditsForSemester()).toFixed(2)
      },
      totalGpa() {
        return (this.overallGpa * ((this.overallTotalCredits() - this.totalCreditsForSemester()) / this.overallTotalCredits()) + this.semesterGpa * (this.totalCreditsForSemester() / this.overallTotalCredits())).toFixed(2)
      }
    },
    methods: {
      addCourse() {
        let id = this.courses[this.courses.length - 1]
        id = id === undefined ? 0 : id.id + 1;
        let course = {
          id: id,
          name: '',
          credits: null,
          grade: '',
          repeat: false,
          assignments: [
            {
              name: '',
              grade: '',
              weight: ''
            },
            {
              name: '',
              grade: '',
              weight: ''
            },
            {
              name: '',
              grade: '',
              weight: ''
            },
            {
              name: '',
              grade: '',
              weight: ''
            },
            {
              name: '',
              grade: '',
              weight: ''
            }
          ],
          letterGrades: this.letterGrades
        }
        this.courses.push(course)
      },
      totalCreditsForSemester() {
        let total = 0
        this.courses.forEach(course => {
          if (Number.isInteger(course.credits)) {
            total += course.credits
          }
        })
        return total
      },
      overallTotalCredits() {
        return this.totalCreditsForSemester() + this.earnedCredits
      }
    },
    watch: {
      courses(newVal, oldVal) {
      }
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
