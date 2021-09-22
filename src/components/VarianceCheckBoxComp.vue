<template>
  <label :value="value">
    {{ value }}
  </label>
</template>

<script>
export default {
  props: {
    value: String,
    checked: Boolean,
  },
};
</script>

<style lang="scss" scoped>
label {
  --size-height: 35px;
  display: inline-block;
  height: var(--size-height);
  width: calc(var(--size-height) * 1.682);
  min-width: fit-content;
  display: inline-block;
  margin-right: 5px;
  background-color: rgb(255, 254, 254);
  border-radius: calc(var(--size-height) * 0.1);
  border: 1px solid rgba(173, 173, 173, 0.2);
  color: $color1;
  text-align: center;
  font-size: 0.9rem;
  text-transform: capitalize;
  line-height: calc(var(--size-height) * 0.9);
}
label.disable {
  background-color: rgb(110, 109, 109);
}
label.active {
  background-color: #f26f21;
}
</style>