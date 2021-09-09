$(document).ready(function () {
    $("#search_ajax").click(function () {

        $.ajax({
            // type: 'GET',
            url: "/search_ajax/",
            data: {
                brand: $('#search').val(),
            },
            success: function(data) {


                // $('#test').append('test');
				// console.log(data=='noInput')
				if(data[0] == "noInput"){
					setNoInput();
				} else if (data[0] == "noBrand"){
					setNoBrand();
				}else {
					setData(data);
					setBrand();
					setRadar();

					$('html, body').animate({
						scrollTop: $("#all_canvas").offset().top
					}, 1);

				}
			},
			beforeSend: function(){
            	console.log('loading');
            	document.getElementById('noData').innerHTML = '';
				$('#loading').show();
				$('#loading_br').show();
			},
			complete: function(){
            	console.log('OK!!');
            	$('#loading').hide();
				$('#loading_br').hide();
			}
		});
    });

});

var data;

function setNoInput(){
	document.getElementById('noData').innerHTML = '<p>請輸入要查詢的品牌！</p>';
}

function setNoBrand(){
	document.getElementById('noData').innerHTML = '<p>很抱歉，查無此品牌！</p>';
}


function setData(alldata){
	data = alldata;
}

function setBrand(){
	brand = data[0]['name'];
	console.log(data);
	document.getElementById('brand_name').style="width:20vw;height:80vh;display:inline-block; vertical-align:top";
	document.getElementById('brand_name').innerHTML = '<h2 align="center" style="font-size: 48px"><u><b>'+ brand + '</b></u></h2><br>';
	document.getElementById('brand_name').innerHTML += '<ul align="center"><button id="rador_canvas" class="button alt" onclick="setRadar()">情緒雷達</button></ul>';
	document.getElementById('brand_name').innerHTML += '<ul align="center"><button id="line_canvas" class="button alt" onclick="setLineFirst()">歷史波動</button></ul>';
	document.getElementById('brand_name').innerHTML += '<ul align="center"><button id="CA_canvas" class="button alt" onclick="setCA()">品牌地圖</button></ul>';
	document.getElementById('brand_name').innerHTML += '<ul align="center"><button id="cloud_canvas" class="button alt" onclick="setCloud()">熱門關鍵字</button></ul>';


}

function setRadar(){
	document.getElementById('line_choose').innerHTML = '';
	document.getElementById('chartControl').style="width:70vw;height:80vh;display:inline-block;vertical-align:center";
	document.getElementById('chart').innerHTML = '<canvas id="myChart_radar" align="right"></canvas>';

	Chart.defaults.global.defaultFontFamily = '微軟正黑體';
	console.log(data);
	var dataList = data[0]['radar']
	var max = Math.max(...data[0]['radar']);
	var min = Math.min(...data[0]['radar']);
	var step = (Math.max(...data[0]['radar']) - Math.min(...data[0]['radar']))/5;
	console.log(max,min,step);

	var ctx_radar = document.getElementById('myChart_radar').getContext('2d');
	var myRadarChart = new Chart(ctx_radar, {
		type: 'radar',
		data:   {
					labels: ['鞋履外型與質感', '網路行銷與社群', '銷售與買賣', '製鞋技術與科技','風格設計與特色'],
					datasets: [{
						// fontColor: '#ffffff',
						borderColor:  'rgba(33,80,100,0.5)',
						backgroundColor: 'rgba(33,80,100,0.5)',
						// borderColor:  '#6cc091',
						// backgroundColor: 'rgba(108,192,145,0.9)',

						data: dataList
					 }]
				},
		options: {
				title: {
					display: true,
					fontSize: 30,
					padding: 30,
					lineHeight: 1.5,
					text: '情緒雷達'
				},
				legend: {
					display: false,
				},
				plugins: {
					datalabels: {
						display: false,
					}
				},
				scale: {
					// gridLines: {
					// 	color: '#ffffff',
					// },
					// angleLines:{
					// 	color: '#ffffff',
					// },
					display: true,
					pointLabels:{
						// display: false,
						// fontColor: '#ffffff',
						fontSize:20,
					   fontStyle:"bold",
					},
					 ticks: {
						display:false,
						max: max,
						min: min-step,
						stepSize: step
					}

				}


		}
		});

}

