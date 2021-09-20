export const optionSlider = (sliderOption,optionArray, sliderLeftPosition, slideIncrement) => {
    const index = optionArray.indexOf(sliderOption);
    sliderLeftPosition.value =
        -parseInt(index) * parseFloat(slideIncrement) + "px";

}
export const reAssignActive = (value, optionArray,slideIncrement) => {
    console.log(value, optionArray,slideIncrement);
    const index = parseFloat(value) / parseFloat(slideIncrement);
    optionArray.forEach(element => {
        element.classList.remove("active");

    });
    console.log("hello",index);
    optionArray[-index].classList.add("active");
}

export const wiperSlider = (sliderLeftPosition, slideIncrement) => {
    const currentValue = parseFloat(sliderLeftPosition.value);
    console.log(currentValue);

    sliderLeftPosition.value = currentValue + slideIncrement + "px";

}



