<template>
  <main>
    <div class="heading">
      <h2>{{ category }}</h2>
    </div>
    <div class="product-detailed-info">
      <div class="left-column">
        <div class="image">
          <img :src="image" alt="" />
        </div>
        <div class="variance-picker" v-if="showVarianceTable">
          <div class="color">
            <span>Color</span>
            <div class="option">
              <variance-check-box-comp
                v-for="(color,index) in colorList"
                :key="index"
                :value="color"
                :class="[
                  color == colorPicked ? 'active' : '',
                  allowedColor.indexOf(color) == -1 ? 'disable' : '',
                ]"
                @click="handleClick"
              />
            </div>
          </div>
          <div class="size">
            <span>Size</span>
            <div class="option">
              <variance-check-box-comp
                v-for="(size,index) in sizeList"
                :key="index"
                :value="size"
                :class="[
                  size == sizePicked ? 'active' : '',
                  allowedSize.indexOf(size) == -1 ? 'disable' : '',
                ]"
                @click="handleClick"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="information">
        <h1>{{ name }}</h1>
        <p class="price">our price ${{ priceToShow }}</p>
        <div class="warning-place-holder">
          <div class="warning" v-show="showWarning">
            <p
              v-for="(i, index) in warning"
              :key="index"
              :class="['warning', addToCartSuccess ? 'success' : 'fail']"
            >
              {{ i }}
            </p>
          </div>
        </div>
        <div class="add-to-cart">
          <div class="quantity-selection-container">
            <quantity-selector-comp />
          </div>
          <div class="button-container">
            <a class="add-to-cart big-button" @click="addToCart">
              Add to cart
            </a>

            <router-link :to="{ path: `/cart` }" class="check-out big-button"
              >checkout now</router-link
            >
          </div>
        </div>
        <div class="add-to-favorite">
          <img
            src="https://cdn.shopify.com/s/files/1/1089/1214/t/190/assets/Wishlist-icon.svg?v=4240177695643401995"
            alt=""
          /><span>Save to wishlist</span>
        </div>
        <div class="description">
          <h3>Description:</h3>
          <p v-for="p in description" :key="p.index">{{ p }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import QuantitySelectorComp from "../components/QuantitySelectorComp.vue";
import { computed, ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { FETCH_SINGLE_PRODUCT } from "../store/actions.type";
import VarianceCheckBoxComp from "../components/VarianceCheckBoxComp.vue";
import { getMinPrice, getMaxPrice, checkIfEmptyObject } from "../common/helper";
import {
  ADD_ITEM,
  SET_ERRORS,
  SET_ADD_TO_CART_FAIL,
  SET_ADD_TO_CART_SUCCESS,
  TOGGLE_ANIMATION,
  SET_QUANTITY,
  CLEAR_WARNING_STATE,
} from "../store/mutations.type";
export default {
  components: {
    QuantitySelectorComp,
    VarianceCheckBoxComp,
  },

  setup() {
    const store = useStore();
    const route = useRoute();
    const fetchProductInfo = () => {
      return store.dispatch(`productModule/${FETCH_SINGLE_PRODUCT}`, {
        id: route.params.productID,
      });
    };

    const getList = (attr) => {
      const variances = store.state.productModule.productVariances;
      const output = [];
      variances.forEach((element) => {
        if (element[attr] !== "" && output.indexOf(element[attr]) < 0) {
          output.push(element[attr]);
        }
      });
      return output;
    };

    const id = computed(() => store.state.productModule.ID);
    const name = computed(() => store.state.productModule.name);
    const image = computed(() => store.state.productModule.image);
    const variances = computed(
      () => store.state.productModule.productVariances
    );

    const category = computed(() => {
      const rawName = store.state.productModule.categoryName;
      return rawName.split("-").slice(1).join(" ");
    });
    const showVarianceTable = computed(() => variances.value.length > 1);
    const showWarning = computed(() => store.state.productModule.showWarning);
    const warning = computed(() => store.state.productModule.warning);
    const addToCartSuccess = computed(
      () => store.state.productModule.addToCartSuccess
    );
    const colorList = computed(() => {
      return getList("Color");
    });
    const sizeList = computed(() => {
      return getList("Size");
    });
    const matchByColor = computed(() => {
      const output = {};
      for (let i = 0; i < variances.value.length; i++) {
        const color = variances.value[i].Color;
        const size = variances.value[i].Size;
        if (size !== "") {
          if (!Object.hasOwnProperty.call(output, color)) {
            output[color] = [size];
          } else {
            output[color].push(size);
          }
        }
      }
      return output;
    });
    const matchBySize = computed(() => {
      const output = {};
      for (let i = 0; i < variances.value.length; i++) {
        const color = variances.value[i].Color;
        const size = variances.value[i].Size;
        if (size !== "") {
          if (!Object.hasOwnProperty.call(output, size)) {
            output[size] = [color];
          } else {
            output[size].push(color);
          }
        }
      }
      return output;
    });

    const description = computed(() => {
      const descriptionText = store.state.productModule.description;
      const paragraphArray = descriptionText
        .split("||")
        .filter((e) => e !== "\t");
      console.log(paragraphArray);
      return paragraphArray;
    });
    const quantity = computed(() => store.state.productModule.quantitySelected);
    const priceToShow = computed(() => {
      if (typeof pickedVariance.value.Price == "undefined") {
        return priceRange.value.join(" - ");
      } else return pickedVariance.value.Price;
    });
    const colorPicked = ref("");
    const sizePicked = ref("");
    const pickedVariance = ref({});
    // const showWarning = ref(false);
    // const warningText = ref("");
    const priceRange = ref([]);
    const allowedColor = ref([]);
    const allowedSize = ref([]);
    const showAnimation = ref(false);
    const handlePickColor = (valueClicked) => {
      if (colorPicked.value != valueClicked) {
        colorPicked.value = valueClicked;
        allowedSize.value = matchByColor.value[colorPicked.value];
      } else {
        colorPicked.value = "";
        allowedSize.value = sizeList.value;
      }
    };
    const handlePickSize = (valueClicked) => {
      if (sizePicked.value != valueClicked) {
        sizePicked.value = valueClicked;
        allowedColor.value = matchBySize.value[sizePicked.value];
      } else {
        sizePicked.value = "";
        allowedColor.value = colorList.value;
      }
    };
    const handleClick = (e) => {
      const value = e.target.getAttribute("value");
      if (allowedColor.value.indexOf(value) != -1) {
        handlePickColor(value);
      } else if (allowedSize.value.indexOf(value) != -1) {
        handlePickSize(value);
      } else {
        return "";
      }
    };
    const showAnimationAddToCart = () => {
      store.commit(`homeModule/${TOGGLE_ANIMATION}`);
      setTimeout(() => {
        store.commit(`homeModule/${TOGGLE_ANIMATION}`);
      }, 800);
    };

    const addToCart = () => {
      if (checkIfEmptyObject(pickedVariance.value)) {
        store.commit(`productModule/${SET_ERRORS}`, {
          data: ["You must choose a specific variance"],
        });
        store.commit(`productModule/${SET_ADD_TO_CART_FAIL}`);
        return;
      }
      const sendingItem = {
        productVarianceID: pickedVariance.value.ID,
        name: name.value,
        image: image.value,
        price: pickedVariance.value.Price,
        quantity: quantity.value,
      };
      for (const key in sendingItem) {
        if (key!=='productVarianceID' & typeof sendingItem[key] == "undefined") {
          store.commit(`productModule/${SET_ERRORS}`, {
            data: ["Unexpected error occured. Please come back later."],
          });
          store.commit(`productModule/${SET_ADD_TO_CART_FAIL}`);
          return;
        }
      }
      
      if (quantity.value < 0) {
        store.commit(`productModule/${SET_ERRORS}`, {
          data: ["Quantity must greater than 0"],
        });
        store.commit(`productModule/${SET_ADD_TO_CART_FAIL}`);
        return;
      }
      if (quantity.value > pickedVariance.value.Inventory) {
        store.commit(`productModule/${SET_ERRORS}`, {
          data: [
            `Sorry. your selected quantity exceeded our inventory (${pickedVariance.value.Inventory})`,
          ],
        });
        store.commit(`productModule/${SET_ADD_TO_CART_FAIL}`);
        return;
      }
      showAnimationAddToCart();
      store.commit(`cartModule/${ADD_ITEM}`, sendingItem);
      store.commit(`productModule/${SET_ADD_TO_CART_SUCCESS}`);
    };

    watch([colorPicked, sizePicked], (newValue) => {
      pickedVariance.value = {};
      for (let i = 0; i < variances.value.length; i++) {
        if (variances.value[i].Color !== "" && variances.value[i].Size !== "") {
          if (
            variances.value[i].Color == newValue[0] &&
            variances.value[i].Size == newValue[1]
          ) {
            pickedVariance.value = variances.value[i];
            break;
          }
        }
      }
    });
    // watch(pickedVariance, (newPicked) => {
    //   if (checkIfEmptyObject(newPicked)) {
    //     showWarning.value = true;
    //   } else {
    //     showWarning.value = false;
    //   }
    // });

    onMounted(() => {
      store.commit(`productModule/${SET_QUANTITY}`,1);
      store.commit(`productModule/${CLEAR_WARNING_STATE}`,1);
      fetchProductInfo().then(() => {
        allowedColor.value = getList("Color");
        allowedSize.value = getList("Size");
        const variances = store.state.productModule.productVariances;
        const minPrice = getMinPrice(variances);
        const maxPrice = getMaxPrice(variances);
        if (maxPrice > minPrice) {
          priceRange.value.push(minPrice);
          priceRange.value.push(maxPrice);
        } else {
          priceRange.value.push(minPrice);
        }
        if (variances.length <= 1) {
          pickedVariance.value = variances[0];
          showWarning.value = false;
        } else {
          showWarning.value = true;
        }
      });
    });
    return {
      colorPicked,
      sizePicked,
      pickedVariance,
      showWarning,
      warning,
      addToCartSuccess,
      showVarianceTable,
      priceToShow,
      showAnimation,
      handlePickColor,
      handleClick,
      handlePickSize,
      addToCart,
      allowedColor,
      allowedSize,
      id,
      name,
      description,
      image,
      variances,
      category,
      colorList,
      sizeList,
      matchByColor,
      matchBySize,
    };
  },
};
</script>

<style lang="scss" scoped>
main {
  --font-size: 1.5rem;
  margin-bottom: 60px;
  &::after {
    content: "";
    display: block;
    clear: both;
  }
  .heading {
    padding: 1rem 0;
    border-bottom: 1px solid $color1;
    margin-bottom: 30px;
    h2 {
      width: fit-content;
      margin: auto;
      font-size: var(--font-size);
      font-weight: 100;
      font-family: "Playfair Display", serif;
      text-transform: uppercase;
      position: relative;
      text-align: center;
    }
  }
  .left-column {
    float: left;
    width: 45%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .image {
      width: 100%;
      margin-bottom: 20px;
      img {
        display: block;
        margin: auto;
        max-width: 100%;
        max-height: 400px;
      }
    }
    .variance-picker {
      padding: 10px 15px;
      border-radius: 5px;
      border: 1px solid #f0f0f0;
      background-color: white;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: stretch;
      height: 100px;
      > .color,
      .size {
        margin-left: 0;

        span {
          display: inline-block;
          width: 60px;
        }
        .option {
          display: inline-block;
        }
      }
    }
  }
  .information {
    width: 50%;
    float: right;
    padding-right: 3rem;
    h1 {
      font-size: calc(var(--font-size) * 0.9);
      font-weight: 100;
      font-family: "Playfair Display", serif;
      text-transform: uppercase;
      margin: 10px 0 30px 0;
    }
    p.price {
      font-weight: calc(var(--font-size) * 0.8);
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: calc(var(--font-size) * 0.03);
      margin-bottom: 10px;
    }
    div.warning-place-holder {
      height: 60px;
      width: 100%;
      div.warning {
        height: 100%;
        width: 100%;
        p.warning {
          font-size: 0.9rem;
        }
      }
    }
    .add-to-cart {
      margin-bottom: 15px;
      .quantity-selection-container {
        display: inline-block;
        vertical-align: top;
      }
      .button-container {
        display: inline-block;
        width: 45%;
        margin-left: 10%;
        a:hover {
          text-decoration: none;
        }
        a.add-to-cart {
          &:hover span {
            display: inline-block;
          }
        }
      }
    }
  }
  .add-to-favorite {
    margin-bottom: 30px;
    > * {
      display: inline-block;
    }
    img {
      filter: brightness(0.3);
      height: 40px;
      width: auto;
      margin-right: 0.25rem;
      margin-left: calc(10% + 104px);
    }
    span {
      height: 20px;
      line-height: 20px;
      font-size: calc(var(--font-size) * 0.7);
      letter-spacing: 0.03rem;
      vertical-align: bottom;
      text-transform: uppercase;
      color: rgba(75, 75, 75, 0.7);
    }
  }
  .description {
    h3 {
      font-size: 1.2rem;
      font-family: "Playfair Display", serif;
      text-transform: uppercase;
    }
    p {
      margin: 10px 0;
    }
  }
}
</style>