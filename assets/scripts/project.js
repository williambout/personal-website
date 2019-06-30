import anime from "animejs/lib/anime.es.js";
import LazyLoad from "vanilla-lazyload";

document.addEventListener("DOMContentLoaded", () => {
  const lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
  });

  const timeline = anime.timeline({
    easing: "linear",
    autoplay: false
  });

  timeline
    .add(
      {
        targets: "#project-cover",
        translateY: 150
      },
      0
    )
    .add(
      {
        targets: ".overlay",
        opacity: 1
      },
      0
    );

  window.addEventListener("scroll", event => {
    const scrollTop = window.scrollY;
    timeline.seek(timeline.duration * (scrollTop / 400));
  });
});
