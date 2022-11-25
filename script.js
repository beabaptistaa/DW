//'https://api.artic.edu/api/v1/artworks';


// JSON_PATH --------------------------------------------------
const BASE_URL = 'https://api.artic.edu/api/v1';
// ------------------------------------------------------------


// ====================== SORT FUNCTIONS ======================
// SORT_YEAR_ASC ----------------------------------------------
const SORT_YEAR_ASC = function(a, b) {
  console.log("olá sort_asc");
  return a.date_end - b.date_end;
};
// ------------------------------------------------------------

// SORT_YEAR_DESC ---------------------------------------------
const SORT_YEAR_DESC = function(a, b) {
  console.log("olá sort_desc");
  return b.date_end - a.date_end;
};
// ------------------------------------------------------------

// SORT_ALPHA_TITLE ---------------------------------------------
const SORT_ALPHA_TITLE = function(a, b) {
  console.log("olá sort_alpha título");
  const titleA = a.title.toUpperCase();
  const titleB = b.title.toUpperCase();
  if (titleA < titleB) { return -1; }
  if (titleA > titleB) { return 1; }
  return 0;
};
// ------------------------------------------------------------

// SORT_ALPHA_ARTIST ---------------------------------------------
const SORT_ALPHA_ARTIST = function(a, b) {
  console.log("olá sort_alpha artista");
  const artistA = a.artist_title;
  const artistB = b.artist_title;
  if (artistA < artistB) { return -1; }
  if (artistA > artistB) { return 1; }
  return 0;
};
// ------------------------------------------------------------
// ============================================================

class App {
  constructor() {
    this._onJsonReady = this._onJsonReady.bind(this);
    this._sortArtworks = this._sortArtworks.bind(this); 
    this._searchArtworks = this._searchArtworks.bind(this);

    this.artworkInfo = [];

    // ============= SORT =================================== 
    const ascElement = document.querySelector('#asc');
    const ascButton = new SortButton(ascElement, this._sortArtworks, SORT_YEAR_ASC);
    
    const descElement = document.querySelector('#desc');
    const descButton = new SortButton(descElement, this._sortArtworks, SORT_YEAR_DESC);
    
    const alphaElement = document.querySelector('#alpha');
    const alphaButton = new SortButton(alphaElement, this._sortArtworks, SORT_ALPHA_TITLE);
  
    const alphaArtistElement = document.querySelector('#alpha_artist');
    const alphaArtistButton = new SortButton(alphaArtistElement, this._sortArtworks, SORT_ALPHA_ARTIST);
  }

  // 1º
  loadArtworks() {
    
    fetch(`${BASE_URL}/artworks?page=1&limit=50`)
        .then(this._onResponse)
        .then(this._onJsonReady);
  }

  // 2º
  _onResponse(response) {
    return response.json();
  }

  // 3º
  _onJsonReady(json) {
    console.log("json")
    console.log(json)

    console.log("json.data")
    console.log(json.data)

    console.log("json.config")
    console.log(json.config)
    
    console.log("(json ready) this")
    console.log(this)
    
    this.artworkInfo = json;
    //this._renderArtworks();
    this._renderArtworks();
    this._searchArtworks();
  }
  
  // 4º
  _renderArtworks() {
    const artworkContainer = document.querySelector('#artwork-container');
    artworkContainer.innerHTML = '';

    console.log("(render) this")
    console.log(this)

    for (const info of this.artworkInfo.data) {
      const artwork = new Artwork(info, this.artworkInfo.config.iiif_url);
    }
    

  }

  _sortArtworks(sortFunction) {
    console.log("olá sort");

    console.log("(sort) this.artworkInfo.data:");
    console.log(this.artworkInfo.data);

    this.artworkInfo.data.sort(sortFunction);
    this._renderArtworks();
  }

  _searchArtworks(){
    console.log("olá search");

    const searchBar = document.querySelector('#searchbar');
   
    searchBar.addEventListener('keyup', (e) => {
      //console.log(e.target.value);
      const searchInput = e.target.value.toLowerCase();

      const filteredArtworks = this.artworkInfo.data.filter(info => { 
        return info.title.toLowerCase().includes(searchInput)});
      console.log("filteredArtworks");
      console.log(filteredArtworks);

      const artworkContainer = document.querySelector('#artwork-container');
    artworkContainer.innerHTML = '';

    for (const info of filteredArtworks) {
      const artwork = new Artwork(info, "https://www.artic.edu/iiif/2/");
    }

    });
  }
  
  
}

class Artwork {
  constructor(artwork, imgBaseUrl) {

    // Same as document.createElement('img');
    const artworkContainer = document.querySelector('#artwork-container');
    const image = new Image();
    image.src = ``;
    const artworkItem = document.createElement('div');
    artworkItem.innerHTML = `
      <img src='${imgBaseUrl}/${artwork.image_id}/full/843,/0/default.jpg' />
      <br />
      Title: ${artwork.title}<br />
      Artist: ${artwork.artist_title || 'Unknown'}<br />
      Year: ${artwork.date_end}<br />
    `
    artworkContainer.appendChild(artworkItem)
    
  }
}

class SortButton {
  constructor(containerElement, onClickCallback, sortFunction) {
    this._onClick = this._onClick.bind(this);
    this.onClickCallback = onClickCallback;

    this.sortFunction = sortFunction;
    containerElement.addEventListener('click', this._onClick);
  }

  _onClick() {
    console.log("clicou!");
    this.onClickCallback(this.sortFunction);
  }
}

// script.js
const app = new App();
app.loadArtworks();

