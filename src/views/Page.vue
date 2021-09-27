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
import { useRoute, useRouter } from "vue-router";
import { computed } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
export default {
  components: { CollectionComp, HeadingComp },
  setup() {
    const store = useStore();
    let route = useRoute();
    let router = useRouter();
    let id = computed(() => route.params.pageID);

    const fetchPage = (id) =>
      store.dispatch(`homeModule/${FETCH_SINGLE_PAGE}`, { id: parseInt(id) });

    onMounted(fetchPage(id.value));
    watch(
      () => route.params.pageID,
      (value) => {
        // console.log("value",value);
        if (value) {
          console.log("pageId", value);
          fetchPage(value);
        }
      }
    );

    const collectionList = computed(() => {
      return store.getters[`homeModule/collectionList`];
    });
    const pageName = computed(() => store.getters[`homeModule/mainPageName`]);
    const status = computed(() => store.state.homeModule.status);
    watch(
      () => status.value.statusCode,
      (code) => {
        if (code == 404) {
          router.push({ name: "notFound", params: { pathMatch: "not-found" } });
        }
      },
      { immediate: true }
    );
    return {
      collectionList,
      pageName,

      //debug
      status,
    };
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