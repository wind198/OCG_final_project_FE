<template>
  <div class="selector" id="selector">
    <div
      class="option"
      :class="size"
      v-for="i in amountArray"
      :key="i.index"
    ></div>
  </div>
</template>

<script>
import { computed, toRefs } from "@vue/reactivity";
export default {
  props: {
    size: String,
    amount: Number,
  },
  setup(props) {
    const { amount } = toRefs(props);
    const amountArray = computed(() => {
      const arr = [];
      for (let i = 0; i < amount.value; i++) {
        arr.push(i);
      }
      return arr;
    });
    return { amountArray };
  },
};
</script>

<style lang="scss" scoped>
.selector {
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  pointer-events: none;
  .option {
    background-color: $color4;
    cursor: pointer;
    pointer-events: fill;
  }
  .option.size-1 {
    --circle-side: 10px;
    display: block;
    width: var(--circle-side);
    height: var(--circle-side);
    border-radius: calc(var(--circle-side) / 2);
    margin: 0 calc(var(--circle-side) / 3);
  }
  .option.size-2 {
    --circle-side: 15px;
    display: block;
    width: var(--circle-side);
    height: var(--circle-side);
    border-radius: calc(var(--circle-side) / 2);
    margin: 0 calc(var(--circle-side) / 2);
  }
  .option.size-3 {
    --circle-side: 20px;
    display: block;
    width: var(--circle-side);
    height: var(--circle-side);
    border-radius: calc(var(--circle-side) / 2);
    margin: 0 calc(var(--circle-side) / 2);
  }
  .option.active {
    background-color: $color5;
  }
}
</style>