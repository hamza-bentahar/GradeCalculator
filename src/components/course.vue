<template>
  <div class="tile is-parent">
    <div class="tile is-child box">
      <course-information :course-id="courseId"></course-information>
      <assignments :course-id="courseId"></assignments>
      <course-controls :course-id="courseId"></course-controls>
      <course-results :course-id="courseId"></course-results>
    </div>
  </div>
</template>

<script>
  import assignments from "./assignments"
  import courseInformation from "./courseInformation"
  import courseControls from "./courseControls"
  import courseResults from "./courseResults"

  export default {
    name: "course",
    components: {
      assignments,
      courseInformation,
      courseControls,
      courseResults
    },
    props: {
      courseId: {
        type: Number,
        required: true
      }
    }
  }
</script>
