"use strict";(self["webpackChunkcitydashboard_3_X"]=self["webpackChunkcitydashboard_3_X"]||[]).push([[311],{4311:function(t,n,e){e.r(n),e.d(n,{default:function(){return d}});var i=e(6252),r=e(3577);function a(t,n,e,a,o,l){const s=(0,i.up)("highcharts");return(0,i.wg)(),(0,i.j4)(s,{class:"chartContainer wordCloud",style:(0,r.j5)(l.chartContainerHeight),options:o.chartOptions},null,8,["style","options"])}var o=e(9654),l={props:{name:{type:String,default:""},request:{type:Object,default:()=>{}},belong:{type:String}},watch:{request:{deep:!0,immediate:!0,handler:function(t,n){const{config:e,data:i}=t;this.chartOptions.series[0]={data:i,name:e.label?e.label:this.name}}}},computed:{chartContainerHeight(){return"card_mapview"===this.belong?{height:"15rem"}:{height:"100%"}}},data(){return{chartOptions:{...o.Ei,chart:{type:"wordcloud",...o.IL},plotOptions:{series:{},wordcloud:{rotation:{to:0}}},series:[]}}}},s=e(3744);const c=(0,s.Z)(l,[["render",a]]);var d=c},9654:function(t,n,e){e.d(n,{Ei:function(){return i},IL:function(){return r},PU:function(){return a},il:function(){return o}});const i={title:{text:null,style:{display:"none"}},credits:{enabled:!1}},r={marginTop:-10,spacingTop:-10},a={lineColor:"rgba(200,200,200,0.2)",gridLineWidth:0,minPadding:0,maxPadding:0},o={title:{text:null},lineWidth:1,lineColor:"rgba(200,200,200,0.2)",gridLineColor:"rgba(100,100,100,0.1)",minorGridLineWidth:0,min:0,labels:{formatter:function(){return this.value}}}}}]);
//# sourceMappingURL=311.2630b149.js.map