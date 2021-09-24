<template>
  <div class="collection">
    <img
      :src="collection.image"
      alt=""
    />
    <span class="collection-name"
      ><router-link
        :to="{path:`/collection/${collection.ID}`}"
        >{{ generatePageAlias(collection.collection_name) }}</router-link
      ></span
    >
  </div>
</template>

<script>
import { generatePageAlias } from "../common/helper";
export default {
  props: {
    collection: Object,
  },
  setup() {
    return { generatePageAlias };
  },
};
</script>

<style lang = "scss" scoped>
.collection {
  width: 100%;
  padding: 4% 2%;
  max-height: 40vh;
  position: relative;
  img {
    max-width: 100%;
    max-height: 100%;display: block;margin: auto;
  }
  span {
    position: absolute;
    display: block;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 96%;
    background-color: rgba(0, 0, 0, 0.6);
    a {
      color: white;
      font-size: 0.9rem;
      letter-spacing: 0.05rem;
      text-align: center;
      display: block;
      text-transform: uppercase;
      padding: 1rem;
      &:hover{
        text-decoration: none;
      }
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
  }
}
</style>