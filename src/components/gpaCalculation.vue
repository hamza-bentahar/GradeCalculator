<template>
  <article class="tile notification fixed">
    <div class="content">
      <p class="subtitle">Compute Your GPA</p>
      <div class="content">
        <div>
          <div class="field">
            <div class="control">
              <label for="credits">Credits Earned</label>
              <input type="number" class="input" placeholder="Credits Earned" id="credits"
                     v-model.number="earnedCredits" min="0">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label for="gpa">Overall GPA</label>
              <input type="number" class="input" placeholder="Overall GPA" id="gpa"
                     v-model.number="overallGpa" min="0" max="4">
            </div>
          </div>
        </div>
        <hr>
        <p class="subtitle">Results</p>
        <p>Number of credits for this semester: <strong>{{ getTotalCreditsForSemester }}</strong></p>
        <p>Number of credits after this semester: <strong>{{ getTotalCreditsAfterCurrentSemester }}</strong></p>
        <p>GPA for this semester: <strong>{{ getCurrentSemesterGPA }}</strong></p>
        <p>Overall GPA: <strong>{{ getTotalGPA }}</strong></p>
      </div>
    </div>
  </article>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "gpaCalculation",
  computed: {
    ...mapGetters(['getTotalCreditsForSemester', 'getTotalCreditsAfterCurrentSemester', 'getCurrentSemesterGPA',
      'getTotalGPA']),
    earnedCredits: {
      get () {
        return this.$store.state.earnedCredits
      },
      set (value) {
        this.$store.commit('updateEarnedCredits', value)
      }
    },
    overallGpa: {
      get () {
        return this.$store.state.overallGpa
      },
      set (value) {
        this.$store.commit('updateOverallGPA', value)
      }
    }
  }
}
</script>

<style scoped>

</style>
