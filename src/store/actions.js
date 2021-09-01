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
      courseIdx: courseIdx,
      assignmentIdx: assignmentIdx
    })
  },
  updateAssignmentWeight({getters, commit}, {newWeight, courseId, assignmentIdx}) {
    const courseIdx = getters.getCourseIdx(courseId)
    commit('SET_ASSIGNMENT_VALUE', {
      'key': 'weight',
      'newValue': newWeight,
      'courseIdx': courseIdx,
      'assignmentIdx': assignmentIdx
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
}

export default actions
