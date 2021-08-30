<template>
  <tr>
    <td>
      <div class="field">
        <div class="control has-icons-right">
          <input class="input is-small"
                 type="email"
                 placeholder="Name"
                 :value="assignment.name"
                 @input="inputAssignmentName($event, assignmentIdx)">
          <span class="icon is-right" v-if="getAssigmentCheck(courseId, assignmentIdx)">
            <i class="fa fa-check has-text-success"></i>
          </span>
        </div>
      </div>
    </td>
    <td>
      <div class="field">
        <div class="control">
          <input class="input is-small"
                 type="number"
                 :value="assignment.grade"
                 @input="inputAssignmentGrade($event, assignmentIdx)">
        </div>
      </div>
    </td>
    <td>
      <div class="field">
        <div class="control">
          <input class="input is-small"
                 type="number"
                 min="0"
                 :value="assignment.weight"
                 @input="inputAssignmentWeight($event, assignmentIdx)">
        </div>
      </div>
    </td>
    <td>
      <i class="fa fa-minus-circle has-text-danger pointer" @click="removeAssignment({courseId, assignmentIdx})"></i>
    </td>
  </tr>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex'
export default {
  name: "assignment",
  props: {
    courseId: {
      type: Number,
      required: true
    },
    assignmentIdx: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapGetters(['getCourseById', 'getAssigmentCheck', 'getAssignmentByIdx']),
    course() {
      return this.getCourseById(this.courseId)
    },
    assignment() {
      return this.getAssignmentByIdx(this.courseId, this.assignmentIdx)
    }
  },
  methods: {
    ...mapMutations(['removeAssignment', 'updateAssignmentName', 'updateAssignmentGrade', 'updateAssignmentWeight']),
    inputAssignmentName(event, assignmentIdx) {
      this.updateAssignmentName({
        newName: event.target.value,
        courseId: this.courseId,
        assignmentIdx: assignmentIdx
      })
    },
    inputAssignmentGrade(event, assigmentIdx) {
      this.updateAssignmentGrade({
        newGrade: Number(event.target.value),
        courseId: this.courseId,
        assignmentIdx: assigmentIdx
      })
    },
    inputAssignmentWeight(event, assigmentIdx) {
      this.updateAssignmentWeight({
        newWeight: Number(event.target.value),
        courseId: this.courseId,
        assignmentIdx: assigmentIdx
      })
    },
  }
}
</script>

<style scoped>
.pointer:hover {
  cursor: pointer;
}
</style>
