<template>
  <main>
    <heading-comp :text="collectionName" />
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
// import { useRouter } from "vue-router";
import { computed, onMounted, watch } from "vue";
import {
  FETCH_SINGLE_COLLECTION,
  FETCH_SINGLE_CATEGORY,
} from "../store/actions.type";
import { CLEAR_PRODUCTS } from "../store/mutations.type";
export default {
  components: {
    HeadingComp,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const fetchCollection = (id) =>
      store.dispatch(`collectionModule/${FETCH_SINGLE_COLLECTION}`, { id });

    const fetchSingleCategory = (id) => {
      store.dispatch(`collectionModule/${FETCH_SINGLE_CATEGORY}`, { id: id });
    };

    const fetchAllCategories = (allCategoryArray) => {
      allCategoryArray.forEach((category) => {
        fetchSingleCategory(category.ID);
      });
    };
    const watchCollectionAndCategories = (newRoute, oldRoute) => {
      if (newRoute.params.collectionID !== oldRoute.params.collectionID) {
        fetchCollection(newRoute.params.collectionID).then(() => {
          if (typeof newRoute.params.categoryID === "undefined") {
            const allCategory = store.state.collectionModule.Categories;
            fetchAllCategories(allCategory);
          } else {
            store.commit(`collectionModule/${CLEAR_PRODUCTS}`);
            fetchSingleCategory(newRoute.params.categoryID);
          }
        });
      } else {
        if (typeof newRoute.params.categoryID === "undefined") {
          const allCategory = store.state.collectionModule.Categories;
          fetchAllCategories(allCategory);
        } else {
          store.commit(`collectionModule/${CLEAR_PRODUCTS}`);
          fetchSingleCategory(newRoute.params.categoryID);
        }
      }
    };

    watch(
      route,
      (newRoute, oldRoute) => {
        watchCollectionAndCategories(newRoute, oldRoute);
      },
      { immediate: false, deep: true }
    );
    onMounted(() => {
      fetchCollection(route.params.collectionID).then(() => {
        console.log(route);
        if (typeof route.params.categoryID === "undefined") {
          const allCategory = store.state.collectionModule.Categories;
          fetchAllCategories(allCategory);
        } else {
          store.commit(`collectionModule/${CLEAR_PRODUCTS}`);
          fetchSingleCategory(route.params.categoryID);
        }
      });
    });
    const collectionName = computed(
      () => store.state.collectionModule.collection_name
    );
    return { collectionName };
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