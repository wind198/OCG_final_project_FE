<template>
  <main>
    <heading-comp :text="collectionName" />
    <div class="sorry" v-show="empty">
      Sorry, we currently do not have products in this category...
    </div>
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
import { computed, onMounted, watch, ref } from "vue";
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
    const empty = ref(null);
    const allCategory = computed(() => store.state.collectionModule.Categories);

    const checkEmpty = (categories) => {
      console.log("checking");
      empty.value = false;
      let countProduct = 0;
      categories.forEach((c) => {
        countProduct += c.Products.length;
      });
      if (countProduct == 0) {
        empty.value = true;
      }
    };

    const fetchCollection = (id) =>
      store.dispatch(`collectionModule/${FETCH_SINGLE_COLLECTION}`, { id });

    const fetchSingleCategory = (id) => {
      return store.dispatch(`collectionModule/${FETCH_SINGLE_CATEGORY}`, {
        id: id,
      });
    };

    const fetchAllCategories = (allCategoryArray) => {
      const fetchWorkArray = allCategoryArray.map((c) => {
        fetchSingleCategory(c.ID);
      });
      return Promise.all(fetchWorkArray);
    };
    const watchCollectionAndCategories = (newParams, oldParams) => {
      if (
        parseInt(newParams.collectionID) !=
        parseInt(oldParams.collectionID)
      ) {
        console.log("collectionID are different");
        fetchCollection(newParams.collectionID).then(() => {
          if (typeof newParams.categoryID === "undefined") {
            fetchAllCategories(allCategory.value).then(() => {
              checkEmpty(allCategory.value);
            });
          } else {
            store.commit(`collectionModule/${CLEAR_PRODUCTS}`);
            fetchSingleCategory(newParams.categoryID).then(() => {
              checkEmpty(allCategory.value);
            });
          }
        });
      } else {
        if (typeof newParams.categoryID === "undefined") {
          fetchAllCategories(allCategory.value).then(() => {
            checkEmpty(allCategory.value);
          });
        } else {
          store.commit(`collectionModule/${CLEAR_PRODUCTS}`);
          fetchSingleCategory(newParams.categoryID).then(() => {
            checkEmpty(allCategory.value);
          });
        }
      }
    };

    watch(
      ()=>route.params,
      (newParams, oldParams) => {
        console.log(newParams , oldParams );
        watchCollectionAndCategories(newParams, oldParams);
      },
      
    );
    onMounted(() => {
      console.log("onmounted");
      fetchCollection(route.params.collectionID).then(() => {
        if (typeof route.params.categoryID === "undefined") {
          fetchAllCategories(allCategory.value).then(() => {
            checkEmpty(allCategory.value);
          });
        } else {
          store.commit(`collectionModule/${CLEAR_PRODUCTS}`);
          fetchSingleCategory(route.params.categoryID).then(() => {
            checkEmpty(allCategory.value);
          });
        }
      });
    });
    const collectionName = computed(
      () => store.state.collectionModule.collection_name
    );
    return { collectionName, empty };
  },
};
</script>

<style lang= "scss" scoped>
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
.sorry {
  display: inline-block;
  margin: 0 4% 20px;
  height: fit-content;
  font-size: 1rem;
  letter-spacing: 0.1rem;
  font-family: "Playfair Display", serif;
  text-transform: uppercase;
}
</style>