document.addEventListener("DOMContentLoaded", function () {
    const floatingImage = document.getElementById("mrbeastmovingad");
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let imgX = mouseX;
    let imgY = mouseY;
    const speed = 5; // Pixels per frame (constant speed)

    document.addEventListener("mousemove", (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    function moveImage() {
        const dx = mouseX - imgX;
        const dy = mouseY - imgY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > speed) {
            const moveX = (dx / distance) * speed;
            const moveY = (dy / distance) * speed;

            imgX += moveX;
            imgY += moveY;

            floatingImage.style.left = `${imgX - 50}px`;
            floatingImage.style.top = `${imgY - 50}px`;
        }

        requestAnimationFrame(moveImage);
    }

    moveImage();
});
