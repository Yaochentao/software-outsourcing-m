<template>
  <div class="engineerRadar">
    <span @click="closeRadar" class="close-btn"></span>
    <p>姓名：{{this.engineerInfo.name}}</p>
    <p>联系方式：{{this.engineerInfo.tel}}</p>
    <p>擅长方向： {{this.engineerInfo.skill}}</p>
    <div id="myChart" style="width: 18rem;height: 18rem;"></div>
  </div>
</template>
<script>
  import qs from 'qs'
  import echarts from 'echarts'
  export default {
    props: [
      'engineerInfo' 
    ],
    data() {
      return {
        show: false,
        radarData: {},
        test: []
      }
    },
    mounted() {
      if(this.test.length > 0) {
        this.drawLine();
      }
    },
    created() {
      this.$http.post('/api/displayAbility.php',qs.stringify({
        id: this.engineerInfo.id
      })).then(res =>{
        this.radarData = res.data[0];
        let Data = new Array();
        Data.push(this.radarData.rate)
        Data.push(this.radarData.quality)
        Data.push(this.radarData.projectValue)
        Data.push(this.radarData.degree)
        Data.push(this.radarData.speed)
        this.test = Data
        console.log(Data)
        this.drawLine();
      })
    },
    methods: {
      closeRadar() {
        this.$emit('closeRader', this.Show);
      },
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let Data = new Array();
        console.log(this.test)
        // Data.push(this.radarData.rate)
        // Data.push(this.radarData.quality)
        // Data.push(this.radarData.projectValue)
        // Data.push(this.radarData.degree)
        // Data.push(this.radarData.speed)
        // console.log([this.radarData.rate,
        //         this.radarData.quality,
        //         this.radarData.projectValue,
        //         this.radarData.degree,
        //         this.radarData.speed])
        let myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          tooltip: {},
          radar: {
            // shape: 'circle',
            name: {
              textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
              }
            },
            indicator: [{
                name: '需求实现度',
                max: 100
              },
              {
                name: '质量',
                max: 100
              },
              {
                name: '价值',
                max: 100
              },
              {
                name: '完成度',
                max: 100
              },
              {
                name: '速度',
                max: 100
              },
            ]
          },
          series: [{
            type: 'radar',
            // areaStyle: {normal: {}},
            data: [{
                value: this.test,
                name: 'engineer能力'
              },

            ]
          }]
        });
      }
    }
  }

</script>

<style scoped>
p {
  margin-top: 1rem;
}
.engineerRadar {
  position: relative;
    padding: 1rem;
    width: 20rem;
    height: 30rem;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -10rem;
    margin-left: -10rem;
    background: #fff;
    border-radius: 0.5rem;
    z-index: 100;
    box-shadow: 0px 0px 8px #999;
}
.close-btn {
    position: absolute;
    top: 0rem;
    right: 0rem;
    display: block;
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    background: #fff url(close1.png);
    background-size: 1.6rem 1.6rem;
    cursor: pointer;
  }
</style>

