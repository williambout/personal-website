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
});
