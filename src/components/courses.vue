<template>
    <div class="container is-fluid">
        <div class="columns is-multiline">
            <div class="column is-4-desktop is-12-mobile is-6-tablet" v-for="course in courses">
                <course :data="course"></course>
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
</template>

<script>
  /* eslint-disable */
  import Course from './course'

  export default {
    name: "courses",
    components: {
      Course
    },
    data() {
      return {
        courses: []
      }
    },
    mounted(){
      Event.$on('delete-course', id => {
        this.courses = this.courses.filter(course => course.id !== id)
      })
    },
    methods: {
      addCourse() {
        let id = this.courses[this.courses.length - 1]
        id = id === undefined ? 0 : id.id + 1;
        let course = {
          id: id,
          name: '',
          repeat: false,
          assignments: [
            {
              name: '',
              grade: '',
              weight: ''
            },
            {
              name: '',
              grade: '',
              weight: ''
            },
            {
              name: '',
              grade: '',
              weight: ''
            },
            {
              name: '',
              grade: '',
              weight: ''
            },
            {
              name: '',
              grade: '',
              weight: ''
            }
          ]
        }
        this.courses.push(course)
      }
    }
  }
</script>

<style scoped>

</style>