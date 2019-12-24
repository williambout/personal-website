import anime from "animejs/lib/anime.es.js";
import LazyLoad from "vanilla-lazyload";
import zenscroll from "zenscroll/zenscroll-min.js";

document.addEventListener("DOMContentLoaded", () => {
  const lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
  });

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

  const changeNav = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
        document.querySelector(".active").classList.remove("active");
        var id = entry.target.getAttribute("id");
        var newLink = document
          .querySelector(`[href="#${id}"]`)
          .classList.add("active");
      }
    });
  };

  const options = {
    threshold: 0.2
  };

  const observer = new IntersectionObserver(changeNav, options);

  const sections = document.querySelectorAll("section");
  sections.forEach(section => {
    observer.observe(section);
  });
});

window.addEventListener("load", () => {
  const avatar = document.querySelector(".avatar");
  console.log("loaded");
});
