<template>
    <div class="columns">
        <div class="column">
            <div class="columns is-multiline">
                <div class="column is-4-desktop is-12-mobile is-6-tablet" v-for="course in courses"
                     :key="course.id">
                    <course :data="course" :letter-grades="letterGrades"></course>
                </div>
                <div class="column is-4-desktop is-12-mobile is-6-tablet">
                    <div class="tile is-parent">
                        <div class="tile is-child box">
                            <button class="button is-large is-primary" @click="addCourse">ADD COURSE</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="column is-one-fifth">
            <gpa-calculation></gpa-calculation>
        </div>
    </div>
</template>

<script>
  /* eslint-disable */
  import Course from './course'
  import gpaCalculation from "./gpaCalculation"
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: "courses",
    components: {
      Course,
      gpaCalculation
    },
    mounted() {
      Event.$on('new-input', data => {
        let objIndex = this.courses.findIndex(obj => obj.id === data.id)
        this.courses[objIndex].assignments = data.assignments
        this.courses[objIndex].name = data.name
        this.courses[objIndex].repeat = data.repeat
        this.courses[objIndex].letterGrades = data.letterGrades
      })
    },
    computed: {
      ...mapState(['courses', 'letterGrades']),
    },
    methods: {
      ...mapMutations(['addCourse']),
    }
  }
</script>

<style scoped>
    @media (min-width: 769px) {
        .fixed {
            position: fixed;
        }
    }
</style>
