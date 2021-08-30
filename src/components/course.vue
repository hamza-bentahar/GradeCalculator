<template>
    <div class="tile is-parent">
        <div class="tile is-child box">
          <div v-if="course">
            <course-information :course-id="courseId"></course-information>
              <assignments :course-id="courseId"></assignments>
              <course-controls :course-id="courseId"></course-controls>
              <h6>Your average grade : <strong>
                {{ getWeightedAverage(courseId) ? getWeightedAverage(courseId) + '%' : ''}}
                {{ getCourseLetterGrade(courseId, getWeightedAverage(courseId)) ? '(' + getCourseLetterGrade(courseId, getWeightedAverage(courseId)) + ')' : 'Add an assignment to compute your grade'}}
              </strong></h6>
                <hr>
                <div class="columns">
                    <div class="column">
                        <div class="field">
                            <div class="control">
                                <label>What is your desired grade?</label>
                                <input class="input" type="number" placeholder="Grade (%)" v-model.number="desiredGrade">
                            </div>
                        </div>
                        <p v-if="desiredGrade">
                          To end up with a grade of {{ desiredGrade }}%
                          ({{ getCourseLetterGrade(courseId, desiredGrade) }}), you will need
                          <strong>{{ getGradeNeededOnRemainingAssignment(courseId, desiredGrade) }}%</strong>
                          on the remaining assignments.
                        </p>
                    </div>
                    <div class="column">
                        <div class="field">
                            <div class="control">
                                <label>Prediction on the future assignments</label>
                                <input class="input" type="number" placeholder="Grade (%)" v-model="expectedFinalGrade">
                            </div>
                        </div>
                        <p v-if="expectedFinalGrade">
                          Your final grade is going to be
                          <strong>{{ getFinalGrade(courseId, expectedFinalGrade) }}
                            ({{ getCourseLetterGrade(courseId, getFinalGrade(courseId, expectedFinalGrade))}})</strong>
                          if you get {{ expectedFinalGrade }}% on the remaining assignments
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import assignments from "./assignments"
  import courseInformation from "./courseInformation"
  import courseControls from "./courseControls"
  import {mapGetters} from 'vuex'

  export default {
    name: "course",
    components: {
      assignments,
      courseInformation,
      courseControls
    },
    props: {
      letterGrades: {
        type: Array
      },
      courseId: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        expectedFinalGrade: null,
        desiredGrade: null
      }
    },
    computed: {
      ...mapGetters(['getCourseById', 'getCourseLetterGrade', 'getWeightedAverage',
        'getGradeNeededOnRemainingAssignment', 'getFinalGrade']),
      course() {
        return this.getCourseById(this.courseId)
      }
    },
    mounted() {
      Event.$on('updated-course-settings', (val) => {
        this.course.letterGrades = val
      })
    }
  }
</script>
