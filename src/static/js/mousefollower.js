document.addEventListener("DOMContentLoaded", async function () {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    const speed = 0.05; // Adjust speed (lower is slower)

    for (let i = 0; i < 100; i++)
        getRandomAd().then((good, bad) => {
            document.body.insertAdjacentHTML(
                "beforeend",
                `<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><img src="${good}" vx="1" vy="1" px="${Math.random() * 1000}" py="${Math.random() * 1000}" class="follow-ad"></a>`,
            );
        });

    document.addEventListener("mousemove", (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    const mouseMass = 5;

    function moveImage(image) {
        // Calculate movement with easing
        let imgX = parseFloat(image.getAttribute("px"));
        let imgY = parseFloat(image.getAttribute("py"));
        let vx = parseFloat(image.getAttribute("vx"));
        let vy = parseFloat(image.getAttribute("vy"));

        const vel =
            speed *
            (mouseMass /
                Math.sqrt((mouseX - imgX) ** 2 + (mouseY - imgY) ** 2));
        vx += (mouseX - imgX) * vel;
        vy += (mouseY - imgY) * vel;

        imgX += vx;
        imgY += vy;

        image.setAttribute("px", imgX);
        image.setAttribute("py", imgY);
        image.setAttribute("vx", vx);
        image.setAttribute("vy", vy);

        // Boundary collision
        if (imgX < 0 || imgX > window.innerWidth) {
            vx = -0.75 * vx;
            image.setAttribute("vx", vx);
        }

        if (imgY < 0 || imgY > window.innerHeight) {
            vy = -0.75 * vy;

            image.setAttribute("vy", vy);
        }

        // Apply new position
        image.style.left = `${imgX - 100}px`;
        image.style.top = `${imgY - 50}px`;
    }

    function update() {
        const floatingImage = document.querySelectorAll(".follow-ad");
        floatingImage.forEach((image) => {
            moveImage(image);
        });
        requestAnimationFrame(update);
    }

    update();
});
