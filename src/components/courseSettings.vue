<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        Change Letter Grades for {{ courseName }}
      </p>
    </header>
    <div class="card-content">
      <div class="content">
        <div class="notification is-primary">
          <p>
            Here you can you change the official grades of the course <strong>{{ courseName }}</strong>,
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
export default {
  name: "courseSettings",
  data() {
    return {
      userLetterGrades: []
    }
  },
  props: {
    courseName: {
      type: String,
      required: true
    },
    letterGrades: {
      type: Array,
      default: () => []
    },
    course: {
      type: Object
    }
  },
  mounted() {
    this.userLetterGrades = this.letterGrades
  },
  methods: {
    save(close = true) {
      Event.$emit('updated-course-settings', this.userLetterGrades)
      Event.$emit('close-settings-modal')
      Event.$emit('new-input', this.course)
      this.$toasted.show('Settings saved', {
        theme: "toasted-primary",
        position: "top-right",
        duration : 3000
      })
      if (close) Event.$emit('close-settings-modal')
    },
    reset() {
      this.userLetterGrades = this.letterGrades
      Event.$emit('new-input', this.course)
      this.$toasted.show('Settings reset and saved', {
        theme: "toasted-primary",
        position: "top-right",
        duration : 3000
      })
      this.save(false)
    },
  }
}
</script>

<style scoped>

</style>
