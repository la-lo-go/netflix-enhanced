const episodeSelectorClass = ".episodeSelector-container"; // Div of epidodes
const titleCardListClass = ".titleCardList--container"; // Div of each episode

const div_episodeSelector = document.querySelector(episodeSelectorClass);
let blurEnabled = false;

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  console.log(message);
  
  if (message.message === "blur status") {
    blurEnabled = message.value;

    if (blurEnabled) {
      blur();
    }
  }
});

const observerBody = new MutationObserver(() => {

  if (!div_episodeSelector) {
    return;
  }

  blur();

  let observerEpisodes = new MutationObserver(() => {
    blur();
  });

  observerEpisodes.observe(div_episodeSelector, {
    childList: true,
    subtree: true,
  });
});

observerBody.observe(document.body, {
  childList: true,
  subtree: true,
});

function blur() {
  const episodeSelector = document.querySelector(episodeSelectorClass);

  if (!episodeSelector) {
    return;
  }

  const episodes = episodeSelector.querySelectorAll(titleCardListClass);
  const episodesToBlur = filterWatchedEpisodes(episodes);

  blurEpisodes(episodesToBlur);
}

function filterWatchedEpisodes(episodes) {
  let episodesToBlur = [];

  episodes.forEach((episode) => {
    const progressElement = episode.querySelector("progress");

    // if thre is no progress bar then the episode is not watched
    if (!progressElement) {
      episodesToBlur.push(episode);
    }
  });

  // if episodes viewed is equal to the number of episodes remove the first element
  if (episodes.length === episodesToBlur.length) {
    episodesToBlur.shift();
  }

  return episodesToBlur;
}

function blurEpisodes(episodes) {
  const blurLevel = 10;
  const blurEffect = `blur(${blurLevel}px)`;

  episodes.forEach((episode) => {
    episode.style.filter = blurEffect;
    episode.style.transition = "filter 0.2s";

    episode.addEventListener("mouseover", () => {
      episode.style.filter = "none";
    });

    episode.addEventListener("mouseout", () => {
      episode.style.filter = blurEffect;
    });
  });
}
