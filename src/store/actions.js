const actions = {
  updateAssignmentName({getters, commit}, {newName, courseId, assignmentIdx}) {
    const courseIdx = getters.getCourseIdx(courseId)
    commit('SET_ASSIGNMENT_VALUE', {
      key: 'name',
      newValue: newName,
      courseIdx,
      assignmentIdx
    })
  },
  updateAssignmentGrade({getters, commit}, {newGrade, courseId, assignmentIdx}) {
    const courseIdx = getters.getCourseIdx(courseId)
    commit('SET_ASSIGNMENT_VALUE', {
      key: 'grade',
      newValue: newGrade,
      courseIdx,
      assignmentIdx
    })
  },
  updateAssignmentWeight({getters, commit}, {newWeight, courseId, assignmentIdx}) {
    const courseIdx = getters.getCourseIdx(courseId)
    commit('SET_ASSIGNMENT_VALUE', {
      key: 'weight',
      newValue: newWeight,
      courseIdx,
      assignmentIdx
    })
  },
  deleteAssignment({getters, commit}, {courseId, assignmentIdx}) {
    const courseIdx = getters.getCourseIdx(courseId)
    commit('REMOVE_ASSIGNMENT', {
      courseIdx,
      assignmentIdx
    })
  },
  addAssignment({getters, commit}, courseId) {
    const courseIdx = getters.getCourseIdx(courseId)
    commit('ADD_ASSIGNMENT', courseIdx)
  },
  updateCourseName({getters, commit}, {newName, courseId}) {
    const courseIdx = getters.getCourseIdx(courseId)
    commit('SET_COURSE_VALUE', {
      key: 'name',
      newValue: newName,
      courseIdx: courseIdx
    })
  },
  updateCourseCredits({getters, commit}, {credits, courseId}) {
    const courseIdx = getters.getCourseIdx(courseId)
    commit('SET_COURSE_VALUE', {
      key: 'credits',
      newValue: credits,
      courseIdx: courseIdx
    })
  },
  updateLetterGrades({getters, commit}, {letterGrades, courseId}) {
    const courseIdx = getters.getCourseIdx(courseId)
    commit('SET_COURSE_VALUE', {
      key: 'letterGrades',
      newValue: letterGrades,
      courseIdx: courseIdx
    })
  }
}

export default actions
