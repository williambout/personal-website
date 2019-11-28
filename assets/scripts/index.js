import anime from "animejs/lib/anime.es.js";

document.addEventListener("DOMContentLoaded", () => {
  const photoList = document.querySelector(".photolist");

  const photographyFade = anime({
    targets: "#photography-title",
    opacity: 0.15,
    easing: "linear",
    autoplay: false
  });

  photoList.addEventListener("scroll", event => {
    const scrollLeft = event.target.scrollLeft;
    photographyFade.seek(photographyFade.duration * (scrollLeft / 75));
  });

  const navFade = anime({
    targets: "nav",
    opacity: [0, 1],
    easing: "linear",
    autoplay: false
  });

  const headerHeight = document.querySelector("header").clientHeight;

  window.addEventListener("scroll", event => {
    const scrollTop = window.scrollY;

    navFade.seek(
      navFade.duration * (Math.max(0, scrollTop - headerHeight + 100) / 50)
    );
  });

  const scrollElement =
    window.document.scrollingElement ||
    window.document.body ||
    window.document.documentElement;
  const workLink = document.querySelector(".button-work");
  const workTop = document.querySelector("#work").getBoundingClientRect().top;

  workLink.addEventListener("click", () => {
    anime({
      targets: scrollElement,
      scrollTop: workTop,
      duration: 500,
      easing: "spring(1, 100, 10, 0)",
      complete: function(anim) {
        workLink.classlist.add("active");
      }
    });
  });
});
