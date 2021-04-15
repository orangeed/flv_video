<!-- 首页 -->
<template>
  <div>
    <video-player
      class="video-player vjs-custom-skin"
      ref="videoPlayer"
      :playsinline="true"
      :options="playerOptions"
    >
    </video-player>
    <!-- 视频播放 -->
    <el-row type="flex">
      <el-col :span="8" class="index-col">
       <video
          class="video-js vjs-default-skin vjs-big-play-centered"
          ref="first"
          data-setup='{"html5" : { "nativeTextTracks" : false }}'
        >
          >
          <source id="source" type="rtmp/flv" /></video
      > 
      
      </el-col>
      <el-col :span="8" class="index-col"
        ><video
          class="video-js vjs-default-skin vjs-big-play-centered"
          ref="second"
        >
          <source id="source" type="application/x-mpegURL" /></video
      ></el-col>
      <el-col :span="8" class="index-col"
        ><video
          class="video-js vjs-default-skin vjs-big-play-centered"
          ref="third"
        >
          <source id="source" type="application/x-mpegURL" /></video
      ></el-col>
    </el-row>
    <!-- 全部暂停 -->
    <el-button
      type="primary"
      ref="btn"
      style="width: 300px; margin: 30px"
      @click="handleStopAll"
      >全部暂停</el-button
    >
    <!-- 表单 -->
    <el-form ref="form" class="form" :model="postForm" label-width="130px">
      <el-form-item label="录像机id">
        <el-input v-model="postForm.nvrID"></el-input>
      </el-form-item>
      <el-form-item label="录像机ip">
        <el-input v-model="postForm.nvrIP"></el-input>
      </el-form-item>
      <el-form-item label="录像机端口">
        <el-input v-model="postForm.nvrPort"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="postForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="postForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="通道号">
        <el-input v-model="postForm.channel"></el-input>
      </el-form-item>
      <el-form-item label="通道号">
        <el-input v-model="postForm.streamType"></el-input>
      </el-form-item>
      <el-form-item label="码流类型">
        <el-input
          v-model="postForm.channel"
          placeholder="码流类型：1主码流；2次码流"
        ></el-input>
      </el-form-item>
      <el-form-item label="转发视频服务器ip">
        <el-input v-model="postForm.liveIP"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 300px" @click="handleEnter"
          >确定</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import videojs from "video.js";
import "videojs-flash";
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";
import "videojs-flash";
import SWF_URL from "videojs-swf/dist/video-js.swf";

// import SWF_URL from "videojs-swf/dist/video-js.swf";
export default {
  props: {},
  data() {
    return {
      postForm: {
        nvrID: "1",
        nvrIP: "127.0.0.1",
        nvrPort: "3302",
        userName: "orange",
        password: "123456",
        channel: "1",
        streamType: "1",
        liveIP: "192.168.1.85",
      },
      resultForm: {},
      videoPlayer: [],
      playSouce: {},
      baseUrl: "http://127.0.0.1:10023/video/transfer",
      // playerOptions: {
      //   autoplay: true,
      //   sources: [
      //     {
      //       type: "rtmp/mp4",
      //       src: "rtmp://58.200.131.2:1935/livetv/hunantv", // 亲测可用
      //     },
      //   ],
      //   techOrder: ["html5", "flash"],
      //   flash: {
      //     swf: SWF_URL,
      //   },
      // },
    };
  },
  computed: {
    playerOptions() {
      const playerOptionsObj = {
        // height: "300",
        // sources: [
        //   {
        //     type: "rtmp/mp4",
        //     src: "rtmp://58.200.131.2:1935/livetv/hunantv", //rtmp流地址
        //   },
        // ],
        // techOrder: ["flash"],
        // autoplay: false,
        // controls: true,
        // poster:
        //   "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-9.jpg",
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        flash: {
          hls: { withCredentials: false },
          swf: SWF_URL, // 引入静态文件swf
        },
        sources: [
          {
            type: "video/flv",
            // src: "https://www.askajohnny.com/shipinyasuo_1579414465.mov",
            // type: "rtmp/flv",
            // type: "rtmp/mp4",
            // src: "rtmp://183.134.197.66:20022/live/test",
            // src: "rtmp://58.200.131.2:1935/livetv/hunantv", // 这是芒果TV现场直播视频，地址是可以用的，最后需要替换成后端给的项目地址
            // src: "http://183.134.197.66:20023/live/test.flv",
            src: "https://mister-ben.github.io/videojs-flvjs/bbb.flv",
          },
          // {
          //   type: 'application/x-mpegURL',
          //   src: this.playUrl
        ],
        poster: "", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true, //全屏按钮
        },
      };
      return playerOptionsObj;
    },
  },
  created() {},
  mounted() {
    // this.init();
  },
  watch: {},
  methods: {
    init() {
      // let newPlaySouce = this.playSouce.map((item, index) => {
      //   return { ...item, ...arr[index] };
      // });
      // const fir = this.$refs.first;
      // let videoPlayer = videojs(fir, {
      //   autoplay: true,
      //   techOrder: ["flash"], //设置flash播放
      //   playbackRates: [1, 2, 3, 4, 5, 8, 10, 20],
      //   notSupportedMessage:
      //     "此视频暂无法播放，检查设备状态是否正常或请查看是否安装flash", //无法播放时显示的信息
      // });
      // videoPlayer.src({
      //   src: this.playSouce.address,
      //   type: "rtmp/flv",
      // });
      // videoPlayer.play();
      // videoPlayer.pause();
    },
    //   获取视频地址
    async handleEnter() {
      this.axios({
        method: "post",
        url: `${this.baseUrl}/realtime/nvr`,
        data: this.postForm,
      })
        .then((res) => {
          if (res.data.errorCode === 0) {
            this.playSouce = { ...res.data.data };
            // this.init();
          }
        })
        .catch((error) => {
          this.$message.error(error.message);
        });
    },
    // 停止播放一个
    handleStopItem(id) {
      console.log("id", id);
      this.axios({
        method: "delete",
        url: `${this.baseUrl}/stop`,
        data: {
          playID: id,
        },
      })
        .then((res) => {
          console.log("res", res);
          this.$message.success("已暂停");
        })
        .catch((error) => {
          this.$message.error(`${error.message}`);
        });
    },
    // 全部停止
    handleStopAll() {
      this.videoPlayer.forEach((play) => {
        play.pause();
      });
      this.axios({
        method: "delete",
        url: `${this.baseUrl}/stop/all`,
        data: {},
      })
        .then((res) => {
          console.log("res", res);
          this.$message.success("已全部暂停");
        })
        .catch((error) => {
          this.$message.error(`${error.message}`);
        });
    },
  },
  components: { videoPlayer },
};
</script>

<style scoped lang="scss">
.index-col {
  display: flex;
  justify-content: center;
  align-items: center;
}
.form {
  width: 50%;
  margin: 0 auto;
}
</style>
