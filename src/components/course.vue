<template>
    <div class="tile is-parent">
        <modal v-show="showModal" @close="closeModal">
          <course-settings :course-name="course.name" :letter-grades="letterGrades" :course="course"></course-settings>
        </modal>
        <div class="tile is-child box">
            <div v-if="course" @input="newInput">
                <div class="columns">
                    <div class="column is-8">
                        <div class="field">
                            <div class="control">
                                <input class="input" type="text" placeholder="Course Name" v-model="course.name">
                            </div>
                        </div>
                        <div class="field">
                            <div class="control">
                                <input type="number" class="input" placeholder="Credits" v-model.number="course.credits"
                                       min="0" max="7" step="1">
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="field">
                            <button class="button" @click="showModal = true">
                              <span><i class="fa fa-cog"></i> Settings</span>
                            </button>
                        </div>
                    </div>
                </div>
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
                <h6>Your average grade : <strong>
                    {{ getWeightedAverage(courseId) ? getWeightedAverage(courseId) + '%' : ''}}
                    {{ getCourseLetterGrade(courseId, getWeightedAverage(courseId)) ? '(' + getCourseLetterGrade(courseId, getWeightedAverage(courseId)) + ')' : 'Add an assignment to compute your grade'}}
                </strong></h6>
                <button class="button is-small is-primary" @click="addAssignment(courseId)">
                  <span><i class="fa fa-plus"></i> Add Assignment</span>
                </button>
                <button class="button is-small is-danger" @click="deleteCourse(course.id)">
                  <span><i class="fa fa-times"> Remove this course</i></span>
                </button>
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
  /* eslint-disable */
  import modal from './modal'
  import courseSettings from "./courseSettings"
  import assignment from "./assignment"
  import {mapMutations, mapGetters} from 'vuex'

  export default {
    name: "course",
    components: {
      modal,
      courseSettings,
      assignment
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
        desiredGrade: null,
        showModal: false
      }
    },
    computed: {
      ...mapGetters(['getCourseById', 'getCourseLetterGrade', 'getWeightedAverage', 'getRemainingWeight',
        'getAssigmentCheck', 'getGradeNeededOnRemainingAssignment', 'getFinalGrade']),
      course() {
        return this.getCourseById(this.courseId)
      }
    },
    mounted() {
      Event.$on('updated-course-settings', (val) => {
        this.course.letterGrades = val
      })
      Event.$on('close-settings-modal', () => {
        this.closeModal()
      })
    },
    methods: {
      ...mapMutations(['deleteCourse', 'addAssignment', 'removeAssignment', 'updateAssignmentName',
                      'updateAssignmentGrade', 'updateAssignmentWeight']),
      closeModal() {
        this.showModal = false
      },
      newInput() {
        Event.$emit('new-input', this.course)
      }
    }
  }
</script>

<style scoped>
    .pointer:hover {
        cursor: pointer;
    }
</style>
