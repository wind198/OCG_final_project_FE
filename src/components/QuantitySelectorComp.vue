<template>
  <div class="quantity-selection">
    <!-- <label>Quantity</label>-->

    <a class="down"><i class="fas fa-plus"></i></a>
    <input min="1" type="text" name="quantity" class="quantity" value="1" />
    <a class="up"><i class="fas fa-minus"></i> </a>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.quantity-selection {
  display: inline-block;
  .down,
  .up {
    border: 1px solid #f0f0f0;
    padding: 0px 4px;
    color: #333333;
    background: #fff;
    display: inline-block;
    vertical-align: top;
    height: 44px;
    line-height: 44px;
    border-radius: 5px;
    cursor: pointer;
  }

  input {
    text-align: center;
    margin: 0 3px;
    width: 50px;
    display: inline-block;
    padding: 3px 4px;
    height: 44px;
    line-height: 44px;
    font-weight: 300;
    background: #fff;
    vertical-align: top;
    border-radius: 5px;
    font-size: 16px;
    color: #333333;
    border: 1px solid #e5e5e5;
    outline: none;
  }
}
</style>