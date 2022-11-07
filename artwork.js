class Artwork {
    constructor(artworkContainer, imageUrl) {
      // Same as document.createElement('img');
      const image = new Image();
      image.src = imageUrl;
      artworkContainer.append(image);
    }
  }
