<template>
  <div class="columns">
    <modal v-show="showModal" @close="closeModal">
      <course-settings :course-id="courseId"></course-settings>
    </modal>
    <div class="column is-8">
      <div class="field">
        <div class="control">
          <input class="input"
                 type="text"
                 placeholder="Course Name"
                 :value="course.name"
                 @input="inputCourseName">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input type="number"
                 class="input"
                 placeholder="Credits"
                 :value="course.credits"
                 @input="inputCourseCredits"
                 min="0"
                 max="7"
                 step="1">
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
</template>

<script>
import modal from './modal'
import courseSettings from "./courseSettings"
import {mapGetters, mapActions} from "vuex";

export default {
  name: "courseInformation",
  components: {
    modal,
    courseSettings
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
  },
  mounted() {
    Event.$on('close-settings-modal', () => {
      this.closeModal()
    })
  },
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    ...mapActions(['updateCourseName', 'updateCourseCredits']),
    inputCourseName(event) {
      this.updateCourseName({
        newName: event.target.value,
        courseId: this.courseId
      })
    },
    inputCourseCredits(event) {
      this.updateCourseCredits({
        credits: Number(event.target.value),
        courseId: this.courseId
      })
    },
    closeModal() {
      this.showModal = false
    }
  }
}
</script>

<style scoped>

</style>
