<template>
  <section>
    <div class="menu">
      <span>Refine by category</span>
      <select name="category" id="category" @change="onChangeCategory">
        <option value="" :selected="currentCategory == ''">All</option>
        <option
          v-for="option in optionList"
          :key="option.ID"
          :value="option.ID"
          :selected="currentCategory == option.ID"
        >
          {{ option.CategoryName.split("-").slice(1).join(" ") }}
        </option>
      </select>
    </div>

    <div class="product-container">
      <product-comp
        v-for="product in productsToShow"
        :key="product.ID"
        :id="parseInt(product.ID)"
        :name="product.Name"
        :description="product.Description"
        :variances="product.ProductVariances"
        :image="product.Images[0].Image"
      />
    </div>
    <page-button-comp :amount="numpberOfPage" />
  </section>
</template>

<script>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import ProductComp from "../components/ProductComp.vue";
import PageButtonComp from "../components/PageButtonComp.vue";
import { computed, watch, ref } from "vue";
export default {
  components: {
    ProductComp,
    PageButtonComp,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const productsToShow = computed(
      () => store.state.collectionModule.productsToShow
    );
    const optionList = computed(() => store.state.collectionModule.Categories);
    const currentCategory = ref("");
    const init = () => {
      const categoryID = route.params.categoryID;
      if (typeof categoryID !== "undefined") {
        currentCategory.value = categoryID;
      }
    };
    const numpberOfPage=computed(()=>
    store.getters[`collectionModule/numberOfPage`]
    )
    const onChangeCategory = (e) => {
      const collectionID = route.params.collectionID;
      const categoryID = e.target.value;
      if (categoryID !== "") {
        router.push({ path: `/collection/${collectionID}/${categoryID}` });
      }else{
        router.push({ path: `/collection/${collectionID}` });

      }
    };

    watch(
      () => route.params.categoryID,
      (value) => {
        if (typeof value === "undefined") {
          currentCategory.value = "";
        } else {
          currentCategory.value = value;
        }
      }
    );
    init();
    return {
      productsToShow,
      optionList,
      currentCategory,
      onChangeCategory,numpberOfPage,
      //debug
    };
  },
};
</script>

<style lang="scss">
.menu {
  margin-bottom: 20px;
  span {
    font-size: 1.1rem;
    font-weight: 500;
    display: block;
    margin: 0 auto 10px;
    width: fit-content;
  }
  select {
    display: block;
    margin: auto;
    font-size: 1rem;
    text-transform: capitalize;
    width: 33%;
    min-width: 200px;
    padding: 0.5rem 0.4rem;
    text-align: left;
    &:focus-visible {
      outline: none;
    }
  }
}

.product-container {
  margin: 0 3%;
  height: max-content;
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 23% 23% 23% 23%;
  row-gap: 20px;
  justify-content: space-between;
  margin-bottom: 110px;
}
</style>