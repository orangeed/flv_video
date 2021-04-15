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
    </div> -->
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
          >
            您的浏览器不支持video
          </video>
        </div>
      </el-col>
      <el-col :span="8" class="index-col"
        ><div class="mainContainer">
          <video
            id="videoElement"
            ref="second"
            class="centeredVideo"
            controls
            autoplay
            width="1024"
            height="576"
          >
            您的浏览器不支持video
          </video>
        </div></el-col
      >
      <el-col :span="8" class="index-col"
        ><div class="mainContainer">
          <video
            id="videoElement"
            ref="third"
            class="centeredVideo"
            controls
            autoplay
            width="1024"
            height="576"
          >
            您的浏览器不支持video
          </video>
        </div></el-col
      >
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
import flvjs from "flv.js";
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
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  watch: {},
  methods: {
    //   初始化视频
    init() {
      if (flvjs.isSupported()) {
        const first = this.$refs.first;
        let flvPlayer = flvjs.createPlayer({
          type: "flv",
          url: "http://183.134.197.66:20023/live/test.flv",
          //   url: "http://183.134.197.66:20023/live/test.flv",
        });
        flvPlayer.attachMediaElement(first);
        flvPlayer.load(); //加载
        flvPlayer.play();
      }
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
  components: {},
};
</script>

<style scoped lang="scss">
.mainContainer {
  display: block;
  //   width: 1024px;
  margin-left: auto;
  margin-right: auto;
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
//   display: flex;
//   justify-content: center;
//   align-items: center;
}
.form {
  width: 50%;
  margin: 0 auto;
}
</style>