function setLineFirst(){
	document.getElementById('line_choose').innerHTML = '';
	setLineDate(2019,2019,'每月')
	setLineCheck()
}

function setLineDate(start,end,dateUnit){
	let list = data[0]['line']
	let articleDate = list[0]
	let scoreAll = list[1]
	let scoreZero = list[2]
	let scoreOne = list[3]
	let scoreThree = list[4]
	let scoreFour = list[5]
	let scoreFive = list[6]
	let lineData = [[],[],[],[],[],[],[]]

	let inputStartYear = parseInt(start);
	let inputUnit = dateUnit;
	let inputEndYear = parseInt(end);

	console.log(inputEndYear)

	let years = []
	let yearmonths = []
	let fraction = []
	let unit = []
	for (let i=inputStartYear;i<=inputEndYear;i++){

		years.push(i.toString())
	}

	for (let i=0;i<years.length;i++){
		if (inputUnit == "每月"){
			unit = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
		}else if (inputUnit == "每季"){
			unit = ["03", "06", "09", "12"];
		}else if (inputUnit == "每半年") {
			unit = ["06", "12"];
		}
		for (let u=0;u<unit.length;u++) {
			yearmonths.push(years[i] + "-" + unit[u])
		}
	}

	for(let i=0;i<yearmonths.length;i++){
		let index = articleDate.indexOf(yearmonths[i])
		lineData[0].push(articleDate[index])
		lineData[1].push(scoreAll[index])
		lineData[2].push(scoreZero[index])
		lineData[3].push(scoreOne[index])
		lineData[4].push(scoreThree[index])
		lineData[5].push(scoreFour[index])
		lineData[6].push(scoreFive[index])
	}

	console.log(yearmonths)
	setLine(lineData)
	// setUnit(inputUnit)
}


function setLine(lineData){

	document.getElementById('chartControl').style="width:70vw;height:60vh;display:inline-block";
	document.getElementById('chart').innerHTML = '<canvas id="myChart_line" align="right" ></canvas><br>';

	console.log('check')
	Chart.defaults.global.defaultFontFamily = '微軟正黑體';

	var ctx_line = document.getElementById('myChart_line').getContext('2d');
	var myLineChart = new Chart(ctx_line, {
					type: 'line',
					data: {labels: lineData[0],
							datasets:[{
									label:'總體',
									borderColor:  'rgba(70,169,212,0.5)',
									backgroundColor: 'rgba(70,169,212,0.5)',
									fill: false,
									lineTension: 0,
									data: lineData[1]
							},{
									label:'外型質感',
									borderColor:  'rgba(199,0,2,0.5)',
									backgroundColor: 'rgba(199,0,2,0.5)',
									fill: false,
									lineTension: 0,
									data: lineData[2]
							},{
									label:'行銷社群',
									borderColor:  'rgba(198,124,0,0.5)',
									backgroundColor: 'rgba(198,124,0,0.5)',
									fill: false,
									lineTension: 0,
									data: lineData[3]
							},{
									label:'銷售販賣',
									borderColor:  'rgba(108,190,0,0.5)',
									backgroundColor: 'rgba(108,190,0,0.5)',
									fill: false,
									lineTension: 0,
									data: lineData[4]
							},{
									label:'製鞋技術',
									borderColor:  'rgba(0,196,138,0.5)',
									backgroundColor: 'rgba(0,196,138,0.5)',
									fill: false,
									lineTension: 0,
									data: lineData[5]
							},{
									label:'風格特色',
									borderColor:  'rgba(73,0,192,0.5)',
									backgroundColor: 'rgba(73,0,192,0.5)',
									fill: false,
									lineTension: 0,
									data: lineData[6]
							}]
					},
					options: {
						legend: {
							labels: {
								fontSize: 15,
							}
						},
						responsive: true,
						title: {
							display: true,
							fontSize: 30,
							padding: 15,
							lineHeight: 1.5,
							text: '歷史波動'
						},
						plugins: {
							datalabels: {
								display: false,
							}
						},
						scales: {
							xAxes:[{
								ticks:{
									fontSize: 15
								},
								scaleLabel:{
									display: true,
									labelString: '年月份',
									fontSize: 15
								}
							}],
							yAxes: [{
								ticks:{
									display:false
								},
								scaleLabel:{
									display: true,
									labelString: '情緒分數',
									fontSize: 15
								}
							}],
						},
						tooltips: {
							displayColors: false,
						}

						}
				});


}

