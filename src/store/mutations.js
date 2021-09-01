import {BASE_ASSIGNMENTS_NUMBER, DEFAULT_ASSIGNMENT_VALUE} from "./constants"

const mutations = {
  addCourse(state) {
    let lastCourse = state.courses[state.courses.length - 1]
    const id = lastCourse === undefined ? 0 : lastCourse.id + 1
    const assignments = []
    for (let i = 0; i < BASE_ASSIGNMENTS_NUMBER; i++){
      assignments.push(DEFAULT_ASSIGNMENT_VALUE)
    }
    let course = {
      id: id,
      name: '',
      credits: 3,
      grade: '',
      repeat: false,
      assignments: assignments,
      letterGrades: state.letterGrades
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
  ADD_ASSIGNMENT(state, courseIdx) {
    state.courses[courseIdx].assignments.push(DEFAULT_ASSIGNMENT_VALUE)
  },
  REMOVE_ASSIGNMENT(state, {courseIdx, assignmentIdx}) {
    state.courses[courseIdx].assignments.splice(assignmentIdx, 1)
  },
  SET_ASSIGNMENT_VALUE(state, {key, newValue, courseIdx, assignmentIdx}) {
    state.courses[courseIdx].assignments[assignmentIdx][key] = newValue
  },
  updateCourseName(state, {newName, courseId}) {
    const courseIdx = state.courses.findIndex(course => course.id === courseId)
    state.courses[courseIdx].name = newName
  },
  updateCourseCredits(state, {credits, courseId}) {
    const courseIdx = state.courses.findIndex(course => course.id === courseId)
    state.courses[courseIdx].credits = credits
  },
  updateLetterGrades(state, {letterGrades, courseId}) {
    const courseIdx = state.courses.findIndex(course => course.id === courseId)
    state.courses[courseIdx].letterGrades = letterGrades
  }
}

export default mutations
