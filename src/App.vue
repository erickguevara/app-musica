<template>
  <div id="app">
    <header>
      <h1>Mi musica</h1>
    </header>
    <main>
  
      <section class="player">
            <div class="autocomplete">
      <input
        type="text"
        name="artists"
        v-model="searchQuery"
        @input="onChange"
        v-on:keyup.enter="onChange"
        placeholder=""
      >
    </div>
     <input type="submit" value="Buscar" @click="onChange">
    <div v-if="!isArtistFound" class="no-results-txt">No results found</div>
        <h2 class="song-title">{{ current.title }} - <span>{{ current.artist.name }}</span></h2>
        <div class="controls">
          <button class="prev" @click="prev">Prev</button>
          <button class="play" v-if="!isPlaying" @click="play">Play</button>
          <button class="pause" v-else @click="pause">Pause</button>
          <button class="next" @click="next">Next</button>
        </div>
      </section>
      <section class="playlist">
        <h3>The Playlist</h3>
        <button v-for="(item, index) in canciones" :key="item.preview" @click="play(item,index)" :class="(item.preview == current.preview) ? 'song playing' : 'song'">
          {{ item.title }} - {{ item.artist.name }}
        </button>
      </section>

    </main>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";
import { debounce } from "debounce";
import axios from 'axios';
export default {
  name: 'app',
  data () {
    return {
      searchQuery: "",
      isArtistSelected: false,
      isArtistFound: true,
      current: {},
      index: 0,
      isPlaying: false,
      songs: [
        {
          title: 'Grateful',
          artist: 'Neffex',
          src: require('./assets/neffex-grateful.mp3')
        },
        {
          title: 'Invincible',
          artist: 'Deaf Kev',
          src: require('./assets/deaf-kev-invincible.mp3')
        }
      ],
      player: new Audio()
    }
  },
   computed: {
    ...mapState([ "canciones", "cancion"]),
  },
  methods: {
     onChange: debounce(function() {
      this.isArtistFound = true;
      this.getArtistDetails();
    }, 200),
    ...mapActions([
    
      "buscarCancion",
     
    ]),
    getArtistDetails() {
       
        this.buscarCancion(this.searchQuery);
    },
    play (song,index) {
    
     
      if (typeof song.preview != "undefined") {
        this.current = song;

        this.player.src = this.current.preview;
      }
        this.index=index;
      this.player.play();
     
      this.player.addEventListener('ended', function () {
        this.index++;
        if (this.index > this.canciones.length - 1) {
          this.index = 0;
        }
    this.index;
        this.current = this.canciones[this.index];
        this.play(this.current);
      }.bind(this));
      this.isPlaying = true;
    },
    pause () {
      this.player.pause();
      this.isPlaying = false;
    },
    next () {
      this.index++;
      if (this.index > this.canciones.length - 1) {
        this.index = 0;
      }
      this.current = this.canciones[this.index];
      this.play(this.current,this.index);
    },
    prev () {
      this.index--;
      if (this.index < 0) {
        this.index = this.canciones.length - 1;
      }
      this.current = this.canciones[this.index];
      this.play(this.current,this.index);
    }
  },
  created () {
    this.current = this.songs[this.index];
    this.player.src = this.current.src;
  }
}
</script>

<style>
.autocomplete {
  position: relative;
  display: inline-block;
  width: 50%;
  padding-bottom: 5%;

}
input {
  border: 1px solid transparent;
  background-color: #232323;
  padding: 10px;
  font-size: 16px;
}
input[type="text"] {
  background-color: #232323;
  width: 100%;
  color: #8a8a8a;
}
input[type="submit"] {
  color: #000;
  background: #e32e5d;
}
.no-results-txt {
  color: white;
  font-size: 1.2rem;
  padding: 1rem;
}
.autocomplete-items {
  position: absolute;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  top: 100%;
  left: 0;
  right: 0;
  height: 300px;
  overflow-y: auto;
}
.autocomplete-items div {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #1c1c1c;
  font-size: 16px;
  text-align: left;
}
.autocomplete-items div:hover {
  /*when hovering an item:*/
  background-color: #e9e9e9;
}
.search-items {
  background-color: #232323;
  color: #8a8a8a;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: sans-serif;
}
header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background-color: #212121;
  color: #FFF;
}
main {
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  padding: 25px;
}
.player{

      text-align: center;
}
.song-title {
  color: #53565A;
  font-size: 32px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
}
.song-title span {
  font-weight: 400;
  font-style: italic;
}
.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 15px;
}
button {
  appearance: none;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
}
button:hover {
  opacity: 0.8;
}
.play, .pause {
  font-size: 20px;
  font-weight: 700;
  padding: 15px 25px;
  margin: 0px 15px;
  border-radius: 8px;
  color: #FFF;
  background-color: #CC2E5D;
}
.next, .prev {
  font-size: 16px;
  font-weight: 700;
  padding: 10px 20px;
  margin: 0px 15px;
  border-radius: 6px;
  color: #FFF;
  background-color: #FF5858;
}
.playlist {
  padding: 0px 30px;
}
.playlist h3 {
  color: #212121;
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 30px;
  text-align: center;
}
.playlist .song {
  display: block;
  width: 100%;
  padding: 15px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
}
.playlist .song:hover {
  color: #FF5858;
}
.playlist .song.playing {
  color: #FFF;
  background-image: linear-gradient(to right, #CC2E5D, #FF5858);
}
</style>
