<template>
    <div>
        <button class="button is-primary" @click="showModal = true">About</button>
        <div class="container is-fluid">
            <courses></courses>
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
  /* eslint-disable */
  export default {
    name: 'app',
    components: {
      Courses,
      Modal,
      about
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
