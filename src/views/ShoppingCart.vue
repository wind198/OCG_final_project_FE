<template>
  <main>
    <h1>Your shopping cart</h1>
    <div class="cart">
      <h2 class="formal-text">my cart</h2>
      <div class="item-list">
        <div class="headings">
          <span>Product</span>
          <span>Item price</span>
          <span>Qty</span>
          <span>Price</span>
          <span>Remove</span>
          <span>Total price</span>
        </div>
        <div class="cart-items">
          <cart-item-comp
            v-for="item in cartItems"
            :id="item.productVarianceID"
            :key="item.productVarianceID"
            :name="item.name"
            :image="item.image"
            :price="item.price"
            :quantity="item.quantity"
          />
        </div>
        <div class="sumup-checkout">
          <span class="sub-total formal-text">sub total : <span>${{ total }}</span></span>
          <router-link :to="{path:'/checkout'}" class="checkout big-button">checkout now</router-link>
        </div>
      </div>
    </div>
    <router-view/>
  </main>
</template>

<script>
import { computed } from "@vue/reactivity";
import CartItemComp from "../components/CartItemComp.vue";
import { useStore } from "vuex";
export default {
  components: {
    CartItemComp,
  },
  setup() {
    const store = useStore();
    const cartItems = computed(() => {
      return store.state.cartModule.cartItems;
    });
    const total = store.state.cartModule.total;
    return { cartItems, total };
  },
};
</script>

<style lang="scss" scoped>
main {
  margin-bottom: 100px;
  h1 {
    width: 100%;
    text-align: center;
    font-size: 1.22rem;
    letter-spacing: 0.12rem;
    font-weight: 400;
    padding: 0.6rem 0;
    color: $color1;
    text-transform: uppercase;
    border-bottom: 1px solid $color1;
  }
  .cart {
    padding: 0 2vw;
    h2 {
      font-size: 1.5rem;
      text-transform: uppercase;
      margin: 1rem 0 2rem;
    }
    .item-list {
      .headings {
        display: grid;
        grid-template-columns: 50% 10% 10% 10% 10% 10% ;
        border-bottom: 1px solid $color1;
        padding-bottom: 0.2rem;
        span {
          display: block;
          margin: auto;
          font-weight: 400;
          text-align: center;
        }
        span:first-child {
          width: 40%;
          margin-left: 0;
          margin-right: auto;
          text-align: left;
          padding-left: 1rem;
        }
      }
      .cart-items {
        width: 100%;
      }
      .sumup-checkout {
        width: 25%;
        margin-left: auto;
        margin-top: 10px;
        .checkout:hover{
          text-decoration: none;
        }
        .sub-total {
          display: block;
          font-size: 1.2rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.1rem;
          margin-bottom: 6px;
         
        }
      }
    }
  }
}
</style>