<template lang="pug">
.main-container
  .tile.is-parent
    .tile.is-child 
      .content
        .title.inst おわり
        p  あざざした

        form
          input#file(type="file" @change="onFileChange")
          button(type="submit" value="decide" @click="submitClick") 画像
        
        button(@click="createJSON") JSONを作る

</template>

<script>
import axios from 'axios'

export default {
  data(){
    return{
      file: null
    }
  },
  methods : {
    onFileChange(e) {
      this.file = e.target.files || e.dataTransfer.files;
    },
    async submitClick() {
      try {
        const formData = new FormData();
        formData.append("file", this.file[0]);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          }
        };
        let res = await axios.post("/file", formData, config);
        console.log(res);
        if (res.data.status === "error") {
            alert(res.data.error);
        } else {
            alert("登録完了")
        }
      } catch (error) {
        alert("画像の送信に失敗しました");
      }
    },
    async createJSON(){
      const fs = require('fs');
      const jsonData = {
        id: 1,
        isTest : true,
        mage: 'de',
        ike: 677
      }

      const config = {
          headers: {
            "content-type": "application/json",
          }
        };
      try {
        let res = await axios.post("/upload", jsonData, config);
        console.log(res);
        if (res.data.status === "error") {
            alert(res.data.error);
        } else {
            alert("登録完了")
        }
      } catch (error) {
        alert("jsonの保存に失敗しました");
      }

    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
