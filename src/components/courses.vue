<template>
  <div class="columns is-multiline">
      <div class="column is-4-desktop is-12-mobile is-6-tablet" v-for="course in courses" :key="course.id">
          <course :course-id="course.id"/>
      </div>
      <div class="column is-4-desktop is-12-mobile is-6-tablet">
          <div class="tile is-parent">
              <div class="tile is-child box">
                  <button class="button is-large is-primary" @click="addCourse">ADD COURSE</button>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import Course from './course'
  import {mapState, mapActions} from 'vuex'

  export default {
    name: "courses",
    components: {
      Course
    },
    computed: {
      ...mapState(['courses']),
    },
    methods: {
      ...mapActions(['addCourse']),
    }
  }
</script>
