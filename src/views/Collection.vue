<template>
  <main>
    <heading-comp :text="'a'" />
    <router-view />
    <div class="pages">
      <page-button-comp :value="1" />
      <page-button-comp :value="2" />
      <page-button-comp :value="3" />
      <page-button-comp :value="4" />
    </div>
  </main>
</template>

<script>
import HeadingComp from "../components/HeadingComp.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import {computed} from "vue";
import {SET_COLLECTION_CATEGORIES} from "../store/mutations.type";
export default {
  components: {
    HeadingComp,
  },
  setup() {
    const store = useStore();
    let route = useRoute();
    let id = computed(() => route.params.collectionID);
    console.log("id",id);
    store.commit(`collection/${SET_COLLECTION_CATEGORIES}`, "HAHAHA");

    return {};
  },
};
</script>

<style lang= "scss">
main {
  margin-bottom: 60px;
}
h1 {
  font-size: 1.5rem;
  font-family: "Playfair Display", serif;
  text-transform: uppercase;
  margin: 20px auto;
  width: fit-content;
  position: relative;
  &::after {
    border-bottom: 1px solid grey;
    width: 90%;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    content: "";
    margin: 10px auto;
  }
}
</style>