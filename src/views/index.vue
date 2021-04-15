<template>
  <div class="player">
    <video-player class="video-player vjs-custom-skin" :options="playerOptions">
    </video-player>
  </div>
</template>

<script>
import { videoPlayer } from "vue-video-player";
import "videojs-flash";
export default {
  data() {
    return {
      playerOptions: {
        height: "360",
        sources: [
          {
            type: "rtmp/mp4",
            src: "rtmp://184.72.239.149/vod/&mp4:BigBuckBunny_115k.mov",
          },
        ],
        techOrder: ["flash"],
        autoplay: false,
        controls: true,
      },
    };
  },
  components: {
    videoPlayer,
  },
};
</script>