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
      let courses = this.$ls.get('courses')
      if (courses === null){
        this.$ls.set('courses', this.courses)
      }else{
        this.courses = courses
      }
      Event.$on('delete-course', id => {
        this.courses = this.courses.filter(course => course.id !== id)
      })
      Event.$on('new-input', data => {
        courses = this.courses
        let objIndex = courses.findIndex(obj => obj.id === data.id)
        courses[objIndex].assignments = data.assignments
        courses[objIndex].name = data.name
        courses[objIndex].repeat = data.repeat
        courses[objIndex].letterGrades = data.letterGrades
        this.$ls.set('courses', courses)
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
          ],
          letterGrades: [
            {
              letter: 'A+',
              min: 97,
              max: 100
            },
            {
              letter: 'A',
              min: 93,
              max: 97
            },
            {
              letter: 'A-',
              min: 90,
              max: 93
            },
            {
              letter: 'B+',
              min: 87,
              max: 90
            },
            {
              letter: 'B',
              min: 83,
              max: 87
            },
            {
              letter: 'B-',
              min: 80,
              max: 83
            },
            {
              letter: 'C+',
              min: 77,
              max: 80
            },
            {
              letter: 'C',
              min: 73,
              max: 77
            },
            {
              letter: 'C-',
              min: 70,
              max: 73
            },{
              letter: 'D+',
              min: 67,
              max: 70
            },
            {
              letter: 'D',
              min: 60,
              max: 67
            }
          ]
        }
        this.courses.push(course)
      }
    },
    watch: {
      courses(newVal, oldVal){
        this.$ls.set('courses', newVal)
        console.log(newVal)
      }
    }
  }
</script>

<style scoped>

</style>