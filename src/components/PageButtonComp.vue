<template>
  <transition name="buttonsfade">
    <div class="page-button-container" v-if="showButtons">
      <button
        v-for="page in numberOfPage"
        :key="page.id"
        :value="page.id"
        class="page-button"
        @click="setPage"
        :class="currentPage == page.id ? 'active' : ''"
      >
        {{ page.value }}
      </button>
    </div></transition
  >
</template>

<script>
import { computed, onMounted, toRefs, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { productPerPage } from "../common/contanst";
import { SET_CURRENT_PAGE } from '../store/mutations.type';
export default {
  props: {
    amount: Number,
  },
  setup(props) {
    const store = useStore();
    const { amount } = toRefs(props);
    const showButtons = ref(false);
    const route = useRoute();
    const router = useRouter();
    watch(route, () => {
      showButtons.value = false;
      setTimeout(() => {
        showButtons.value = true;
      }, 1000);
    });
    const numberOfPage = computed(() => {
      const arr = [];
      for (let i = 1; i <= amount.value; i++) {
        arr.push({ id: i, value: i });
      }
      return arr;
    });
    const currentPage = computed(
      () => store.state.collectionModule.currentPage
    );
    const setPage = (e) => {
      const pageNum = e.target.value;
      console.log(pageNum);
      router.push({
        path: "",
        query: { offset: (pageNum - 1) * productPerPage },
      });
      store.commit(`collectionModule/${SET_CURRENT_PAGE}`,pageNum);
    };
    onMounted(() => {
      setTimeout(() => {
        showButtons.value = true;
      }, 1000);
    });
    return { numberOfPage, setPage, showButtons,currentPage };
  },
};
</script>

<style lang="scss" scoped>
.buttonsfade-enter-active,
.buttonsfade-leave-active {
  transition: opacity 0.25s ease;
}

.buttonsfade-enter-from,
.buttonsfade-leave-to {
  opacity: 0;
}
.page-button-container {
  display: block;
  width: fit-content;
  margin: auto;
  padding: 1rem 1.5rem;
  background-color: #fafafa4d;
  border-radius: 10px;
  position: fixed;

  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  button.page-button {
    font-size: 0.8rem;
    --button-size: 30px;
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
  .page-button.active {
    filter: brightness(1.5);
    transform: scale(1.2);
  }
}
</style>