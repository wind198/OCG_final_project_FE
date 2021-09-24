<template>
  <div>
    <div class="background"></div>
    <div class="thank-you formal-text">
      <h1 class="formal-text">thank you.</h1>
      <p>Your payment is completed. Thank you for shopping with us.</p>
      <div class="buttons">
        <router-link :to="{ path: `/` }" class="small-button"
          >Go to Home page</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.thank-you {
  position: fixed;
  z-index: 1300;
  width: 100%;
  height: 70%;
  top: 50%;
  transform: translateY(-50%);
  background-color: $color2;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    font-size: 2.5rem;
    font-weight: 300;
    text-align: center;
    margin: 0 auto 60px auto;
    width: max-content;
    text-transform: uppercase;
    // font-family: inherit;
  }
  p {
    text-align: center;
    display: block;
    font-size: 1.5rem;
  }
  .buttons {
    a {
      background-color: $paletteColor4;
      color: $color2;
      border:1px outset rgba(51, 50, 50, 0.25) ;
      display: block;
      height: 40px;
      width: 200px;
      margin: auto;
      text-align: center;
      line-height: 40px;
      &:hover{
          text-decoration: none;
      }
    }
  }
}
</style>