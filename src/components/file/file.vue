<template>
  <div class="file">
    <el-upload class="upload" :show-file-list=false :before-upload="beforeUpload" drag multiple action="">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <div class="file-list">
      <div class="file-con" v-for="item in this.files" v-bind:key="item.fileName" @click="downloadFile(item)">
        <i class="file-icon"></i>
        <p class="file-name">{{item.fileName}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '../../axios/api'
  import qs from 'qs'
  export default {
    props: [
      'projectId'
    ],
    data() {
      return {
        files: [],
        downloadUrl:''
      }
    },
    created() {
      this.getFile()
    },
    methods: {
      getFile() {
        this.$http.post('/api/showProjectFile.php', qs.stringify({
            'projectId': this.projectId
          }))
          .then(res => {
            if (typeof (res.data) == 'string') {
              return;
            } else {
              this.files = res.data;
              console.log('you')
            }
          })
      },
      beforeUpload(file) {
        console.log(file)
        let param = new FormData(); //创建form对象
        param.append('file', file); //通过append向form对象添加数据
        param.append('projectId', this.projectId);
        console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }; //添加请求头
        this.$http.post('http://127.0.0.1/api/uploadFileBetweenLeaderAndSender.php', param, config)
          .then(response => {
            console.log(response.data);

            if (response.data.msg == 'true') {
              this.getFile();
            }
          })
        return true
      },
      downloadFile(file) {
        const a = document.createElement('a');
        a.href = 'http://127.0.0.1/api/downloadFile.php?fileName='+file.fileName+'&'+'folderName='+file.folderName;
        // console.log(a.href)
        // a.download = 'file.fileName';
        a.click();
      }

        // this.$http.post('/api/downloadFile.php', qs.stringify({
        //   fileName: file.fileName,
        //   folderName: file.folderName
        // })).then(response => {
        //   this.download(response)
        // }).catch((error) => {

        // })
      //   let fileInfo = qs.stringify({
      //     fileName: file.fileName,
      //     folderName: file.folderName
      //   })
      //   this.$http({
      //     method: 'post',
      //     url: '/api/returnB.php',
      //     data: fileInfo,
      //     responseType: 'blob'
      //   }).then(response => {
      //     this.download(response,file)
      //   }).catch((error) => {

      //   })
      // },
      // download(data,file) {
      //   if (!data) {
      //     return
      //   }
      //   let url = window.URL.createObjectURL(new Blob([data]))
      //   let link = document.createElement('a')
      //   link.style.display = 'none'
      //   link.href = url
      //   link.setAttribute('download', file.fileName)

      //   document.body.appendChild(link)
      //   link.click()
      // }
    }
  }

</script>
<style scoped>
  .file {
    display: flex;
    flex-wrap: wrap
  }


  .fileList {
    flex: 1;
    background: red;
  }

  .file-con {
    display: inline-block;
    margin: 0.5rem;
    padding: 0.5rem;
    cursor: pointer;
  }

  .file-icon {
    display: inline-block;
    width: 4rem;
    height: 4rem;
    background: url(file-icon.png);
    background-size: 4rem 4rem;
  }

  .file-name {
    text-align: center;
    width: 4rem;
    height: 2rem;
    word-break: normal;
    white-space: normal;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis
  }

</style>
