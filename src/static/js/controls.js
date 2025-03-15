const usedControlsEvent = new Event("usedControls");

document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("video");
    const playPauseBtn = document.getElementById("playPause");
    const volumeUpBtn = document.getElementById("volume-up");
    const volumeDownBtn = document.getElementById("volume-down");
    const skipBackBtn = document.getElementById("skip-back");
    const skipForwardBtn = document.getElementById("skip-forward");

    // Toggle play/pause state
    playPauseBtn.addEventListener("click", function () {
        if (isCurrentlyPlayingAd()) return;
        if (video.paused) {
            video.play();
            playPauseBtn.textContent = "Pause";
        } else {
            video.pause();
            playPauseBtn.textContent = "Play";
            document.dispatchEvent(usedControlsEvent);
        }
    });

    // Increase volume by 10%, ensuring the volume doesn't exceed 1
    volumeUpBtn.addEventListener("click", function () {
        if (isCurrentlyPlayingAd()) return;
        video.volume = Math.min(video.volume + 0.1, 1);
        document.dispatchEvent(usedControlsEvent);
    });

    // Decrease volume by 10%, ensuring the volume doesn't go below 0
    volumeDownBtn.addEventListener("click", function () {
        if (isCurrentlyPlayingAd()) return;
        video.volume = Math.max(video.volume - 0.1, 0);
        document.dispatchEvent(usedControlsEvent);
    });

    // Rewind 10 seconds (skip-back)
    skipBackBtn.addEventListener("click", function () {
        if (isCurrentlyPlayingAd()) return;
        video.currentTime = Math.max(video.currentTime - 10, 0);
        document.dispatchEvent(usedControlsEvent);
    });

    // Fast forward 10 seconds (skip-forward)
    skipForwardBtn.addEventListener("click", function () {
        if (isCurrentlyPlayingAd()) return;
        video.currentTime = Math.min(video.currentTime + 10, video.duration);
        document.dispatchEvent(usedControlsEvent);
    });

    // Check if the video has stopped playing
    video.addEventListener("ended", function () {
        playPauseBtn.textContent = "Play";
    });

    document.addEventListener("adStarted", function () {
        playPauseBtn.disabled = true;
        volumeUpBtn.disabled = true;
        volumeDownBtn.disabled = true;
        skipBackBtn.disabled = true;
        skipForwardBtn.disabled = true;

        playPauseBtn.textContent = "Play";
        video.pause();
    });

    document.addEventListener("adStopped", function () {
        if (adsPlaying > 0) return;
        playPauseBtn.disabled = false;
        volumeUpBtn.disabled = false;
        volumeDownBtn.disabled = false;
        skipBackBtn.disabled = false;
        skipForwardBtn.disabled = false;

        if (!video.paused) {
            playPauseBtn.textContent = "Pause";
        }
    });

    document.addEventListener("usedControls", function () {
        let x = Math.floor(Math.random() * 100); // Increase range
        let res = Math.min(Math.floor(x ** 5 / 100_000_000 + 2) * 1000, 30000); // Reduce divisor
        console.log(x, res);
        playAd({
            duration: res,
        });
    });
});
