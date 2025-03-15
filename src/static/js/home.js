document.addEventListener("DOMContentLoaded", async function () {
    const gridContainer = document.getElementById("videoLink");

    try {
        // Fetch video names from the server
        const response = await fetch("/api/videos");
        const videoNames = await response.json(); // Expecting an array of strings

        // Clear existing content
        gridContainer.innerHTML = "";

        // Loop through video names and add them to the grid
        videoNames.forEach((videoName) => {
            const textElement = document.createElement("div");
            textElement.textContent = videoName; // Set the text content to the video name
            textElement.classList.add("video-label"); // Add a CSS class for styling
            gridContainer.appendChild(textElement);
        });
    } catch (error) {
        console.error("Error fetching video names:", error);
    }
});
