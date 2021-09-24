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
          {{ option.category_name.split("-").slice(1).join(" ") }}
        </option>
      </select>
    </div>
   
    <div class="product-container">
      <product-comp
        v-for="product in productsToShow"
        :key="product.ID"
        :id="parseInt(product.ID)"
        :name="product.name"
        :description="product.description"
        :variances="product.ProductVariances"
        :image="product.Images[0].image"
      />
    </div>
    <page-button-comp :amount="numberOfPage" />
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
    const categoryID = computed(() => route.params.categoryID);
    const allCategory = computed(() => store.state.collectionModule.Categories);
    const productPerPage=24;
    const numberOfPage=computed(()=>Math.ceil(products.value.length/productPerPage));
    const currentPage=computed(()=>store.state.collectionModule.currentPage);
    const products = ref([]);
    const productsToShow = computed(()=>{
      return products.value.slice((currentPage.value-1)*productPerPage,currentPage.value*productPerPage-1)
    })
    const optionList = ref([]);
    const currentCategory = ref("");
    const onChangeCategory = (e) => {
      console.log("CHANGED", e.target.value);
      const targetID = e.target.value;
      if (route.params.categoryID != targetID) {
        router.push(`/collection/${route.params.collectionID}/${targetID}`);
      }
    };
    watch(route, (route) => {
      if (typeof route.params.categoryID == "undefined") {
        currentCategory.value = "";
      } else {
        currentCategory.value = route.params.categoryID;
      }
    },{immediate:true});
    watch(
      allCategory,
      (allCategory) => {
        const allProduct = [];
        if (allCategory.length > 0) {
          allCategory.forEach((element) => {
            if (element.Products !== null) {
              allProduct.push(...element.Products);
            }
          });
          optionList.value = [...allCategory];
        }
        products.value = allProduct;
      },
      { deep: true }
    );
    return {
      productsToShow,numberOfPage,
      optionList,
      categoryID,
      allCategory,
      currentCategory,
      onChangeCategory,
      //debug
      products,currentPage,
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