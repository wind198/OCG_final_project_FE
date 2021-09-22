<template>
  <section>
    <div class="menu">
      <span>Refine by category</span>
      <select name="category" id="category">
        <option value="value1" selected>value1</option>
        <option value="value2">value2</option>
        <option value="value3">value3</option>
        <option value="value4">value4</option>
      </select>
    </div>
    <div class="product-container">
      <product-comp
        v-for="product in products"
        :key="product.ID"
        :id="parseInt(product.ID)"
        :name="product.name"
        :description="product.description"
        :variances="product.ProductVariances"
        :image="product.Images[0].image"
      />
    </div>
    <page-button-comp :amount="4" />
  </section>
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
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
    const categoryID = computed(() => route.params.categoryID);
    const allCategory = computed(() => store.state.collectionModule.Categories);
    const products = ref([]);
    watch(allCategory, (allCategory) => {
      const productToShow = [];
      if (allCategory.length > 0) {
        console.log(allCategory.length);
        allCategory.forEach((element) => {
          if (element.Products !== null) {
            productToShow.push(...element.Products);
          }
        });
      }
      products.value=productToShow;
    },{deep:true});
    return { products, categoryID, allCategory };
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
  margin: 0 4%;
  height: max-content;
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 22.5% 22.5% 22.5% 22.5%;
  row-gap: 20px;
  justify-content: space-between;
  margin-bottom: 110px;
}
</style>