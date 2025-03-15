document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("video");
    const playPauseBtn = document.getElementById("playPause");
    const volumeUpBtn = document.getElementById("volume-up");
    const volumeDownBtn = document.getElementById("volume-down");
    const skipBackBtn = document.getElementById("skip-back");
    const skipForwardBtn = document.getElementById("skip-forward");

    // Toggle play/pause state
    playPauseBtn.addEventListener("click", function () {
        if (video.paused) {
            video.play();
            playPauseBtn.textContent = "Pause";
        } else {
            video.pause();
            playPauseBtn.textContent = "Play";
        }
    });

    // Increase volume by 10%, ensuring the volume doesn't exceed 1
    volumeUpBtn.addEventListener("click", function () {
        video.volume = Math.min(video.volume + 0.1, 1);
    });

    // Decrease volume by 10%, ensuring the volume doesn't go below 0
    volumeDownBtn.addEventListener("click", function () {
        video.volume = Math.max(video.volume - 0.1, 0);
    });

    // Rewind 10 seconds (skip-back)
    skipBackBtn.addEventListener("click", function () {
        video.currentTime = Math.max(video.currentTime - 10, 0);
    });

    // Fast forward 10 seconds (skip-forward)
    skipForwardBtn.addEventListener("click", function () {
        video.currentTime = Math.min(video.currentTime + 10, video.duration);
    });
});
