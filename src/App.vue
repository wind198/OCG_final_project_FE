<template>
  <HeaderComp :pageList="pageList" />
  <router-view />
  <FooterComp />
</template>

<script>
import HeaderComp from "./components/HeaderComp";
import FooterComp from "./components/FooterComp";
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import { FETCH_ALL_PAGE } from "./store/actions.type";
import { useRoute } from "vue-router";
import { watch } from "@vue/runtime-core";
export default {
  components: {
    HeaderComp,

    FooterComp,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const fetchNavBar = () => store.dispatch(`homeModule/${FETCH_ALL_PAGE}`);
    watch(route, fetchNavBar,{immediate:true});

    fetchNavBar();

    const pageList = computed(() => store.state.homeModule.pages);

   

    return {
      pageList,
     
    };
  },
};
</script>

<style lang="scss">
html {
  font-size: 16px;
  font-family: "Open Sans", sans-serif;
}
body {
  padding: 0;
  background-color: $color2;
  color: $color1;
}
* {
  box-sizing: border-box;
}
ul {
  list-style-type: none;
  padding-left: 0;
}
a {
  text-decoration: none;
  color: $color1;
}
</style>

 