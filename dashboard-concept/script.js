// created with this Dribble shot
// https://dribbble.com/shots/4791787--Drivvers-Web-Based-Data-Sharing/attachments/1077868


//also dragable Jquery

let app = new Vue({
  el: '#pi',
  data () {
    return {
      
      chartData: {
        pp : 2,
        columns: ['dataUsage', 'percent'],
        rows: [{
          dataUsage: 'Media',
          percent: 0.6
        }]
      }
    }
  }
})