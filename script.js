//'https://api.artic.edu/api/v1/artworks';

const JSON_PATH = '/Users/beatrizbaptista/Desktop/mestrado/DW/trabalhos/trabalho2/artwork.json';

class App {
  constructor() {
    this._onJsonReady = this._onJsonReady.bind(this);
    this._sortArtworks = this._renderArtworks.bind(this); 
  }
  
  _renderArtworks() {
    const artworkContainer = document.querySelector('#artwork-container');
    artworkContainer.innerHTML = '';
    for (const info of this.artworkInfo) {
      const artwork = new Artwork(artworkContainer, info.url);
    }
  }
  
  loadArtworks() {
    fetch(JSON_PATH)
        .then(this._onResponse)
        .then(this._onJsonReady);
  }

  _onJsonReady(json) {
    this.artworkInfo = json.artworks;
    this._renderArtworks();
  }

  _onResponse(response) {
    return response.json();
  }
}


/*class Artwork {
  constructor(artworkContainer, imageUrl) {
    // Same as document.createElement('img');
    const image = new Image();
    image.src = imageUrl;
    artworkContainer.append(image);
  }
}

// script.js
const app = new App();
app.loadArtworks();
*/
