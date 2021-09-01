const actions = {
  updateAssignmentName({state, commit}, {newName, courseId, assignmentIdx}) {
    const courseIdx = state.courses.findIndex(course => course.id === courseId)
    commit('SET_ASSIGNMENT_VALUE', {
      key: 'name',
      newValue: newName,
      courseIdx,
      assignmentIdx
    })
  },
  updateAssignmentGrade({state, commit}, {newGrade, courseId, assignmentIdx}) {
    const courseIdx = state.courses.findIndex(course => course.id === courseId)
    commit('SET_ASSIGNMENT_VALUE', {
      key: 'grade',
      newValue: newGrade,
      courseIdx: courseIdx,
      assignmentIdx: assignmentIdx
    })
  },
  updateAssignmentWeight({state, commit}, {newWeight, courseId, assignmentIdx}) {
    const courseIdx = state.courses.findIndex(course => course.id === courseId)
    commit('SET_ASSIGNMENT_VALUE', {
      'key': 'weight',
      'newValue': newWeight,
      'courseIdx': courseIdx,
      'assignmentIdx': assignmentIdx
    })
  },
  deleteAssignment({state, commit}, {courseId, assignmentIdx}) {
    const courseIdx = state.courses.findIndex(course => course.id === courseId)
    commit('REMOVE_ASSIGNMENT', {
      courseIdx,
      assignmentIdx
    })
  },
  addAssignment({state, commit}, courseId) {
    const courseIdx = state.courses.findIndex(course => course.id === courseId)
    commit('ADD_ASSIGNMENT', courseIdx)
  },
}

export default actions
