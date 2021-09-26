<template>
  <span class="pick-variance"{{content}}</span>
</template>

<script>
export default {
  props: {
    content: String,
  },
};
</script>

<style lang="scss" scoped>
span {
  position: absolute;
  bottom: 110%;
  left: 50%;
  transform: translateX(-50%);
  width: max-content;
  background-color: $color2;
  color: $color1;
  border: 1px solid #e4e1e1;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: normal;
  letter-spacing: normal;
  text-transform: capitalize;
  padding: 0.5rem 1rem;
  display: none;
}
</style>