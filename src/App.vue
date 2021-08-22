<template>
    <div>
        <button class="button is-primary" @click="showModal = true">About</button>
        <div class="container is-fluid">
            <courses></courses>
        </div>
        <modal v-show="showModal" @close="closeModal">
            <article class="tile is-vertical box">
                <p class="title">About</p>
                <p>
                    Aui utilities is a personal project that I wanted to share with the aui community.
                    The purpose is to help students get a better feedback on their academic performance. <br>
                    The main functions are the following:
                </p>
                <div class="content">
                    <ul>
                        <li>Compute total grade</li>
                        <li>Compute future final grade by estimating grade of future assignments</li>
                        <li>Compute grade needed in future assignments to get the desired final grade </li>
                        <li>Estimate current GPA</li>
                        <li>Estimate overall GPA</li>
                    </ul>
                </div>
                <p>
                    The website is very reactive, as soon as you change a value, it recomputes everything else. <br>
                    <br>
                </p>
                <p>
                    The data is saved on your browser, which means that you don't have to fill information every time
                    you reload the page. <br>
                    The data is saved locally, it is not sent through the internet, which gives the benefit of keeping
                    it entirely anonymous, but you will have to fill information again if you want to change the device
                    or the browser. <br> <br>
                </p>
                <p>
                    If you have any suggestion or feedback, you can contact me by email: h.bentahar@aui.ma <br><br>
                </p>
            </article>
        </modal>
    </div>
</template>

<script>
  import Courses from './components/courses'
  import Modal from './components/modal'
  /* eslint-disable */
  export default {
    name: 'app',
    components: {
      Courses,
      Modal
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
