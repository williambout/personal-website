import LazyLoad from "vanilla-lazyload";

document.addEventListener("DOMContentLoaded", () => {
  const lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
  });
});
