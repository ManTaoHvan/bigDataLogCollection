/*首页概览js*/
/*首页中的饼状图，使用的是echart.js*/
function pie_echart(id,label,data,tempUrl) {
    var dom = document.getElementById(id);
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    app.title = '环形图';
    option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        /*color:['green','red', 'yellow','blueviolet'],*/
        color:['green', '#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
        legend: {
            orient: 'vertical',
            x: 'left',
            data:label
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                radius: ['55%', '80%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '22',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:data
            }
        ]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }

    myChart.on("click",function (param) {
        var name=param.name;
        var searchTitle="状态";
        var url = tempUrl+"?searchTitle=状态&searchValue="+name;
        window.open(url,"_self");
    })
}

/*两列柱状图，柱状图的个数由series中的bar决定*/
function dataset_echart(id,data,num) {
    var dom = document.getElementById(id);
    var myChart = echarts.init(dom);
    var app = {};
    var series=[];
    if(num==1){
        series= [{type: 'bar',barWidth : 8}];
    }else if(num==2) {
        series= [{type: 'bar',barWidth : 8},{type: 'bar',barWidth : 8}];
    }else if(num==3){
        series= [{type: 'bar',barWidth : 8},{type: 'bar',barWidth : 8},{type: 'bar',barWidth : 8}];
    }
    option = null;
    option = {
        legend: {},
        tooltip: {textStyle: {
                fontSize: 12
            }},
        grid: {
            /*bottom: '22%',*/
            right:'1%',
            left:'14%'
        },
        dataset: {
            source: data
        },
        xAxis: {type: 'category',axisLabel:{rotate:45}},
        yAxis: {},
        // 注释加密 
        // 注释加密 
        series:series
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}
/*电站运维专用图*/
function line_echart_operation(id,label,data1,name1) {
    var dom = document.getElementById(id);
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    option = {
        title: {
            text: '',
            subtext: ''
        },
        grid: {
            top: '5%',
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:[name1]
        },
        xAxis:  {
            type: 'category',
            boundaryGap: false,
            axisLabel:{rotate:45},
            data: label
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}'
            },
            max:110,
            min:0,
            splitNumber:10,
            // 注释加密 
        },
        series: [
            {
                name:name1,
                type:'line',
                data:data1,
                smooth: true
            }
        ]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}

/*曲线图-1*/
function line_echart_1(id,label,data1,name1) {
    var dom = document.getElementById(id);
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    option = {
        title: {
            text: '',
            subtext: ''
        },grid: {
            left: '12%',
            right:'1%'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:[name1]
        },
        xAxis:  {
            type: 'category',
            boundaryGap: false,
            axisLabel:{rotate:45},
            data: label
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}'
            }
        },
        series: [
            {
                name:name1,
                type:'line',
                data:data1,
                smooth: true
            }
        ]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}

/*曲线图-2*/
function line_echart(id,label,data1,data2,name1,name2) {
    var dom = document.getElementById(id);
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    option = {
        title: {
            text: '',
            subtext: ''
        },grid: {
            left: '12%',
            right:'1%'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            // 注释加密 
            data:[name1,name2]
        },

        xAxis:  {
            type: 'category',
            boundaryGap: false,
            axisLabel:{rotate:45},
            data: label
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}'
            }
        },
        series: [
            {
                name:name1,
                type:'line',
                data:data1,
                symbol: 'circle',
                smooth: true,
                symbolSize: 3
            },
            {
                name:name2,
                type:'line',
                data:data2,
                symbol: 'circle',
                smooth: true,
                symbolSize: 3
            }
        ]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}

/*曲线图-3*/
function line_echart_3(id,label,data1,data2,data3,name1,name2,name3) {
    var dom = document.getElementById(id);
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    option = {
        title: {
            text: '',
            subtext: ''
        },grid: {
            left: '12%',
            right:'1%'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:[name1,name2,name3]
        },

        xAxis:  {
            type: 'category',
            boundaryGap: false,
            axisLabel:{rotate:45},
            data: label
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}'
            }
        },
        series: [
            {
                name:name1,
                type:'line',
                data:data1,
                smooth: true
            },
            {
                name:name2,
                type:'line',
                data:data2,
                smooth: true
            },
            {
                name:name3,
                type:'line',
                data:data3,
                smooth: true
            }
        ]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}

