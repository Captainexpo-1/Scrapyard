var adsPlaying = 0;
var isCurrentlyPlayingAd = () => adsPlaying > 0;

const adStartedEvent = new Event("adStarted");
const adStoppedEvent = new Event("adStopped");

function stoppedAd() {
    adsPlaying--;
    document.dispatchEvent(adStoppedEvent);
}

function startedAd() {
    adsPlaying++;
    document.dispatchEvent(adStartedEvent);
}

async function getRandomAd() {
    const AD_ENDPOINT = "/ads/image/random";
    let uri = null;
    try {
        let response = await fetch(AD_ENDPOINT);
        let data = await response.json();
        uri = data.image;
    } catch (e) {
        console.error(e);
    }
    return uri;
}

function playTimer(duration) {
    document.getElementById("timer").style.display = "block";
    if (duration <= 0) {
        document.getElementById("timer").style.display = "none";
        return;
    }
    document.getElementById("timer").innerHTML = Math.round(duration / 1000);
    setTimeout(() => playTimer(duration - 1000), 1000);
}

async function playAd(spec) {
    return new Promise(async (resolve, reject) => {
        startedAd();
        isCurrentlyPlayingAd = true;
        playTimer(5000);
        let duration = spec.duration;
        let type = spec.type;
        let ad = await getRandomAd();
        document.getElementById("ad").style.display = "block";
        document.getElementById("ad").src = ad;

        // Wait for the ad to finish
        setTimeout(() => {
            stoppedAd();
            document.getElementById("ad").style.display = "none";
            resolve();
        }, duration);
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    playAd({
        duration: 5000,
        type: "image",
    });
});
