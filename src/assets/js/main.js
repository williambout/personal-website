document.addEventListener('DOMContentLoaded', () => {
  const instagramPostHeight = 245;
  var feed = new Instafeed({
    get: 'user',
    userId: 484463,
    clientId: '89adf217b33c47c8be15a7aa96acbb72',
    accessToken: '484463.89adf21.8afcc57c50924d9aa1bed485261cf83c',
    mock: true,
    success: (response) => {
      const galleryEl = document.createElement("ul");
      galleryEl.classList.add('instagram-gallery');
      response.data.forEach((post) => {
        // console.log(post);
        const imageRatio = post.images.standard_resolution.width / post.images.standard_resolution.height;
        const postEl = document.createElement("li");
        console.log(instagramPostHeight * imageRatio);
        postEl.style.width = `${Math.round(instagramPostHeight * imageRatio)}px`;
        postEl.classList.add('instagram-post')

        const imageEl = document.createElement("img");
        imageEl.src = post.images.standard_resolution.url;
        imageEl.width = post.images.standard_resolution.width;
        imageEl.height = post.images.standard_resolution.height;
        imageEl.classList.add('image');
        postEl.appendChild(imageEl);

        const shadowEl = document.createElement("div");
        shadowEl.style.backgroundImage = `url(${post.images.standard_resolution.url})`;
        shadowEl.classList.add('shadow');
        postEl.appendChild(shadowEl);

        galleryEl.appendChild(postEl);
      });
      document.getElementById("photos").appendChild(galleryEl);
    }
   });
   feed.run();
}, false);
