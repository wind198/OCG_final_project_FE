<template>
  <HeaderComp />
  <router-view />
  <FooterComp />
</template>

<script>
import HeaderComp from "./components/HeaderComp";
import FooterComp from "./components/FooterComp";

export default {
  components: {
    HeaderComp,
    
    FooterComp,
  },
};
</script>

<style lang="scss">
html{
    font-size: 16px;
    font-family: "Open Sans", sans-serif;
}
body{
    padding: 0;
    background-color: $color2;
    color: $color1;
}
*{
    box-sizing: border-box;
}
ul{
    list-style-type: none;
    padding-left: 0;
}
  a{
        text-decoration: none;
        color: $color1;
    }
 

</style>

 