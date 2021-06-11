import anime from "animejs/lib/anime.es.js";
import smoothscroll from "smoothscroll-polyfill";

smoothscroll.polyfill();

document.addEventListener("DOMContentLoaded", () => {
	const links = document.querySelectorAll('a[href^="#"]');
	links.forEach((link) => {
		const id = link.attributes["href"].value.slice(1);
		const target = document.getElementById(id);
		link.addEventListener("click", () => {
			target.scrollIntoView({ behavior: "smooth" });
		});
	});

	const photoList = document.querySelector(".photolist");

	const photographyFade = anime({
		targets: "#photography-title",
		opacity: 0.15,
		easing: "linear",
		autoplay: false,
	});

	let canScrollLeft = false;
	let canScrollRight = true;

	photoList.addEventListener("scroll", (event) => {
		const scrollLeft = event.target.scrollLeft;

		photographyFade.seek(photographyFade.duration * (scrollLeft / 75));

		if (
			photoList.scrollWidth ===
			photoList.clientWidth + photoList.scrollLeft
		) {
			photoScrollRight.classList.remove("active");
			canScrollRight = false;
		}

		if (
			!canScrollRight &&
			photoList.scrollWidth > photoList.clientWidth + photoList.scrollLeft
		) {
			photoScrollRight.classList.add("active");
			canScrollRight = true;
		}

		if (scrollLeft > 0 && !canScrollLeft) {
			photoScrollLeft.classList.add("active");
			canScrollLeft = true;
		}

		if (scrollLeft === 0 && canScrollLeft) {
			photoScrollLeft.classList.remove("active");
			canScrollLeft = false;
		}
	});

	const photoScrollRight = document.querySelector(".scroll-right");
	const photoScrollLeft = document.querySelector(".scroll-left");

	photoScrollRight.addEventListener("click", (event) => {
		photoList.scrollTo({
			top: 0,
			left: photoList.scrollLeft + 400,
			behavior: "smooth",
		});
	});

	photoScrollLeft.addEventListener("click", (event) => {
		photoList.scrollTo({
			top: 0,
			left: photoList.scrollLeft - 400,
			behavior: "smooth",
		});
	});

	const navFade = anime({
		targets: "nav",
		opacity: [0, 1],
		easing: "linear",
		autoplay: false,
	});

	const headerHeight = document.querySelector("header").clientHeight;

	window.addEventListener("scroll", (event) => {
		const scrollTop = window.scrollY;

		navFade.seek(
			navFade.duration * (Math.max(0, scrollTop - headerHeight + 100) / 50)
		);
	});

	const changeNav = (entries, observer) => {
		entries.forEach((entry) => {
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
		threshold: 0.2,
	};

	const observer = new IntersectionObserver(changeNav, options);

	const sections = document.querySelectorAll("section");
	sections.forEach((section) => {
		observer.observe(section);
	});
});
