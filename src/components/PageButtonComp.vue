<template>
  <div class="page-button-container">
    <button v-for="page in numberOfPage" :key="page.id" class="page-button">
      {{ page.value }}
    </button>
  </div>
</template>

<script>
import { computed, toRefs } from "vue";
export default {
  props: {
    amount: Number,
  },
  setup(props) {
    const { amount } = toRefs(props);
    const numberOfPage = computed(() => {
      const arr = [];
      for (let i = 1; i <= amount.value; i++) {
        arr.push({ id: i, value: i });
      }
      return arr;
    });
    return { numberOfPage };
  },
};
</script>

<style lang="scss" scoped>
.page-button-container {
  display: block;
  width: fit-content;
  margin: auto;
  button.page-button {
    font-size: 0.8rem;
    --button-size: 40px;
    width: var(--button-size);
    height: var(--button-size);
    border-radius: calc(var(--button-size) * 0.1);
    box-shadow: inset 0px 1px 0px 0px #a6827e;
    background: linear-gradient(
      to bottom,
      rgb(119, 118, 118) 5%,
      rgb(58, 57, 57) 100%
    );
    background-color: rgb(58, 57, 57);
    border: 1px solid;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    font-family: Arial;
    text-decoration: none;
    text-shadow: 0px 1px 0px rgba(238, 236, 236, 0.5);
    &:hover {
      background: linear-gradient(
        to bottom,
        rgb(58, 57, 57) 5%,
        rgb(119, 118, 118) 100%
      );
      background-color: rgb(58, 57, 57);
    }
    &:active {
      position: relative;
      top: 1px;
    }
    &:focus {
      outline: none;
    }
    + button {
      margin-left: 0.2rem;
    }
  }
}
</style>