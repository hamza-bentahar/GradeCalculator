<template>
    <div>
        <button class="button is-primary" @click="showModal = true">About</button>
        <div class="container is-fluid">
          <div class="columns">
            <div class="column">
              <courses></courses>
            </div>
            <div class="column is-one-fifth">
              <gpa-calculation></gpa-calculation>
            </div>
          </div>
        </div>
        <modal v-show="showModal" @close="showModal = false">
            <about></about>
        </modal>
    </div>
</template>

<script>
  import Courses from './components/courses'
  import Modal from './components/modal'
  import about from "./components/about"
  import gpaCalculation from "./components/gpaCalculation"
  /* eslint-disable */
  export default {
    name: 'app',
    components: {
      Courses,
      Modal,
      about,
      gpaCalculation
    },
    data(){
      return{
        showModal: false
      }
    }
  }
</script>

<style>
    @import "~bulma";
</style>
