<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        Change Letter Grades for {{ course.name }}
      </p>
    </header>
    <div class="card-content">
      <div class="content">
        <div class="notification is-primary">
          <p>
            Here you can you change the official grades of the course <strong>{{ course.name }}</strong>,
            by changing the mark range for each letter grade.
          </p>
        </div>
        <table class="table is-narrow">
          <thead>
          <tr>
            <th>Letter</th>
            <th>Min</th>
            <th>Max</th>
          </tr>
          </thead>
          <tbody>
          <tr :key="index" v-for="(letterGrade, index) in userLetterGrades">
            <td>{{ letterGrade.letter}}</td>
            <td><input class="input is-small" type="number" v-model.number="letterGrade.min"
                       v-if="letterGrade.min !== null"></td>
            <td><input class="input is-small" type="number" v-model.number="letterGrade.max"
                       v-if="letterGrade.max != null"></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item" @click="save">Save</a>
      <a href="#" class="card-footer-item" @click="reset">Reset</a>
    </footer>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "courseSettings",
  data() {
    return {
      userLetterGrades: []
    }
  },
  props: {
    courseId: {
      type: Number,
      required: true
    }
  },
  mounted() {
    this.userLetterGrades = this.course.letterGrades
  },
  computed: {
    ...mapGetters(['getCourseById']),
    course() {
      return this.getCourseById(this.courseId)
    }
  },
  methods: {
    ...mapMutations(['updateLetterGrades']),
    save(close = true) {
      this.updateLetterGrades({
        letterGrades: this.userLetterGrades,
        courseId: this.courseId
      })
      this.$toasted.show('Settings saved', {
        theme: "toasted-primary",
        position: "top-right",
        duration : 3000
      })
      if (close) Event.$emit('close-settings-modal')
    },
    reset() {
      // TODO: this function should reset to original state
      this.userLetterGrades = this.course.letterGrades
      this.$toasted.show('Settings reset', {
        theme: "toasted-primary",
        position: "top-right",
        duration : 3000
      })
      // if (close) Event.$emit('close-settings-modal')
    },
  }
}
</script>

<style scoped>

</style>
