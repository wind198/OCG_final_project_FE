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
                v-for="color in colorList"
                :key="color.index"
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
                v-for="size in sizeList"
                :key="size.index"
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
        <div class="add-to-cart">
          <div class="quantity-selection-container">
            <quantity-selector-comp />
          </div>
          <div class="button-container">
            <a class="add-to-cart big-button" @click="addToCart">
              Add to cart
              <span class="pick-variance" v-if="needToChooseVariance"
                >Please pick a product variance</span
              >
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
import { ADD_ITEM, TOGGLE_ANIMATION } from "../store/mutations.type";
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
      const variances = store.state.productModule.ProductVariances;
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
      () => store.state.productModule.ProductVariances
    );

    const category = computed(() => {
      const rawName = store.state.productModule.categoryName;
      return rawName.split("-").slice(1).join(" ");
    });
    const showVarianceTable = computed(() => variances.value.length > 1);

    const colorList = computed(() => {
      return getList("color");
    });
    const sizeList = computed(() => {
      return getList("size");
    });
    const matchByColor = computed(() => {
      const output = {};
      for (let i = 0; i < variances.value.length; i++) {
        const color = variances.value[i].color;
        const size = variances.value[i].size;
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
        const color = variances.value[i].color;
        const size = variances.value[i].size;
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
      if (typeof pickedVariance.value.price == "undefined") {
        return priceRange.value.join(" - ");
      } else return pickedVariance.value.price;
    });
    const colorPicked = ref("");
    const sizePicked = ref("");
    const pickedVariance = ref({});
    const needToChooseVariance = ref(null);
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
      const sendingItem = {
        variance_id: pickedVariance.value.ID,
        name: name.value,
        image: image.value,
        price: pickedVariance.value.price,
        quantity: quantity.value,
      };
      for (const key in sendingItem) {
        if (typeof sendingItem[key] == "undefined") {
          return;
        }
      }
      showAnimationAddToCart();
      store.commit(`cartModule/${ADD_ITEM}`, sendingItem);
    };

    watch([colorPicked, sizePicked], (newValue) => {
      pickedVariance.value = {};
      for (let i = 0; i < variances.value.length; i++) {
        if (variances.value[i].color !== "" && variances.value[i].size !== "") {
          if (
            variances.value[i].color == newValue[0] &&
            variances.value[i].size == newValue[1]
          ) {
            pickedVariance.value = variances.value[i];
            break;
          }
        }
      }
    });
    watch(pickedVariance, (newPicked) => {
      if (checkIfEmptyObject(newPicked)) {
        needToChooseVariance.value = true;
      } else {
        needToChooseVariance.value = false;
      }
    });

    onMounted(() => {
      fetchProductInfo().then(() => {
        allowedColor.value = getList("color");
        allowedSize.value = getList("size");
        const variances = store.state.productModule.ProductVariances;
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
          needToChooseVariance.value = false;
        } else {
          needToChooseVariance.value = true;
        }
      });
    });
    return {
      colorPicked,
      sizePicked,
      pickedVariance,
      needToChooseVariance,
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
      &::after {
        content: "";
        display: block;
        width: 90px;
        border: 1px solid $color1;
        position: absolute;
        top: 50%;
        left: 110%;
      }
      &::before {
        content: "";
        display: block;
        width: 90px;
        border: 1px solid $color1;
        position: absolute;
        top: 50%;
        right: 110%;
      }
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
      margin-bottom: 30px;
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