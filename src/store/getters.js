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
  },
  getCourseAverage: (state, getters) => (courseId) => {
    const course = getters.getCourseById(courseId)
    let weight = 0
    course.assignments.forEach(assignment => {
      if (assignment.grade !== '' && assignment.weight !== '') {
        weight += parseFloat(assignment.grade) * (parseFloat(assignment.weight) / 100)
      }
    })
    return weight
  },
  getCourseLetterGrade: (state, getters) => (courseId, grade) => {
    const course = getters.getCourseById(courseId)
    let result = ''
    if (grade) {
      course.letterGrades.forEach(function (element) {
        if (!element.max && grade >= element.min) {
          result = element.letter
        } else if ((grade >= element.min) && (grade < element.max)) {
          result = element.letter
        } else if (!element.min && grade < element.max) {
          result = element.letter
        }
      })
    }
    return result
  },
  getRemainingWeight: (state, getters) => (courseId) => {
    let result = 0
    const course = getters.getCourseById(courseId)
    for (let assignment in course.assignments) {
      let info = course.assignments[assignment]
      if (info.grade !== '' && info.weight !== '') {
        result += parseFloat(info.weight)
      }
    }
    return (100 - result)
  },
  getWeightedAverage: (state, getters) => (courseId) => {
    let total = 0
    let cnt = 0
    const course = getters.getCourseById(courseId)
    course.assignments.forEach(assignment => {
      if (assignment.grade !== '' && assignment.weight !== '') {
        cnt ++
        total += parseFloat(assignment.grade) * (parseFloat(assignment.weight) / (100 - getters.getRemainingWeight(courseId)))
      }
    })
    const courseIdx = state.courses.findIndex(course => course.id === courseId)
    state.courses[courseIdx].grade = getters.getCourseLetterGrade(courseId, total)
    return cnt ? total.toFixed(2) : null
  },
  getAssigmentCheck: (state, getters) => (courseId, assigmentIdx) => {
    const course = getters.getCourseById(courseId)
    return course.assignments[assigmentIdx].grade && course.assignments[assigmentIdx].weight
  },
  getGradeNeededOnRemainingAssignment: (state, getters) => (courseId, desiredGrade) => {
    // TODO: fix issue when remaining weight is 0
    return (((desiredGrade - getters.getCourseAverage(courseId)) * 100) / getters.getRemainingWeight(courseId)).toFixed(2)
  },
  getFinalGrade: (state, getters) => (courseId, expectedFinalGrade) => {
    return (((parseFloat(expectedFinalGrade) * getters.getRemainingWeight(courseId)) / 100) + getters.getCourseAverage(courseId)).toFixed(2)
  },
  getAssignmentByIdx: (state, getters) => (courseId, assignmentIdx) => {
    const course = getters.getCourseById(courseId)
    return course.assignments[assignmentIdx]
  }
}

export default getters
