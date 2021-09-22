<template>
  <main>
    <heading-comp :text="pageName" />
    <div class="collections-container">
      <collection-comp
        v-for="collection in collectionList"
        :key="collection.ID"
        :collection="collection"
      />
    </div>
  </main>
</template>

<script>
import CollectionComp from "../components/CollectionComp.vue";
import HeadingComp from "../components/HeadingComp.vue";
import { FETCH_SINGLE_PAGE } from "../store/actions.type";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
export default {
  components: { CollectionComp, HeadingComp },
  setup() {
    const store = useStore();
    let route = useRoute();
    let id = computed(() => route.params.pageID);

    const fetchPage = (id) =>
      store.dispatch(`homeModule/${FETCH_SINGLE_PAGE}`, { id });

    onMounted(fetchPage(id.value));
    watch(id, (value) => {
      fetchPage(value);
    });

    const mainPage = computed(() => {
      const pages = store.state.homeModule.pages;
      const mainPageIndex = store.state.homeModule.mainPageID;
      const mainPage = pages.filter((e) => e.ID == mainPageIndex)[0];
      return mainPage;
    });
    const collectionList = computed(() => {
      return mainPage.value.Collections;
    });
    const pageName = computed(() => mainPage.value.page_name);
    return { collectionList, pageName };
  },
};
</script>

<style lang="scss" scoped>
main {
  padding: 0;
  margin-bottom: 60px;

  .collections-container {
    margin: 0 5% 60px 5%;
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: calc(100% / 3) calc(100% / 3) calc(100% / 3);
  }
}
</style>