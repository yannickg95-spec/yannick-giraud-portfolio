(function () {
  document.querySelectorAll('.project-card').forEach(function (card) {
    var video = card.querySelector('.project-preview-video');
    if (!video) return;

    var startTime = parseFloat(card.dataset.previewStart) || 0;
    var hovering = false;

    // Kick off buffering immediately so playback starts instantly on hover.
    var warmUp = video.play();
    if (warmUp && typeof warmUp.then === 'function') {
      warmUp.then(function () {
        if (hovering) {
          startPreview();
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }).catch(function () {});
    }

    function startPreview() {
      if (!hovering) return;
      video.currentTime = startTime;
      video.play().catch(function () {});
    }

    card.addEventListener('mouseenter', function () {
      hovering = true;
      if (video.readyState >= 1) {
        startPreview();
      } else {
        video.addEventListener('loadedmetadata', startPreview, { once: true });
      }
    });

    card.addEventListener('mouseleave', function () {
      hovering = false;
      video.pause();
    });

    video.addEventListener('ended', startPreview);
  });
})();
