<template>
    <div class="tile is-parent">
        <div class="tile is-child box">
            <div v-if="course">
                <div class="field">
                    <div class="control">
                        <input class="input" type="text" placeholder="Course Name" v-model="data.name">
                    </div>
                </div>
                <table class="table is-narrow">
                    <thead>
                    <tr>
                        <th>Assignment</th>
                        <th>Grade</th>
                        <th>Weight</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="assignment in course.assignments">
                        <td>
                            <div class="field">
                                <div class="control">
                                    <input class="input is-small" type="text" placeholder="Name"
                                           v-model="assignment.name">
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="field">
                                <div class="control">
                                    <input class="input is-small" type="number" v-model="assignment.grade">
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="field">
                                <div class="control">
                                    <input class="input is-small" type="number" v-model="assignment.weight">
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="columns">
                    <div class="column">
                        <div class="field">
                            <div class="control">
                                <label>What is your desired grade?</label>
                                <input class="input" type="number" placeholder="Grade (%)" v-model="remaining">
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="field">
                            <div class="control">
                                <label>Prediction on the future assignments</label>
                                <input class="input" type="number" placeholder="Grade (%)" v-model="prediction">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <p v-if="remaining">
                        coucou
                    </p> <br>
                    <p v-if="!isNaN(finalGrade)">
                        Your final grade is gonna be <strong>{{ finalGrade }}</strong> if you get {{ prediction }}% on
                        the remaining assignments
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  /* eslint-disable */
  export default {
    name: "course",
    props: {
      data: {
        required: true,
        type: Object
      }
    },
    data() {
      return {
        course: null,
        prediction: null,
        remaining: null
      }
    },
    computed: {
      finalGrade() {
        let average = 0
        let weight = 0
        for (let assignment in this.course.assignments){
          let info = this.course.assignments[assignment]
          if (info.grade !== '' || info.weight !== '') {
            weight += parseFloat(info.weight)
            average += (parseFloat(info.grade) * parseFloat(info.weight))/100
          }
        }
        average += parseFloat(this.prediction) * (100 - weight)/100
        return average
      },
      remainingAssignments() {
        return this.course
      }
    },
    mounted() {
      this.course = this.data
    }
  }
</script>

<style scoped>

</style>