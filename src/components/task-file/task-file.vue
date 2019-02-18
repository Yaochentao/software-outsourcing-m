<template>
  <div class="file">
    <el-upload class="upload" :show-file-list=false :before-upload="beforeUpload" multiple action="">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <div class="file-list">
      <div class="file-con" v-for="item in this.files" v-bind:key="item.fileName" @click="downloadFile(item)"><i class="file-icon"></i>
        <p class="file-name">{{item.fileName}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  import qs from 'qs'

  export default {
    props: [
      'taskId',
      'projectId'

    ],
    data() {
      return {
        files: []
      }
    },
    created() {
      this.getFile()
    },
    methods: {
      getFile() {
        this.$http.post('/api/showTaskFile.php', qs.stringify({
          'taskId': this.taskId,
          'projectId': this.projectId
        })).then(res => {
          if (typeof (res.data) == 'string') {
            return;
          } else {
            this.files = res.data;
            console.log('you')
          }
        })
      },
      beforeUpload(file) {
        console.log(file);
        let param = new FormData(); //创建form对象
        param.append('file', file); //通过append向form对象添加数据
        param.append('taskId', this.taskId);
        param.append('projectId', this.projectId);
        console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去

        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }; //添加请求头

        this.$http.post('http://127.0.0.1/api/uploadFileBetweenWorkerAndLeader.php', param, config).then(response => {
            console.log(response.data.msg);

            if (response.data.msg == 'true') {
              this.getFile();
            }
          }

        );
        return true
      },
      download (data) {
        if (!data) {
            return
        }
        let url = window.URL.createObjectURL(new Blob([data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download')
        
        document.body.appendChild(link)
        link.click()
    },
      downloadFile(file) {
        console.log('xiazai')
        const a = document.createElement('a');
        a.href = 'http://127.0.0.1/api/downloadFile.php?fileName='+file.fileName+'&'+'folderName='+file.folderName;
        // a.download = 'file.fileName';
        a.click();
        // this.$http.post('http://192.168.43.108/api/downloadFile.php', qs.stringify({
        //     'fileName': file.fileName,
        //     'folderName': file.folderName
        //   }

        // ))
        // .then(res => {
        //   console.log(res)
        // })
        // let fileData = qs.stringify({
        //     'fileName': file.fileName,
        //     'folderName': file.folderName
        //   }
        // )
        // this.$http({
        //   method: 'post',
        //   url: 'http://192.168.43.108/api/downloadFile.php',
        //   data: fileData,
        //   responseType: 'blob'
        // }).then(response => {
        //   // this.download(response)
        //   console.log('1')
        //   window.open('http://192.168.43.108/api/downloadFile.php')
        // }).catch((error) => {

        // })
      }
    }
  }

</script>
<style scoped>
  .fileList {
    display: block;
  }

  .file-con {
    display: inline-block;
    margin: 0.5rem;
    padding: 0.5rem;
    cursor: pointer;
  }

  .file-icon {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    background: url(file-icon.png);
    background-size: 2rem 2rem;
  }

  .file-name {
    font-size: 0.8rem;
    text-align: center;
    width: 2rem;
    height: 1rem;
    word-break: normal;
    white-space: normal;
    word-wrap: break-word;
    /* overflow:hidden; */
    text-overflow: ellipsis
  }

</style>
