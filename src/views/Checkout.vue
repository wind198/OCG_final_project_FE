<template>
  <main class="checkout">
    <div class="background"></div>
    <div class="container">
      <h1 class="formal-text">check out form</h1>
      <div class="form">
        <div class="create-order">
          <div class="inputs">
            <div class="input-container">
              <label class="formal-text" for="name">full name</label>
              <input
                class="formal-text"
                v-model="customer_name"
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div class="input-container">
              <label class="formal-text" for="email">Email</label>
              <input
                class="formal-text"
                v-model="email"
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div class="input-container">
              <label class="formal-text" for="phone">phone</label>
              <input
                class="formal-text"
                v-model="phone"
                type="tel"
                name="phone"
                id="phone"
              />
            </div>
            <div class="input-container">
              <label class="formal-text" for="address">address</label>
              <input
                class="formal-text"
                v-model="address"
                type="text"
                name="address"
                id="address"
              />
            </div>
          </div>
          <div
            class="order-message"
            v-show="showOrderMessage"
            :class="sendOrderSucess ? 'success' : 'fail'"
          >
            <p v-for="p in sendOrderResultMessage" :key="p.index">
              {{ p }}
            </p>
          </div>

          <a class="normal-button confirm-order" @click="sendOrder"
            >Confirm order</a
          >
        </div>
        <div class="payment">
          <div class="input-container">
            <label class="formal-text" for="card">Card info</label>
            <div id="card-element"></div>
          </div>
          <a class="normal-button payment" id="payment">Pay</a>
          <div
            class="payment-message"
            v-show="showPaymentMessage"
            :class="paymentSucess ? 'success' : 'fail'"
          >
            <p v-for="p in paymentResultMessage" :key="p.index">
              {{ p }}
            </p>
          </div>
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
        <div class="sub-total">
          <span class="formal-text">Subtotal: </span>
          <span>${{ total }} </span>
        </div>

        <router-link class="normal-button go-to-home" :to="{ path: `/` }"
          >Go to Homepage</router-link
        >
        <router-link class="normal-button go-to-cart" :to="{ path: `/cart` }"
          >Go to cart</router-link
        >
      </div>
    </div>
  </main>
</template>

<script>
import { useStore } from "vuex";
import { computed, onMounted, ref, watch } from "vue";
import BillItemComp from "../components/BillItemComp.vue";
import { SEND_ORDER, SET_ORDER_FULFILLED } from "../store/actions.type";
import { useRoute, useRouter } from "vue-router";
import {
  CLEAR_SEND_ORDER_RESULT,
  SET_ERRORS,
  SET_FAILED_ORDER,
  SET_PAYMENT_FAILED,
} from "../store/mutations.type";
import { STRIPE_PUBLISHABLE_KEY } from "../common/config";
import { loadStripe } from "@stripe/stripe-js";
import ApiServices from "../common/api.services";
export default {
  components: { BillItemComp },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const customer_name = ref("Le Hoang Tuan");
    const email = ref("tuanbk1908@gmail.com");
    const phone = ref("0968576908");
    const address = ref("150a4 Nguyen Canh Di, Hanoi");
    const showOrderMessage = ref(false);
    const showPaymentMessage = ref(false);

    const store = useStore();
    const cartItems = computed(() => {
      return store.state.cartModule.cartItems;
    });
    const sendOrderResultMessage = computed(() => {
      return store.state.cartModule.sendOrderResultMessage;
    });
    const paymentResultMessage = computed(() => {
      return store.state.cartModule.paymentResultMessage;
    });
    const sendOrderSucess = computed(
      () => store.state.cartModule.sendOrderSucess
    );
    const paymentSucess = computed(() => store.state.cartModule.paymentSucess);
    const orderID = computed(() => store.state.cartModule.orderID);
    const total = computed(() => store.state.cartModule.total);

    watch(
      sendOrderSucess,
      () => {
        showOrderMessage.value = true;
      },
      { deep: true }
    );
    watch(
      paymentSucess,
      (value) => {
        showPaymentMessage.value = true;
        if (value) {
          customer_name.value = "";
          email.value = "";
          phone.value = "";
          address.value = "";
        }
      },
      { deep: true }
    );
    watch(
      route,
      () => {
        store.commit(`cartModule/${CLEAR_SEND_ORDER_RESULT}`);
        showOrderMessage.value = false;
        showPaymentMessage.value = false;
      },
      { deep: true }
    );
    const sendOrder = () => {
      const order = {
        email: email.value,
        phone: phone.value,
        customer_name: customer_name.value,
        address: address.value,
        OrderDetails: [],
      };
      cartItems.value.forEach((i) => {
        console.log(i);
        order.OrderDetails.push({
          product_variance_id: parseInt(i.variance_id),
          quantity: parseInt(i.quantity),
        });
      });
      const errorIfExist = [];
      for (const key in order) {
        if (order[key] === "") {
          errorIfExist.push(`${key} field is required.`);
        }
      }
      let totalItemQuantity = 0;
      order.OrderDetails.forEach((i) => {
        totalItemQuantity += i.quantity;
      });
      if (totalItemQuantity == 0) {
        errorIfExist.push(`Your cart is empty.`);
      }
      if (errorIfExist.length > 0) {
        store.commit(`cartModule/${SET_ERRORS}`, { data: errorIfExist });
        store.commit(`cartModule/${SET_FAILED_ORDER}`);
        return;
      }
      store.dispatch(`cartModule/${SEND_ORDER}`, order);
    };

    onMounted(async () => {
      const stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY);
      const elements = stripe.elements();
      const card = elements.create("card");
      card.mount("#card-element");
      const handleSubmitPayment = async () => {
        console.log("sending payment", orderID.value);
        if (orderID.value === "") {
          store.commit(`cartModule/${SET_ERRORS}`, {
            data: ["Please confirm an order before proceed"],
          });
          store.commit(`cartModule/${SET_PAYMENT_FAILED}`);
        }
        const { err, PaymentIntentSecretKey: paymentIntentSecretKey } =
          await ApiServices.post("/payment", {
            orderID: orderID.value,
          }).then((r) => {
            console.log(r.data);
            return r.data;
          });

        if (err) {
          console.log(err);
          store.commit(`cartModule/${SET_ERRORS}`, err.response);
          store.commit(`cartModule/${SET_PAYMENT_FAILED}`);
          return;
        }
        console.log(`Client secret returned.`, paymentIntentSecretKey);
        // Confirm the card payment given the clientSecret
        // from the payment intent that was just created on
        // the server.
        const { error: stripeError, paymentIntent } =
          await stripe.confirmCardPayment(paymentIntentSecretKey, {
            payment_method: {
              card: card,
              billing_details: {
                name: customer_name.value,
              },
            },
          });
        if (stripeError) {
          console.log(stripeError);
          store.commit(`cartModule/${SET_ERRORS}`, {
            data: [stripeError.code, stripeError.message],
          });
          store.commit(`cartModule/${SET_PAYMENT_FAILED}`);
          return;
        }
        console.log("paymentIntent", paymentIntent);
        await store.dispatch(
          `cartModule/${SET_ORDER_FULFILLED}`,
          orderID.value
        );

        setTimeout(() => router.push("/payment-success"), 800);
      };

      document
        .getElementById("payment")
        .addEventListener("click", handleSubmitPayment);
    });
    return {
      cartItems,
      total,
      customer_name,
      email,
      phone,
      address,
      orderID,
      sendOrder,

      sendOrderResultMessage,
      paymentResultMessage,
      sendOrderSucess,
      paymentSucess,
      showOrderMessage,
      showPaymentMessage,
    };
  },
};
</script>

