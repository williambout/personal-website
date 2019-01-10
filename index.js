import Parallax from "scroll-parallax";
import anime from "animejs/lib/anime.es.js";

document.addEventListener("DOMContentLoaded", () => {
  const p = new Parallax(".parallax").init();

  anime({
    targets: ".heading",
    translateY: [250, 0],
    opacity: 1,
    easing: "easeInOutQuart",
    delay: anime.stagger(150),
    duration: 1100
  });
});
