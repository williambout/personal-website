import anime from "animejs/lib/anime.es.js";

document.addEventListener("DOMContentLoaded", () => {
  const photoList = document.querySelector(".photolist");
  const photographyTitle = document.querySelector("#photography-title");

  photoList.addEventListener("scroll", event => {
    const scrollLeft = event.target.scrollLeft;
    if (isNaN(scrollLeft)) {
      return;
    }
    const newOpacity = modulate(scrollLeft, [0, 75], [1, 0.35], true);
    console.log(newOpacity);
    photographyTitle.style.opacity = newOpacity;
  });
});

const modulate = (value, rangeA, rangeB, limit) => {
  const [fromLow, fromHigh] = Array.from(rangeA);
  const [toLow, toHigh] = Array.from(rangeB);
  const result =
    toLow + ((value - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow);

  if (limit) {
    if (toLow < toHigh) {
      if (result < toLow) {
        return toLow;
      }
      if (result > toHigh) {
        return toHigh;
      }
    } else {
      if (result > toLow) {
        return toLow;
      }
      if (result < toHigh) {
        return toHigh;
      }
    }
  }

  return result;
};
