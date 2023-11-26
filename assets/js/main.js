const setFullscreen = (event) => {
  document.querySelector("body").style.overflow = "hidden";
  const currentImage = event.parentNode.style.backgroundImage
    .split('url("')[1]
    .split('"')[0];
  const galeryImage = document.querySelector(".galery-image");
  galeryImage.src = `${currentImage}`;
  const galeryImageFullscreen = document.querySelector(
    ".galery-image-fullscreen"
  );
  galeryImageFullscreen.style.display = "flex";
};

const offFullscreen = () => {
  const galeryImageFullscreen = document.querySelector(
    ".galery-image-fullscreen"
  );
  galeryImageFullscreen.style.display = "none";
  document.querySelector("body").style.overflow = "auto";
};

const playVideo = (event) => {
  const videoLink = event.ariaLabel;
  document.querySelector("body").style.overflow = "hidden";
  const galeryImage = document.querySelector("iframe");
  galeryImage.src = videoLink;
  const galeryImageFullscreen = document.querySelector(
    ".galery-image-fullscreen"
  );
  galeryImageFullscreen.style.display = "flex";
};
