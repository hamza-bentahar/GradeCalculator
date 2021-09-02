import {DEFAULT_ASSIGNMENT_VALUE} from "./constants"

const mutations = {
  ADD_COURSE(state, course) {
    state.courses.push(course)
  },
  REMOVE_COURSE(state, courseId) {
    state.courses = state.courses.filter(course => course.id !== courseId)
  },
  SET_EARNED_CREDITS(state, credits) {
    state.earnedCredits = credits
  },
  SET_OVERALL_GPA(state, gpa) {
    state.overallGpa = gpa
  },
  ADD_ASSIGNMENT(state, courseIdx) {
    state.courses[courseIdx].assignments.push({...DEFAULT_ASSIGNMENT_VALUE})
  },
  REMOVE_ASSIGNMENT(state, {courseIdx, assignmentIdx}) {
    state.courses[courseIdx].assignments.splice(assignmentIdx, 1)
  },
  SET_ASSIGNMENT_VALUE(state, {key, newValue, courseIdx, assignmentIdx}) {
    state.courses[courseIdx].assignments[assignmentIdx][key] = newValue
  },
  SET_COURSE_VALUE(state, {key, newValue, courseIdx}) {
    state.courses[courseIdx][key] = newValue
  }
}

export default mutations
