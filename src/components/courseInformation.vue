<template>
  <div class="columns">
    <modal v-show="showModal" @close="closeModal">
      <course-settings :course-name="course.name" :letter-grades="course.letterGrades" :course="course"></course-settings>
    </modal>
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
</template>

<script>
import modal from './modal'
import courseSettings from "./courseSettings"
import {mapGetters} from "vuex";

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
    closeModal() {
      this.showModal = false
    }
  }
}
</script>

<style scoped>

</style>
