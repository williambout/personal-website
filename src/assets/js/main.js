document.addEventListener('DOMContentLoaded', () => {
  // Photos
  // const instagramPostHeight = 245;
  // const instagramFeedEl = document.querySelector(".instagram-feed-container");
  //
  // const unsplash = new Unsplash.default({
  //   applicationId: "b8d2276787388ab04fe27763c6620e5cd63a490a49a5db114d3c039ae0bc03f8",
  //   secret: "76ae45e9de86d93c68f3b67a4219f5265dfe4071e0355b3010d5af3ef16a03c1",
  //   callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
  // });
  //
  // const feed = new Instafeed({
  //   get: 'user',
  //   userId: 484463,
  //   clientId: '89adf217b33c47c8be15a7aa96acbb72',
  //   accessToken: '484463.89adf21.8afcc57c50924d9aa1bed485261cf83c',
  //   mock: true,
  //   success: (response) => {
  //     const imagesToPreload = response.data.map((post) => post.images.standard_resolution.url);
  //     const preloader = new ImagePreloader();
  //
  //     preloader.preload(imagesToPreload)
  //       .then(() => buildPostEls());
  //
  //     const buildPostEls = () => {
  //       console.log('buildPostEls');
  //       const galleryEl = document.createElement("ul");
  //       galleryEl.classList.add('instagram-feed');
  //
  //       response.data.forEach((post) => {
  //         const imageRatio = post.images.standard_resolution.width / post.images.standard_resolution.height;
  //         const postEl = document.createElement("li");
  //         postEl.style.width = `${Math.round(instagramPostHeight * imageRatio)}px`;
  //         postEl.style.opacity = 0;
  //         postEl.classList.add('instagram-post')
  //
  //         const imageEl = new Image();
  //         imageEl.src = post.images.standard_resolution.url;
  //         imageEl.width = post.images.standard_resolution.width;
  //         imageEl.height = post.images.standard_resolution.height;
  //         imageEl.classList.add('image');
  //         postEl.appendChild(imageEl);
  //
  //         const shadowEl = document.createElement("div");
  //         shadowEl.style.backgroundImage = `url(${post.images.standard_resolution.url})`;
  //         shadowEl.classList.add('shadow');
  //         postEl.appendChild(shadowEl);
  //
  //         galleryEl.appendChild(postEl);
  //         instagramFeedEl.appendChild(galleryEl);
  //         instagramFeedEl.classList.remove('-loading');
  //       });
  //
  //       anime({
  //         targets: '.instagram-post',
  //         translateX: [10, 0],
  //         scale: [0.98, 1],
  //         delay: (target, index) => index * 100,
  //         opacity: 1,
  //         duration: 2000,
  //       });
  //     }
  //   }
  //  });
  //
  // instagramFeedEl.classList.add('-loading');
  // feed.run();
  //
  // unsplash.users.profile("williambout")
  //   .then(Unsplash.toJson)
  //   .then(user => {
  //     const photosCounter = document.getElementById('photos-counter');
  //     const collectionsCounter = document.getElementById('collections-counter');
  //     console.log(photosCounter, user.total_photos);
  //     photosCounter.innerHTML = user.total_photos;
  //     collectionsCounter.innerHTML = user.total_collections;
  //   });

  // Stars
  const nucleon = document.getElementById('nucleon');
  const fallingStar = document.getElementById('falling-star');
  const gradient = document.getElementById('star-gradient');
  const nucleonBounds = nucleon.getBoundingClientRect();

  const animateStar = () => {
    const ox = getRandomInt(0, nucleonBounds.width);
    const oy = getRandomInt(0, nucleonBounds.height);
    const dx = getRandomInt(ox, ox + 200);
    const dy = getRandomInt(oy, oy + 200);

    fallingStar.setAttribute('x1', ox);
    fallingStar.setAttribute('x2', ox);
    fallingStar.setAttribute('y1', oy);
    fallingStar.setAttribute('y2', oy);
    gradient.setAttribute('x1', ox);
    gradient.setAttribute('x2', dx);
    gradient.setAttribute('y1', oy);
    gradient.setAttribute('y2', dy);

    var basicTimeline = anime.timeline();

    basicTimeline
      .add({
        targets: fallingStar,
        opacity: 1,
        x2: [
          { value: dx },
        ],
        y2: [
          { value: dy },
        ],
        easing: 'easeInOutQuart',
        duration: 1000,
      })
      .add({
        targets: fallingStar,
        opacity: 0,
        easing: 'linear',
        duration: 1000
      });
  }

  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);
  setInterval(animateStar, 3000);
});
