// Attraverso una chiamata ajax all'API di boolean
// https://flynn.boolean.careers/exercises/api/array/music //API
// avremo a disposizione una decina di dischi musicali.
// Utilizzando vue, stampiamo a schermo una card per ogni album.
// BONUS: Creare una select con tutti i generi dei dischi. In base a cosa scegliamo nella select, vedremo i corrispondenti cd.
// BONUS 2: Ordinare i dischi per anno di uscita.

function initVue() {
  new Vue({
    el: "#app",
    data: {
      music: [],
      genres: ["All"],
      filterKey: "",
    },

    methods: {
      getMusicGenres: function () {
        this.music.forEach((track) => {
          const genre = track.genre;
          if (!this.genres.includes(genre)) this.genres.push(genre);
        });
      },

      getGenre: function () {
        console.log(this.filterKey);
      },
    },

    computed: {
      filterByGenre: function () {
        if (this.filterKey == "All") {
          return this.music;
        } else {
          return this.music.filter((track) => {
            return track.genre == this.filterKey;
          });
        }
      },
    },

    created() {
      if (this.genres) {
        this.filterKey = this.genres[0];
      }
    },
    
    mounted() {
      axios
        .get("https://flynn.boolean.careers/exercises/api/array/music")
        .then((data) => {
          this.music = data.data.response;
          this.getMusicGenres();
          console.log(this.genres);
        });
    },
  });
}

function init() {
  initVue();
}

document.addEventListener("DOMContentLoaded", init);
