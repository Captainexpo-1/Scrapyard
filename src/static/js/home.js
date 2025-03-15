document.addEventListener("DOMContentLoaded", async function () {
    const gridContainer = document.getElementById("videoLink");

    try {
        // Fetch video names from the server
        const response = await fetch("/api/videos");
        const videoNames = await response.json(); // Expecting an array of video names
        console.log(videoNames);

        // Clear existing content
        gridContainer.innerHTML = "";

        // Loop through video names and fetch corresponding thumbnails
        videoNames.forEach(async (videoName) => {
            const videoItem = document.createElement("a");
            videoItem.classList.add("video-item");
            videoItem.href = "/"+videoName

            // Create an image element
            const img = document.createElement("img");
            img.src = `/api/thumbnails/${videoName}`; // Fetch the thumbnail
            img.alt = `Thumbnail for ${videoName}`;
            img.classList.add("video-thumbnail");

            // Create a text label for the video name
            const textElement = document.createElement("div");
            textElement.textContent = videoName;
            textElement.classList.add("video-label");

            // Append elements to the video item container
            videoItem.appendChild(img);
            //videoItem.appendChild(textElement);
            gridContainer.appendChild(videoItem);
        });
    } catch (error) {
        console.error("Error fetching video names or thumbnails:", error);
    }
});
