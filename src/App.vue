<template>
    <div>
        <button class="button is-primary" @click="showModal = true">About</button>
        <div class="container is-fluid">
            <courses></courses>
        </div>
        <modal v-show="showModal" @close="closeModal">
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
    },
    methods: {
      closeModal(){
        this.showModal = false
      }
    }
  }
</script>

<style>
    @import "~bulma";
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