function setLineCheck(){

	document.getElementById('line_choose').innerHTML = '首年：<div class="select-wrapper" style="width: 12.5%;display: inline-block">' +
	'<select name="line_startyear" id="line_startyear" onchange="getStart(this)">' +
	'<option value="2019">2019</option>' +
	'<option value="2018">2018</option>' +
	'<option value="2017">2017</option>' +
	'<option value="2016">2016</option>' +
	'<option value="2015">2015</option>' +
	'<option value="2014">2014</option>' +
	'<option value="2013">2013</option>' +
	'</select>' +
	'</div>　'
	document.getElementById('line_choose').innerHTML += '末年：<div class="select-wrapper" style="width: 12.5%;display: inline-block">' +
	'<select name="line_endyear" id="line_endyear" onchange="getEnd(this)">' +
	'<option value="2019">2019</option>' +
	'<option value="2018">2018</option>' +
	'<option value="2017">2017</option>' +
	'<option value="2016">2016</option>' +
	'<option value="2015">2015</option>' +
	'<option value="2014">2014</option>' +
	'<option value="2013">2013</option>' +
	'</select>' +
	'</div></div>　'
	document.getElementById('line_choose').innerHTML += '<div style="display:inline-block;">' +
		'<input type="radio" id="line_month" name="line_unit" onclick="getUnit(\'每月\')" value="每月" checked>' +
		'<label for="line_month">每月</label>' +
		'<input type="radio" id="line_season" name="line_unit" onclick="getUnit(\'每季\')" value="每季">' +
		'<label for="line_season">每季</label>' +
		'<input type="radio" id="line_halfyear" name="line_unit" onclick="getUnit(\'每半年\')" value="每半年">' +
		'<label for="line_halfyear">每半年</label>' +
		'</div>'

	// document.getElementById('line_startyear').setAttribute('onchange', 'setLineDate('+ $('#line_startyear').val() + ',' + $('#line_endyear').val() + ',\'每季\')')


}

function getStart(selectObject) {
	var value = selectObject.value;
	setLineDate(value,$('#line_endyear').val(),$('input[name=\'line_unit\']:checked').val());
}
function getEnd(selectObject) {
	var value = selectObject.value;
	setLineDate($('#line_startyear').val(),value,$('input[name=\'line_unit\']:checked').val());
}
function getUnit(unit){
	setLineDate($('#line_startyear').val(),$('#line_endyear').val(),unit)
}

function setUnit(inputUnit){
	if (inputUnit == "每月"){
			$("#line_month").attr("checked",true);
		}else if (inputUnit == "每季"){
			$("#line_season").attr("checked",true);
		}else if (inputUnit == "每半年") {
			$("#line_halfyear").attr("checked",true);
		}
}

