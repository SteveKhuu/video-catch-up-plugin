const CATCHUP_CONFIG = {
  CHECKUP_INTERVAL: 1000,
  BUFFER_THRESHOLD: 20, // Threshold in seconds between current time and buffer end of when we should drop to 1x speed
  CATCHUP_RATE: 1.5,
  NORMAL_RATE: 1,
  RETRIES: 5
};

let videoPlayer;

findVideoPlayer();

function findVideoPlayer() {
  let retries = CATCHUP_CONFIG.RETRIES;
  let retry = setInterval(function(){
    if (retries > 0) {
      videoPlayer = document.querySelector('video');
      retries--;
    }

    if (videoPlayer) {
      dispatchCatchup();
      clearInterval(retry);
    }
  }, CATCHUP_CONFIG.CHECKUP_INTERVAL);
}

function dispatchCatchup(){
  setInterval(catchUp, CATCHUP_CONFIG.CHECKUP_INTERVAL);
}

function catchUp(){
  let bufferEnd = videoPlayer.buffered.end(0);
  let playRate = CATCHUP_CONFIG.CATCHUP_RATE;

  if (bufferEnd - videoPlayer.currentTime <= CATCHUP_CONFIG.BUFFER_THRESHOLD) {
    playRate = CATCHUP_CONFIG.NORMAL_RATE;
  }

  videoPlayer.playbackRate = playRate;
}

