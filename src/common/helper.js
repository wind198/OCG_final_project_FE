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
    if (parseFloat(e.Price) > maxPrice) {
      maxPrice = parseFloat(e.Price);
    }
  });
  return maxPrice;
};

export const getMinPrice = (variances) => {
  let minPrice = 100000;
  variances.forEach((e) => {
    if (parseFloat(e.Price) < minPrice) {
      minPrice = parseFloat(e.Price);
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

export const randomColorCodeGenerator = (max, min) => {
  const colorCode = [];
  for (let i = 0; i < 3; i++) {
    const index = Math.floor(Math.random() * (max - min) + min)
    colorCode.push(index);
  }
  return `rgb(${colorCode.join(", ")})`;
}

export const checkIfExistInObjectArray = (value, key, arr) => {
  for (let index = 0; index < arr.length; index++) {
    if (value == arr[index][key]) {
      return true
    }

  }
  return false

}

export const camelCaseToSpace = (text) => {
  const lowerCaseVer = text.toLowerCase();
  let output = "";
  for (let index = 0; index < text.length; index++) {
    if (text[index] === lowerCaseVer[index]) {
      output += text[index];
    }
    else {
      output += " " + lowerCaseVer[index];
    }

  }
  return output
}

export const convertToISOformat = (timeValue) => {
  const time = new Date(timeValue);
  const offset = time.getTimezoneOffset();
  const isoTime = new Date(time.getTime() - offset * 60 * 1000);
  const desiredTime = isoTime
    .toISOString()
    .split(".")[0]
    .split("T")
    .join(" ");
  console.log(desiredTime);
  return desiredTime;
};