function setCA(){
	// setPosition();
	// setChart();
	document.getElementById('line_choose').innerHTML = '';
	document.getElementById('chartControl').style="width:70vw;height:80vh;display:inline-block";
	document.getElementById('chart').innerHTML = '<canvas id="myChart_CA" align="right"></canvas>';

	Chart.defaults.global.defaultFontFamily = '微軟正黑體';
	// console.log('test_ca');

	brand_xy = []
	input_xy = []
	topic_pos_xy = []
	topic_neg_xy = []
	for (var i = 0; i < data[0]['brand'].length-1; i++) {
				brand_xy.push({
					x: data[0]['brand'][i][0],
					y: data[0]['brand'][i][1]
				});
			}
	input_xy.push({
					x: data[0]['brand'][data[0]['brand'].length-1][0],
					y: data[0]['brand'][data[0]['brand'].length-1][1]
				});
	for (var i = 0; i < data[0]['topic_pos'].length; i++) {
				topic_pos_xy.push({
					x: data[0]['topic_pos'][i][0],
					y: data[0]['topic_pos'][i][1]
				});
			}
	for (var i = 0; i < data[0]['topic_neg'].length; i++) {
				topic_neg_xy.push({
					x: data[0]['topic_neg'][i][0],
					y: data[0]['topic_neg'][i][1]
				});
			}
	// console.log(data[0]['input']);

	var ctx_CA = document.getElementById('myChart_CA').getContext('2d');
	var myBubbleChart = new Chart(ctx_CA, {
		type: 'bubble',
		data: {
			topic_pos_labels: ['外型質感+', '行銷社群+', '銷售買賣+','製鞋技術+', '風格特色+'],
			topic_neg_labels: ['外型質感-', '行銷社群-', '銷售買賣-','製鞋技術-', '風格特色-'],
			brand_labels: data[0]['input'],
			datasets:[{
				label: '分析品牌',
				width: 5,
				borderColor:  'rgb(255,189,0)',
				borderWidth: 3,
				backgroundColor: 'rgba(255,189,0,0.5)',
				data: input_xy,
				datalabels: {
					display: true,
					align:'left',
					color:'red',
					font: {
						size: '23',
					},
					formatter: function(value, context) {
						return data[0]['input'][data[0]['input'].indexOf(data[0]['name'])];
					}
				}
			},{
				label: '其他品牌',
				borderColor:  'rgba(33,80,100,0.5)',
				borderWidth: 3,
				backgroundColor: 'rgba(33,80,100,0)',
				// borderColor:  '#6cc091',
				// backgroundColor: 'rgba(108,192,145,0.9)',
				data: brand_xy,
				datalabels: {
					display: false,
					align:'left',
					fontColor:'#ffffff',
					formatter: function(value, context) {
						return context.chart.data.brand_labels[context.dataIndex];
					}
				}
			},
			{
				label: '正向評價',
				borderColor: 'rgba(67,170,0,0.8)',
				backgroundColor: 'rgba(67,170,0,0.5)',
				borderWidth: 3,
				data: topic_pos_xy,
					datalabels: {
						font: {
							size: '15',
						},
						align:'right',
						// color :'#ffffff',
						formatter: function(value, context) {
							return context.chart.data.topic_pos_labels[context.dataIndex];
					}
				}
			},
			{
				label: '負向評價',
				borderColor:  'rgba(158,14,34,0.8)',
				backgroundColor: 'rgba(158,14,34,0.5)',
				borderWidth: 3,
				data: topic_neg_xy,
					datalabels: {
						font: {
							size: '15',
						},
						align:'right',
						// color :'#ffffff',
						formatter: function(value, context) {
							return context.chart.data.topic_neg_labels[context.dataIndex];
					}
				}
			}]

		},
		options:{
					legend: {
						labels: {
							fontSize: 15,
						}
					},
			responsive: true,
			title: {
				display: true,
				fontSize: 30,
				padding: 15,
				lineHeight: 1.5,
				text: '品牌地圖'
			},
			tooltips: {
				displayColors:false,
				// backgroundColor: 'rgba(0, 0, 0, 0.8)',
				// bodyFontColor: 'rgba(0, 0, 0, 1)',
				filter: function (tooltipItem) {
            		return tooltipItem.datasetIndex === 1;
        		},
				plugins: {
					datalabels: {
						display:'auto',
						labels: {
							title: {
								font: {
									// fontColor:'#ffffff',
									weight: 'bold'
								},
								// display: 'auto',
							},
							value: {
								// color: 'green'
							}
						}
					}
				},

				// position: 'nearest',
				callbacks: {

					label: function(tooltipItem, data) {
						if(tooltipItem.datasetIndex == 1){
							var label = data.brand_labels[tooltipItem.index];
						}
						// console.log(tooltipItem);
					   return label
					}


				}
		  	}


		}
	});

}

function setCloud(){
	src = data[0]['cloud'];
	document.getElementById('line_choose').innerHTML = '';
	document.getElementById('chartControl').style="width:70vw;height:80vh;display:inline-block;overflow: hidden;";
	document.getElementById('chart').innerHTML = '<img id="myChart_cloud" class="popOver" style="margin:-15% 0 0 0 " src="'+ src +'"></img>';

}

