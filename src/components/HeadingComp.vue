<template>
  <div class="heading"><h1>{{text}}</h1></div>
</template>

<script>
export default {
props:{
    text: String,
}

};
</script>

<style lang="scss" scoped>
.heading {
  width: 100%;
  background-color: $color1;

  h1 {
    font-family: "Playfair Display", serif;
    text-transform: uppercase;
    text-align: center;
    font-size: 1.5rem;
    margin: 0 auto 60px;
    width: fit-content;
    position: relative;
    color: $color2;
    padding: 1em 0 1.5em;
    &::after {
      border-bottom: 1px solid $color2;
      width: 90%;
      position: absolute;
      top: 65%;
      left: 50%;
      transform: translateX(-50%);
      display: block;
      content: "";
      margin: 10px auto;
    }
  }
}
</style>