/*曲线图-4*/
function line_echart_4(id,label,data1,data2,data3,data4,name1,name2,name3,name4) {
    var dom = document.getElementById(id);
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    option = {
        title: {
            text: '',
            subtext: ''
        },grid: {
            left: '12%',
            right:'1%'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:[name1,name2,name3,name4]
        },

        xAxis:  {
            type: 'category',
            boundaryGap: false,
            axisLabel:{rotate:45},
            data: label
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}'
            }
        },
        series: [
            {
                name:name1,
                type:'line',
                data:data1,
                smooth: true
            },
            {
                name:name2,
                type:'line',
                data:data2,
                smooth: true
            },
            {
                name:name3,
                type:'line',
                data:data3,
                smooth: true
            },
            {
                name:name4,
                type:'line',
                data:data4,
                smooth: true
            }
        ]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}

/*仪表图*/
function gauge(id,val) {
    var dom = document.getElementById(id);
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    option = {
        tooltip : {
            formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
            feature: {
                // 注释加密 
                // 注释加密 
            }
        },
        series: [
            {
                name: '实时发电效率',
                type: 'gauge',
                center: ["50%", "68%"], // 注释加密 
                radius: "130%", // 注释加密 
                startAngle: 180,
                endAngle: 0,
                detail: {formatter:'{value}%'},
                data: [{value: val.toFixed(2), name: '发电效率'}]
            }
        ]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}


function ajaxTrend(value,trendUrl) {
    var url = trendUrl+value;
    $.ajax({
        type:'post',
        url:url,
        success:function (data) {
            var items = eval('(' + data + ')');
            var line_label = items.label;
            var line_input = items.input;
            for(var i=0;i<line_input.length;i++){
                if(line_input[i]<0){
                    line_input[i] = -line_input[i];
                }
            }
            var line_output = items.output;
            for(var i=0;i<line_output.length;i++){
                if(line_output[i]<0){
                    line_output[i] = -line_output[i];
                }
            }
            line_echart("trend",line_label,line_input,line_output,'发电量(kWh)','输电量(kWh)');
        }
    })
}

/*气象站数据--name要与表weather中的name一致*/
function ajaxWeather(station,weaUrl) {
    var url = weaUrl+station;
    $.ajax({
        type:'get',
        url:url,
        success:function (data) {
            var items = eval('(' + data + ')');
            loadWeatherItems(items[0]);
        }
    })
}

function loadWeatherItems(items) {
    $("#airHumidity").text((items.airHumidity || "0") + " %RH");
    $("#airPressure").text((items.airPressure || "0") + " hPa");
    $("#airTemperature").text((items.airTemperature || "0") + " ℃");
    $("#patchTemperature").text((items.patchTemperature || "0") + " ℃");
    $("#evaporation").text((items.evaporation || "0") + " mm");
    $("#illuminance").text((items.illuminance || "0") + " Lux");
    $("#irradiance").text((items.tBQTotalRadiation || "0") + " W/m²");
    // 注释加密 
    $("#rainfall").text((items.rainfall || "0") + " mm/min");
    $("#soilHumidity").text((items.soilHumidity || "0") + " %RH");
    $("#soilTemperature").text((items.soilTemperature || "0") + " ℃");
    $("#windDirection").text((items.windDirection || "0"));
    $("#windSpeed").text((items.windSpeed || "0") + " m/s");
}


function ajaxAllTotal() {
    var url = '/overview/total';
    $.ajax({
        type:'post',
        url:url,
        success:function (data) {
            var items = eval('(' + data + ')');
            loadAllToal(items);
        }
    })
}

function loadAllToal(items) {
    $("#allTotal").text((items.allTotal || "0") + "kWh");
    $("#yearTotal").text((items.yeatTotal || "0") + "kWh");
    $("#monthTotal").text((items.monthTotal || "0") + "kWh");
    $("#dayTotal").text((items.dayTotal || "0") + "kWh");
    $("#allPpv").text((items.allPpv || "0") + "kW");
}