import anime from "animejs/lib/anime.es.js";
import LazyLoad from "vanilla-lazyload";

document.addEventListener("DOMContentLoaded", () => {
  const lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
  });

  const navbar = document.querySelector("nav");
  let isNavbarVisible = false;
  const header = document.querySelector("header");
  const headerHeight = header.offsetHeight;

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

  const toggleNavbar = () => {
    navbar.classList.toggle('visible');
    isNavbarVisible = !isNavbarVisible;
  };

  window.addEventListener("scroll", event => {
    const scrollTop = window.scrollY;
    timeline.seek(timeline.duration * (scrollTop / 400));

    console.log('isNavbarVisible', isNavbarVisible);
    console.log('scrollTop', scrollTop);
    console.log('headerHeight', headerHeight);

    if ((isNavbarVisible && scrollTop < headerHeight) || (!isNavbarVisible && scrollTop > headerHeight)) {
      toggleNavbar();
    }
  });
});
