<template>
  <ul class="hiding">
    <li v-for="collection in collectionList" :key="collection.id">
      <a href="#"> {{ collectionAliasGenerator(collection.name) }}</a>
    </li>
  </ul>
</template>

<script>
// import { computed } from "@vue/reactivity";
export default {
  props: {
    collectionList: Array,
  },
  setup() {
    const collectionAliasGenerator = (name) => {
      return name.replaceAll("-", " ");
    };
    return { collectionAliasGenerator };
  },
};
</script>

<style lang="scss" scoped>
ul {
  position: absolute;
  z-index: 90;
  top: 100%;
  left: 0;
  background-color: $color2;
  border-bottom: 1px double gray;
  padding-top: 1rem;
  padding-bottom: 0.3rem;
  transition: opacity 0.25s ease-in;
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(6, auto);
  li {
    width: max-content;
    display: block;
    & + li {
      //   border-top: 1px solid black;
    }
    a {
      padding: 1rem 2.5rem 1rem 2rem;
      color: black;
      font-size: 1rem;
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      &:hover{
        text-decoration: none;
      }
      
    }
  }
}
.hiding {
  display: none;
}
</style>