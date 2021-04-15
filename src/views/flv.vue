<!-- 使用flv.js -->
<template>
  <div>
    <!-- <div class="mainContainer">
      <video
        id="videoElement"
        ref="videoElement"
        class="centeredVideo"
        controls
        autoplay
        width="1024"
        height="576"
      >
        您的浏览器不支持video
      </video>
    </div>-->
    <!-- 视频播放 -->
    <el-row type="flex">
      <el-col :span="8" class="index-col">
        <div class="mainContainer">
          <video
            id="videoElement"
            ref="first"
            class="centeredVideo"
            controls
            autoplay
            width="1024"
            height="576"
          >您的浏览器不支持video</video>
        </div>
      </el-col>
      <el-col :span="8" class="index-col">
        <div class="mainContainer">
          <video
            id="videoElement"
            ref="second"
            class="centeredVideo"
            controls
            autoplay
            width="1024"
            height="576"
          >您的浏览器不支持video</video>
        </div>
      </el-col>
      <el-col :span="8" class="index-col">
        <div class="mainContainer">
          <video
            id="videoElement"
            ref="third"
            class="centeredVideo"
            controls
            autoplay
            width="1024"
            height="576"
          >您的浏览器不支持video</video>
        </div>
      </el-col>
    </el-row>
    <!-- 全部暂停 -->
    <el-button
      type="primary"
      ref="btn"
      style="width: 300px; margin: 30px"
      @click="handleStopAll"
    >全部暂停</el-button>
    <!-- 表单 -->
    <el-form ref="form" class="form" :model="postForm" label-width="130px">
      <el-form-item label="请求的ip">
        <el-input v-model="postForm.ip"></el-input>
      </el-form-item>
      <el-form-item label="请求的port">
        <el-input v-model="postForm.port"></el-input>
      </el-form-item>
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
        <el-input v-model="postForm.channel" placeholder="码流类型：1主码流；2次码流"></el-input>
      </el-form-item>
      <el-form-item label="转发视频服务器ip">
        <el-input v-model="postForm.liveIP"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 300px" @click="handleEnter">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import flvjs from "flv.js";
export default {
  props: {},
  data() {
    return {
      postForm: {
        ip: "127.0.0.1",
        port: "10023",
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
      // baseUrl: "http://127.0.0.1:10023/video/transfer",
      baseUrl: "",
    };
  },
  computed: {},
  created() {
    // this.baseUrl = `http://${this.postForm.ip}:${this.postForm.port}/video/transfer`;
  },
  mounted() {
    // this.$nextTick(() => {
    //   console.log("baseUrl", this.baseUrl);
    //   this.init().then(() => {
    //     console.log("this.$refs.first", this.$refs.first.src);
    //   });
    // });
  },
  watch: {},
  methods: {
    //   初始化视频
    async init() {
      if (flvjs.isSupported()) {
        // let newPlaySouce = this.playSouce.map((item, index) => {
        //   return { ...item, ...arr[index] };
        // });
        let flvPlayer = flvjs.createPlayer({
          isLive: true,
          type: "flv",
          // type: "mp4",
          // url: "http://183.134.197.66:20023/live/test.flv",
          url: this.playSouce.address,
        });
        flvPlayer.attachMediaElement(this.playSouce.name);
        flvPlayer.load(); //加载
        flvPlayer.play();
        this.playSouce.name.onclick = () => {
          console.log(flvPlayer);
          this.handleStopItem(flvPlayer._mediaElement.playID);
        };
        this.videoPlayer.push(flvPlayer);
      }
    },
    //   获取视频地址
    async handleEnter() {
      this.baseUrl = `http://${this.postForm.ip}:${this.postForm.port}/video/transfer`;

      this.axios({
        method: "post",
        url: `${this.baseUrl}/realtime/nvr`,
        data: this.postForm,
      })
        .then((res) => {
          if (res.data.errorCode === 0) {
            const first = this.$refs.first;
            const second = this.$refs.second;
            const third = this.$refs.third;
            this.playSouce = { ...res.data.data };
            if (!first.src) {
              first.playID = this.playSouce.playID;
              this.playSouce.name = first;
            } else if (!second.src) {
              second.playID = this.playSouce.playID;
              this.playSouce.name = second;
            } else {
              third.playID = this.playSouce.playID;
              this.playSouce.name = third;
            }
            this.init();
          }
        })
        .catch((error) => {
          this.$message.error(error.message);
        })
        // .finally(() => {
        //   const first = this.$refs.first;
        //   const second = this.$refs.second;
        //   const third = this.$refs.third;

        //   if (!first.src) {
        //     this.playSouce = {
        //       playID: 1,
        //       // address: "http://183.134.197.66:20023/live/test.flv",
        //       // address: "https://www.askajohnny.com/shipinyasuo_1579414465.mov",
        //       address: "https://mister-ben.github.io/videojs-flvjs/bbb.flv",
        //     };
        //     first.playID = this.playSouce.playID;
        //     this.playSouce.name = first;
        //   } else if (!second.src) {
        //     this.playSouce = {
        //       playID: 2,
        //       // address: "http://183.134.197.66:20023/live/test.flv",
        //       address: "https://www.askajohnny.com/shipinyasuo_1579414465.mov",
        //     };
        //     second.playID = this.playSouce.playID;
        //     this.playSouce.name = second;
        //   } else {
        //     this.playSouce.name = third;
        //   }
        //   this.init();
        // });
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
      console.log("videoPlayer", this.videoPlayer);
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
  components: {},
};
</script>

<style scoped lang="scss">
.mainContainer {
  display: block;
  //   width: 1024px;
  // margin-left: auto;
  // margin-right: auto;
  width: 100%;
  margin: 0px 10px;
}

.centeredVideo {
  display: block;
  width: 100%;
  height: 576px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: auto;
}
.index-col {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.form {
  width: 50%;
  margin: 0 auto;
}
</style>
