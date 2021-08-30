<template>
<div>
  <button class="button is-small is-primary" @click="addAssignment(courseId)">
    <span><i class="fa fa-plus"></i> Add Assignment</span>
  </button>
  <button class="button is-small is-danger" @click="deleteCourse(courseId)">
    <span><i class="fa fa-times"> Remove this course</i></span>
  </button>
</div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "courseControls",
  props: {
    courseId: {
      type: Number,
      required: true
    }
  },
  methods: {
    ...mapMutations(['addAssignment', 'deleteCourse'])
  }
}
</script>

<style scoped>

</style>
