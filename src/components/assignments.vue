<template>
<div>
  <table class="table is-narrow">
    <thead>
    <tr>
      <th>Assignment</th>
      <th>Grade (%)</th>
      <th>Weight (%)</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <assignment
        :course-id="courseId"
        :assignment-idx="assignmentIdx"
        v-for="(assignment, assignmentIdx) in course.assignments"
        :key="assignmentIdx">
    </assignment>
    </tbody>
  </table>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import assignment from "./assignment"

export default {
  name: "assignments",
  components: {
    assignment
  },
  props: {
    courseId: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapGetters(['getCourseById']),
    course() {
      return this.getCourseById(this.courseId)
    }
  }
}
</script>

<style scoped>

</style>
