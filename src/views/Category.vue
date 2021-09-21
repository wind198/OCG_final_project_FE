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
        <product-comp/>
        <product-comp/>
        <product-comp/>
        <product-comp/>
        <product-comp/>
        <product-comp/>
        <product-comp/>
        <product-comp/>
        <product-comp/>
    </div>
    <page-button-comp :amount="4"  />
  </section>
</template>

<script>
import ProductComp from "../components/ProductComp.vue";
import PageButtonComp from "../components/PageButtonComp.vue";
export default {
    components:{
        ProductComp,PageButtonComp
    }
};
</script>

<style lang="scss">
.menu{
  span{
    font-size: 1.1rem;
    font-weight: 500;
    display: block;
    margin:0 auto 10px;
    width: fit-content;
  }
    select{
        display: block;
        margin: auto;
            font-size: 1rem;
            text-transform: capitalize;
            width: 33%;
            min-width: 200px;
            padding: 0.5rem 0.4rem;
            text-align: left;
            &:focus-visible{
              outline: none;
            }
    }
}
.product-container{
  margin: 0 4%;
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 22.5% 22.5% 22.5% 22.5%;
  row-gap: 3%;
  justify-content: space-between;
  margin-bottom: 110px;
}
</style>