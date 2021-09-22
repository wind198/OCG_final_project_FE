<template>
  <div class="cart-item">
    <div class="name-image">
      <div class="image-container">
        <img :src="image" :alt="name" />
      </div>
      <span class="name">{{ name }}</span>
    </div>
    <span class="price">${{ price }}</span>
    <span class="quantity">{{ quantity }}</span>
    <span class="remove">${{ price }} </span>
    <span class="remove"
      ><i @click="removeItem" class="far fa-trash-alt"></i
    ></span>
    <span class="total-price">${{ total }}</span>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import { REMOVE_ITEM } from "../store/mutations.type";
export default {
  props: {
    id: Number,
    name: String,
    price: Number,
    quantity: Number,
    image: String,
  },
  setup(props) {
    const store = useStore();
    const total = computed(() => {
      return props.price * props.quantity;
    });
    const removeItem = () => {
        console.log("removing",props.id);
      store.commit(`cartModule/${REMOVE_ITEM}`, props.id);
    };
    return { total, removeItem };
  },
};
</script>

<style lang="scss" scoped>
.cart-item {
  --line-height: 10vw;
  width: 100%;
  height: var(--line-height);
  padding: 0.5rem 0rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid $color1;
  > * {
    width: 8%;
    text-align: center;
  }
  .name-image {
    height: 100%;
    width: 40%;
    text-align: left;
    .image-container {
      display: inline-block;
      margin-right: 1vw;
      height: 100%;
      img {
        height: 100%;
        width: auto;
      }
    }
  }
  > span {
    line-height: var(--line-height);
  }
  > span.remove {
    i {
      color: rgb(77, 77, 250);
      cursor: pointer;
      font-size: 120%;
      display: inline-block;
      padding: 0.3rem;
    }
  }
}
</style>