<style lang="scss" scoped>
.checkout {
  overflow: hidden;
  width: 50%;

  .container {
    background-color: white;
    border: 1px solid rgba(212, 211, 211, 1);
    padding: 1rem;
    width: 70%;
    z-index: 1300;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .order-message,
    .payment-message {
      display: block;
      margin-bottom: 10px;
      font-size: 0.9rem;
      p {
        color: inherit;
        font-size: inherit;
      }
    }

    h1 {
      text-transform: uppercase;
      font-size: 1.5rem;
      width: max-content;
      margin: 0 auto 30px;
      border-bottom: 1px solid $color1;
    }
    a.normal-button {
      background-color: rgb(248, 246, 246);
      border: 1px solid rgba(184, 182, 182, 0.5);
      border-radius: 10px;
      display: block;
      margin-bottom: 5px;
      outline: none;
      font-size: 0.8rem;
      padding: 0.4rem;
    }
    .form {
      display: grid;
      grid-template-columns: 45% 45%;
      justify-content: space-between;
      margin-bottom: 30px;
      .create-order {
        .inputs {
          margin-bottom: 20px;
        }
      }

      a.confirm-order,
      a.payment {
        background-color: rgb(128, 159, 247);
        color: white;
        &:hover {
          text-decoration: none;
          color: white;
        }
      }
      .input-container {
        margin-bottom: 10px;
        label {
          text-transform: capitalize;
          position: relative;
          border-bottom: 1px solid rgba(212, 211, 211, 1);
          font-size: 0.8rem;
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
      .payment {
        .input-container {
          margin-bottom: 10px;
          label {
            display: block;
            width: 100%;
            text-align: center;
            padding-bottom: 0.5rem;
            margin-bottom: 20px;
            text-transform: uppercase;
            font-weight: bold;
            &::after {
              content: none;
            }
          }
        }
      }
    }
    .bill-summary {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      .headings {
        display: grid;
        grid-template-columns: 40% auto auto 25%;
        padding-bottom: 0.8rem;
        border-bottom: 1px solid rgba(212, 211, 211, 1);
        span {
          text-transform: capitalize;
        }
        span:first-child {
          padding-right: 1rem;
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

      margin: auto 0 0;
      a.go-to-home,
      a.go-to-cart {
        &:hover {
          text-decoration: none;
          color: $color1;
        }
      }
    }
  }
}
</style>