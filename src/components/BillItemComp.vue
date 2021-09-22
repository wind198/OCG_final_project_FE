<template>
  <div class="bill-item">
    <span class="name normal-text">{{ name }} </span>
    <span class="price normal-text"> ${{ price }} </span>
    <span class="qty normal-text">{{ quantity }} </span>
    <span class="total-price normal-text">${{ total }} </span>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
export default {
  props: {
    id: Number,
    name: String,
    price: Number,
    quantity: Number,
  },
  setup(props) {
    const total = computed(() => {
      return props.price * props.quantity;
    });
   
    return { total };
  },
};
</script>

<style lang="scss" scoped>
.bill-item{
  display: grid;
  grid-template-columns: 40% auto auto 25%;
  padding: 0.6rem 0.5rem 0.2rem;
  border-bottom: 1px solid rgba(212, 211, 211, 1);
  span{
    font-size: 0.9rem;
    text-transform: capitalize;
  }
   span:first-child{
            padding-right: 1rem;
        }
}
</style>