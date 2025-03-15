document.addEventListener("DOMContentLoaded", function () {
    const floatingImage = document.getElementById("floating-image");
    let mouseX = window.innerWidth/2;
    let mouseY = window.innerHeight/2;
    let imgX = mouseX/2;
    let imgY = mouseY/2;
    const speed = 0.05; // Adjust speed (lower is slower)

    document.addEventListener("mousemove", (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    function moveImage() {
        // Calculate movement with easing
        imgX += (mouseX - imgX) * speed;
        imgY += (mouseY - imgY) * speed;

        // Apply new position
        floatingImage.style.left = `${imgX - 100}px`;
        floatingImage.style.top = `${imgY - 50}px`;

        requestAnimationFrame(moveImage);
    }

    moveImage();
});

