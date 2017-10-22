
var track;
var trackList;
var image;


(function(ENV) {
  const client_id = ENV.client_id;
  SC.initialize({
    client_id: client_id
  });
  function next() {
    let Artist = prompt("Artist Name.");

    SC.get('/tracks', {
        q: Artist
      })
      .then(function(tracks) {
        let input = prompt(`give me a number from 0 to ${tracks.length-1}`);
        let currentTrack = tracks[input];
        document.getElementById("song-text").innerHTML = currentTrack.title;
        document.getElementById("song-text").setAttribute("href", currentTrack.permalink_url);
        document.getElementById("box").src = 'url(' + currentTrack.artwork_url + ')';

//controls go in sc.stream chnaged variable and defined in stream (would not work outside)
        SC.stream('/tracks/' + currentTrack.id).then(function(player) {
          document.getElementById("play").addEventListener("click", () => player.play());
          document.getElementById("pause").addEventListener("click", () => player.pause());
          document.getElementById("stop").addEventListener("click", () => player.pause());
          document.getElementById("stop").addEventListener("click", () => player.seek(0));
        })
      });
  }

  next();

  document.getElementById("next").addEventListener("click", () => next() );
})(ENV)
