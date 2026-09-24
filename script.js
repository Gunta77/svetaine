// 3D orbitos video: sukasi tik tada, kai matomas ekrane.
// Jei lankytojas naršyklėje išjungęs judesį, rodomas nejudantis kadras.
(function () {
  var video = document.querySelector('.apie__video');
  if (!video) return;

  var beJudesio = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (beJudesio.matches || !('IntersectionObserver' in window)) return;

  var stebetojas = new IntersectionObserver(function (irasai) {
    irasai.forEach(function (irasas) {
      if (irasas.isIntersecting) {
        if (video.preload !== 'auto') video.preload = 'auto';
        var paleidimas = video.play();
        if (paleidimas && paleidimas.catch) paleidimas.catch(function () {});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.25 });

  stebetojas.observe(video);
})();
