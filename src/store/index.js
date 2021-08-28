import Vuex from 'vuex'
import Vue from "vue"
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

const state = {
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
  ],
  earnedCredits: null,
  overallGpa: null,
}
const getters = {
  getTotalCreditsForSemester(state) {
    let total = 0
    state.courses.forEach(course => {
      if (Number.isInteger(course.credits)) {
        total += course.credits
      }
    })
    return total
  },
  getTotalCreditsAfterCurrentSemester(state, getters){
    return getters.getTotalCreditsForSemester + state.earnedCredits
  },
  getCurrentSemesterGPA(state, getters) {
    let total = 0
    state.courses.forEach(course => {
      // TODO: find letter grade specific to the course
      let result = state.letterGrades.find(letterGrade => letterGrade.letter === course.grade)
      if (result) {
        total += result.gpa * course.credits
      }
    })
    return (total / getters.getTotalCreditsForSemester).toFixed(2)
  },
  getTotalGPA(state, getters) {
    return (state.overallGpa * ((getters.getTotalCreditsAfterCurrentSemester - getters.getTotalCreditsForSemester) / getters.getTotalCreditsAfterCurrentSemester) + getters.getCurrentSemesterGPA * (getters.getTotalCreditsForSemester / getters.getTotalCreditsAfterCurrentSemester)).toFixed(2)
  },
  getCourseById: (state) => (courseId) => {
    return state.courses.find(course => course.id === courseId)
  }
}
const mutations = {
  addCourse(state) {
    let lastCourse = state.courses[state.courses.length - 1]
    const id = lastCourse === undefined ? 0 : lastCourse.id + 1;
    let course = {
      id: id,
      name: '',
      credits: 3,
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
    state.courses.push(course)
  },
  deleteCourse(state, id) {
    const course = state.courses.find(course => course.id === id)
    if (confirm("Are you sure that you want to remove the course " + course.name + " from the list?")) {
      state.courses = state.courses.filter(course => course.id !== id)
    }
  },
  updateEarnedCredits(state, credits) {
    state.earnedCredits = credits
  },
  updateOverallGPA(state, gpa) {
    state.overallGpa = gpa
  },
  addAssignment(state, courseId) {
    const courseIndex = state.courses.findIndex(course => course.id === courseId)
    state.courses[courseIndex].assignments.push({
      name: '',
      grade: '',
      weight: ''
    })
  }
}
const actions = {}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [vuexLocal.plugin]
})

export default store
