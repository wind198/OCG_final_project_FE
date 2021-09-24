export const optionSlider = (sliderOption, optionArray, sliderLeftPosition, slideIncrement) => {
  const index = optionArray.indexOf(sliderOption);
  sliderLeftPosition.value =
    -parseInt(index) * parseFloat(slideIncrement) + "px";

}
export const reAssignActive = (value, optionArray, slideIncrement) => {
  console.log(value, optionArray, slideIncrement);
  const index = parseFloat(value) / parseFloat(slideIncrement);
  optionArray.forEach(element => {
    element.classList.remove("active");

  });
  console.log("hello", index);
  optionArray[-index].classList.add("active");
}

const wiperSlider = (sliderLeftPosition, slideIncrement) => {
  const currentValue = parseFloat(sliderLeftPosition.value);
  sliderLeftPosition.value = currentValue + slideIncrement + "px";
}
export const wipeFunction = (sliderLeftPosition, direction, slideIncrement, maxWipeTimeToLeft, maxWipeTimeToRight) => {
  switch (direction) {
    case "left": {
      if (parseFloat(sliderLeftPosition.value) < slideIncrement * maxWipeTimeToLeft) {
        wiperSlider(sliderLeftPosition, slideIncrement);
      }
      break;
    }
    case "right": {
      if (parseFloat(sliderLeftPosition.value) > -slideIncrement * maxWipeTimeToRight) {
        wiperSlider(sliderLeftPosition, -slideIncrement);
      }
    }
  }
};

export const generatePageAlias = (name) => {
  if (name == "home-decor") {
    return "decor";
  } else if (name == "outdoor-garden") {
    return "outdoor & garden";
  } else return name.replaceAll("-", " ");
};

export const getMaxPrice = (variances) => {
  let maxPrice = 0;
  variances.forEach((e) => {
    if (parseFloat(e.price) > maxPrice) {
      maxPrice = parseFloat(e.price);
    }
  });
  return maxPrice;
};

export const getMinPrice = (variances) => {
  let minPrice = 100000;
  variances.forEach((e) => {
    if (parseFloat(e.price) < minPrice) {
      minPrice = parseFloat(e.price);
    }
  });
  return minPrice;
};

export const checkIfEmptyObject = (obj) => {
  if (Object.keys(obj).length == 0) {
    return true;
  } else { return false }
}

//help svg shape drawing
export const calculateXdistanceBetweenBar = (fieldWidth, padding, numberOfBar) => {
  return (fieldWidth - 2 * padding) / numberOfBar;
} 