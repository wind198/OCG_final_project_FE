<template>
  <main>
    <heading-comp :text="collectionName" />
    <div class="sorry" v-show="empty">
      Sorry, we currently do not have products in this category...
    </div>
    <router-view />
  </main>
</template>

<script>
import HeadingComp from "../components/HeadingComp.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
// import { useRouter } from "vue-router";
import { computed, toRefs, watch } from "vue";
import { SHOW_LOADING, HIDE_LOADING } from "../store/mutations.type";
import {
  FETCH_SINGLE_COLLECTION,
  FETCH_SINGLE_CATEGORY,
  FETCH_ALL_COLLECTION_PRODUCTS,
} from "../store/actions.type";
import {generatePageAlias} from "../common/helper";
// import { CLEAR_PRODUCTS } from "../store/mutations.type";
export default {
  components: {
    HeadingComp,
  },
  setup() {
    const store = useStore();

    const route = useRoute();
    const { params, query } = toRefs(route);
    const empty = computed(() => store.state.collectionModule.empty);
    const collectionName = computed(() => {
      console.log(route.params.collectionID);
      const collections = store.getters[`homeModule/allCollection`];
      const name =collections.filter((c) => c.ID == route.params.collectionID)[0].CollectionName;
      return generatePageAlias(name);
    });
    const fetchCollection = (id) => {
      return store.dispatch(
        `collectionModule/${FETCH_SINGLE_COLLECTION}`,
        parseInt(id)
      );
    };

    const fetchSingleCategory = (id, offset) => {
      return store.dispatch(`collectionModule/${FETCH_SINGLE_CATEGORY}`, {
        id: parseInt(id),
        offset,
      });
    };
    const fetchAllCollectionProducts = (id, offset) => {
      return store.dispatch(
        `collectionModule/${FETCH_ALL_COLLECTION_PRODUCTS}`,
        { id: parseInt(id), offset }
      );
    };

    const watchCollectionAndCategories = (newParams, oldParams) => {
      console.log("collection watch activated");
      const newCollectionID = newParams.collectionID;
      const newCategoryID = newParams.categoryID;
      if (typeof newCollectionID !== "undefined") {
        if (newCollectionID !== oldParams.collectionID) {
          store.commit(`homeModule/${SHOW_LOADING}`);
          fetchCollection(newCollectionID)
            .then(() => {
              if (typeof newCategoryID === `undefined`) {
                console.log(newCollectionID, query.value.offset);
                return fetchAllCollectionProducts(
                  newCollectionID,
                  query.value.offset
                );
              } else {
                console.log(newCategoryID, query.value.offset);
                return fetchSingleCategory(newCategoryID, query.value.offset);
              }
            })
            .then(() =>
              setTimeout(() => {
                store.commit(`homeModule/${HIDE_LOADING}`);
              }, 800)
            );
        } else if (typeof newCategoryID !== "undefined") {
          console.log(query.value.offset);
          fetchSingleCategory(newCategoryID, query.value.offset);
        } else {
          console.log(query.value.offset);
          fetchAllCollectionProducts(newCollectionID, query.value.offset);
        }
      }
    };

    watch(
      [params, query],
      (newVal, oldVal) => {
        console.log("hello hello watching ya");
        console.log(newVal, oldVal);
        watchCollectionAndCategories(newVal[0], oldVal[0]);
      },
      { immediate: false }
    );
    // watch(
    //   () => route.query,
    //   (query) => {
    //     console.log(query);
    //     const {collectionID,categoryID}=route.params;
    //     if (typeof categoryID=='undefined'){
    //       fetchAllCollectionProducts(collectionID, query.offset);
    //     }else{
    //       fetchSingleCategory(categoryID, query.offset);

    //     }
    //   },
    //   { immediate: false }
    // );

    const init = () => {
      console.log("init activated");
      const collectionID = params.value.collectionID;
      const categoryID = params.value.categoryID;
      store.commit(`homeModule/${SHOW_LOADING}`);
      fetchCollection(collectionID)
        .then(() => {
          if (typeof categoryID == "undefined") {
            return fetchAllCollectionProducts(collectionID, query.value.offset);
          } else {
            return fetchSingleCategory(categoryID, query.value.offset);
          }
        })
        .then(() =>
          setTimeout(store.commit(`homeModule/${HIDE_LOADING}`), 3000)
        );
    };
    init();

    // onMounted(() => {
    //   console.log("onmounted");
    //   fetchCollection(route.params.collectionID).then(() => {
    //     if (typeof route.params.categoryID === "undefined") {
    //       fetchAllCategories(allCategory.value).then(() => {
    //         checkEmpty(allCategory.value);
    //       });
    //     } else {
    //       store.commit(`collectionModule/${CLEAR_PRODUCTS}`);
    //       fetchSingleCategory(route.params.categoryID).then(() => {
    //         checkEmpty(allCategory.value);
    //       });
    //     }
    //   });
    // });

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