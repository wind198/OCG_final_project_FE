<template>
  <div class="checkout">
    <router-view />
    <div class="background"></div>
    <div class="checkout-form">
      <h1 class="formal-text">check out form</h1>
      <div class="inputs">
        <div class="input-container">
          <label class="formal-text" for="name">full name</label>
          <input class="formal-text" type="text" name="name" id="name" />
        </div>
        <div class="input-container">
          <label class="formal-text" for="email">Email</label>
          <input class="formal-text" type="email" name="email" id="email" />
        </div>
        <div class="input-container">
          <label class="formal-text" for="phone">phone</label>
          <input class="formal-text" type="tel" name="phone" id="phone" />
        </div>
        <div class="input-container">
          <label class="formal-text" for="address">address</label>
          <input class="formal-text" type="text" name="address" id="address" />
        </div>
      </div>
      <div class="bill-summary">
        <div class="headings">
          <span class="formal-text">product name</span>
          <span class="formal-text">price</span>
          <span class="formal-text">qty</span>
          <span class="formal-text">total price</span>
        </div>
        <bill-item-comp
          v-for="item in cartItems"
          :key="item.variance_id"
          :id="item.variance_id"
          :name="item.name"
          :price="item.price"
          :quantity="item.quantity"
        />
      </div>
      <div class="sub-total">
        <span class="formal-text">Subtotal: </span>
        <span>${{ total }} </span>
      </div>
      <div class="buttons">
        <router-link class="normal-button payment" :to="{ path: `/payment` }"
          >Go to payment</router-link
        >
        <router-link class="normal-button" :to="{ path: `/` }"
          >Go to Homepage</router-link
        >
        <router-link class="normal-button" :to="{ path: `/cart` }"
          >Go to cart</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import BillItemComp from "../components/BillItemComp.vue";
export default {
  components: { BillItemComp },
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
.checkout {
  overflow: hidden;
  width: 50%;
  .background {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(51, 50, 50, 0.8);
    z-index: 1200;
  }
  .checkout-form {
    position: fixed;
    z-index: 1300;
    background-color: $color2;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    padding: 2rem 1.5rem;
    h1 {
      text-align: center;
      font-size: 2rem;
      font-weight: 100;
      text-transform: uppercase;
      border-bottom: 1px solid $color1;
      width: fit-content;

      margin: 0 auto 30px;
    }
    .inputs {
        margin-bottom: 20px;
      .input-container {
        margin-bottom: 10px;
        label {
          text-transform: capitalize;
          position: relative;
          border-bottom: 1px solid rgba(212, 211, 211, 1);
          &::after {
            content: ":";
            position: absolute;
            display: inline-block;
            right: -10%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
    .bill-summary {
      background-color: white;
      border: 1px solid rgba(212, 211, 211, 1);
      padding: 1rem;
      width: 100%;
      .headings {
        display: grid;
        grid-template-columns: 40% auto auto 25%;
        padding-bottom: 0.8rem;
        border-bottom: 1px solid rgba(212, 211, 211, 1);
        span {
          text-transform: capitalize;
        }
        span:first-child{
            padding-right: 1rem;
        }
      }
    }
    .sub-total {
      margin: 10px 1rem 15px auto;
      display: block;
      width: fit-content;
      border-bottom: 1px solid rgba(212, 211, 211, 1);

      span:first-child {
        text-transform: capitalize;
        letter-spacing: 0.02rem;
        display: inline-block;
        margin-right: 1rem;
      }
    }
    .buttons {
      a {
        background-color: white;
        padding: 0 1rem;
        border: 1px solid rgba(212, 211, 211, 0.5);
        border-radius: 10px;
        display: block !important;
        margin-bottom: 5px;
        outline: none;
        &:hover {
          text-decoration: none;
          color: inherit;
        }
      }
      a.payment {
        background-color: rgb(91, 133, 248);
        color: white;
      }
    }
  }
}
</style>