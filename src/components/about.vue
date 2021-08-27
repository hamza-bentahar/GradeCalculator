<template>
  <article class="tile is-vertical box">
    <p class="title">About</p>
    <p>
      AUI utilities is a personal project I wanted to share with Al Akhawayn University students,
      to help the community a better feedback on their academic performance. <br>
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
      The data is saved on your browser, meaning that you won't have to fill information every time
      you reload the page. <br>
      The data is saved locally, it is not sent through the internet, which gives the benefit of keeping
      it entirely anonymous, but you will have to fill information again if you want to change the device
      or the browser. <br> <br>
    </p>
    <p>
      If you have any suggestion or feedback, you can contact me by email: h.bentahar@aui.ma <br><br>
    </p>
  </article>
</template>

<script>
export default {
  name: "about"
}
</script>

<style scoped>

</style>
