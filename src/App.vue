<template>
    <div>
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-menu">
                <div class="navbar-end">
                    <button class="button is-primary" @click="showModal = true">Help</button>
                </div>
            </div>
        </nav>
        <div class="container is-fluid">
            <courses></courses>
        </div>
        <modal v-show="showModal" @close="closeModal">
            <article class="tile is-vertical box">
                <p class="title">Help!</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur est inventore ipsum reiciendis? Accusantium asperiores at beatae cumque cupiditate dicta eveniet, impedit laudantium maiores modi necessitatibus, quas quasi quis quos repudiandae, sapiente voluptatibus. Ab consequatur consequuntur dignissimos, doloremque doloribus harum illum ipsam ipsum laborum magni maiores minus nobis nulla obcaecati reiciendis repellendus reprehenderit veniam! Assumenda esse ipsa labore laboriosam praesentium quaerat quibusdam recusandae reprehenderit, sunt vitae? Aperiam architecto assumenda consequatur consequuntur debitis deleniti dignissimos dolorem dolorum, esse ex excepturi illo impedit inventore magnam magni minima minus neque nihil numquam odio odit perferendis placeat qui quia reiciendis rerum sapiente similique! Ad asperiores itaque libero minus rem? Ab beatae consectetur consequuntur, earum iste placeat vitae. Ad aliquid amet aperiam, aspernatur assumenda at aut blanditiis corporis debitis deserunt doloremque dolores, doloribus eos est explicabo impedit iste itaque minima necessitatibus perspiciatis qui quos, sint sunt suscipit velit. Debitis, obcaecati, placeat? Deserunt dolorem ducimus fugiat possimus qui quibusdam, quidem rem sunt ut voluptate! Ab, adipisci aliquam aliquid cum excepturi exercitationem fugit id illum ipsa laboriosam laborum officia sint temporibus tenetur voluptate. Commodi deserunt, eligendi facere fugit hic impedit laboriosam, provident quae quia quis reiciendis sed tempora? Accusantium aspernatur consequatur eaque eveniet harum nisi officia sed sit veniam! Alias beatae blanditiis consequuntur debitis deleniti dolore dolorum error est fuga illo laudantium magni, modi molestiae, non nostrum ullam veritatis. Beatae blanditiis deserunt dicta, expedita iste iusto minima nam, natus porro possimus praesentium quaerat quos temporibus, velit voluptatibus! Amet assumenda doloribus fugiat ipsam maxime minima nemo nisi quae quos vitae. Animi aperiam asperiores aspernatur consequatur consequuntur deserunt, dolor dolores expedita, illo maiores necessitatibus nemo nobis nulla odit omnis quasi quia quo quos repellendus rerum soluta ullam vitae? Deleniti dolore id illo illum quis quo quod ullam! Adipisci atque beatae natus porro provident. Aliquid, eos illo impedit mollitia, placeat quae quam quas, quod soluta totam vitae voluptatibus. Ab beatae dolore ducimus, eius eum libero nobis nulla sed similique velit. Adipisci culpa, ex illum magnam officiis saepe unde! Amet beatae cumque cupiditate dicta dolorum laborum molestias nesciunt omnis quam voluptates. Accusamus adipisci aliquid assumenda ducimus eius eos esse id illo in inventore ipsum iste, maxime molestiae molestias odit officia pariatur quia rem, saepe sequi sit, totam voluptate. Earum inventore minus natus rem saepe sapiente sit sunt! Alias assumenda atque beatae commodi corporis doloremque, ea ex excepturi impedit ipsa labore, maiores mollitia nesciunt nihil quae qui, quia sint soluta ut voluptate?</p>
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
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
