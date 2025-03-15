const videoElement = document.getElementById("video");

document.addEventListener("DOMContentLoaded", async function () {
    // Remove videoElement fullscreen option
    videoElement.removeAttribute("controls");
});
