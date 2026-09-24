// Video („Loftai Bonsai“ ir 3D orbita) sukasi pačios, kai matomos ekrane, ir sustoja, kai nuslenkama.
// Jei lankytojas naršyklėje išjungęs judesį, rodomas nejudantis kadras (paleisti galima mygtuku).
(function () {
  var videos = document.querySelectorAll('video[data-savaime]');
  if (!videos.length) return;

  var beJudesio = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (beJudesio.matches || !('IntersectionObserver' in window)) return;

  var stebetojas = new IntersectionObserver(function (irasai) {
    irasai.forEach(function (irasas) {
      var video = irasas.target;
      if (irasas.isIntersecting) {
        if (video.preload !== 'auto') video.preload = 'auto';
        video.muted = true;
        var paleidimas = video.play();
        if (paleidimas && paleidimas.catch) paleidimas.catch(function () {});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.25 });

  videos.forEach(function (video) { stebetojas.observe(video); });
})();
