//点击导航，有下划线出来
function click() {
	var aA = document.getElementsByClassName('old');
	for (i = 0; i < aA.length; i++) {
		aA[i].index = i;
		aA[i].onclick = function(event) {
			this.className = 'new';
		}
	}
}
click();

//轮播图
function carousel() {
	var timer = null; //定时器
	var carousels = document.querySelector(".carousel");
	var wrap = document.querySelector(".wrap");
	var next = document.querySelector(".arrow_right");
	var prev = document.querySelector(".arrow_left");
	var index = 0;
	var dots = document.getElementsByTagName("span");
	next.onclick = function() {
		next_pic();
	}
	prev.onclick = function() {
		prev_pic();
	}
	//鼠标放在轮播图时停止轮播
	carousels.onmouseenter = function() {
		clearInterval(timer);
	}
	carousels.onmouseleave = function() {
		autoPlay();
	}
	
	function next_pic() {//点击去到下一张图片
		index++;
		if (index > 4) {
			index = 0;
		}
		showCurrentDot();
		var newLeft;
		if (wrap.style.left === "-3360px") {
			newLeft = -1120;
		} else {
			newLeft = parseInt(wrap.style.left) - 560;
		}
		wrap.style.left = newLeft + "px";
	}

	function prev_pic() {//点击回到上一张图片
		index--;
		if (index < 0) {
			index = 4;
		}
		showCurrentDot();
		var newLeft;
		if (wrap.style.left === "0px") {
			newLeft = -2240;
		} else {
			newLeft = parseInt(wrap.style.left) + 560;
		}
		wrap.style.left = newLeft + "px";
	}
	//自动播放
	function autoPlay() {
		timer = setInterval(function() {
			next_pic();
		}, 2000);
	}
	autoPlay();
	//小圆点随着图片的变动而变动
	function showCurrentDot() {
		for (var i = 0, len = dots.length; i < len; i++) {
			dots[i].className = "";
		}
		dots[index].className = "on";
	}
	for (var i = 0, len = dots.length; i < len; i++) {
		(function(i) {
			dots[i].onclick = function() {
				var dis = index - i;
				if (index == 4 && parseInt(wrap.style.left) !== -2240) {
					dis = dis - 5;
				}
				//和使用prev和next相同，在最开始的照片5和最终的照片1在使用时会出现问题，导致符号和位数的出错，做相应地处理即可
				if (index == 0 && parseInt(wrap.style.left) !== -560) {
					dis = 5 + dis;
				}
				wrap.style.left = (parseInt(wrap.style.left) + dis * 560) + "px";
				index = i;
				showCurrentDot();
			}
		})(i);
	}
}
carousel();

function curve() {//曲线数据展示
	var myChart = echarts.init(document.querySelector('.curve_show'));
	var option = {
		title: {
			text: "曲线图数据展示",
			left: "center",
			top: "25px",
			textStyle: {
				fontSize: 20
			},
			show: true
		},
		grid: {
			top: '30%',
			bottom: '10%',
			left: '5%',
			right: '5%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			boundaryGap: true,
			axisTick: {
				show: false
			},
			axisLine: {
				show: false
			},
			data: ['01/26', '01/28', '01/30', '02/01', '02/03', '02/05', '02/07', '02/09', '02/11', '02/13',
				'02/15', '02/17', '02/19', '02/21', '02/23'
			]
		},
		yAxis: {
			type: 'value',
			min: 0,
			max: 10000,
			splitLine: {
				lineStyle: {
					type: "dotted"
				},
				show: true
			}
		},
		series: [{
			data: [8972, 6448, 7458, 5824, 8123, 200, 300, 5310, 7483, 1435, 9426, 8187, 8297, 443, 9135],
			type: 'line',
			areaStyle: {},
			smooth: true,
			areaStyle: {
				color: "#F3F7FE"
			}
		}]
	};
	myChart.setOption(option);
}
curve();

function pie() {//饼状数据展示图
	var myChart = echarts.init(document.querySelector('.piechart_show'));
	var option = {
		title: {
			top: "25px",
			text: '饼状图数据展示',
			left: 'center'
		},
		tooltip: {
			trigger: 'item'
		},
		series: [{
			name: '访问来源',
			type: 'pie',
			top: '20%',
			radius: ["0%", "70%"],
			data: [{
					value: 100,
					name: 'Mon'
				},
				{
					value: 100,
					name: 'Tue'
				},
				{
					value: 60,
					name: 'Web'
				},
				{
					value: 40,
					name: 'Thu'
				},
				{
					value: 300,
					name: 'Fri'
				},
				{
					value: 200,
					name: 'Sat'
				},
				{
					value: 200,
					name: 'Sun'
				}
			],
			emphasis: {
				itemStyle: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}]
	}
	myChart.setOption(option);
}
pie();

function bar() {//柱状图数据展示
	var myChart = echarts.init(document.querySelector('.barchart_show'));
	var option = {
		color: ['#4586EF'],
		grid: {
			top: '30%',
			bottom: '10%',
			containLabel: true
		},
		title: {
			top: "25px",
			text: '柱状图数据展示',
			left: 'center'
		},
		xAxis: {
			type: 'category',
			axisTick: {
				show: false
			},
			axisLine: {
				show: false
			},
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
		},
		yAxis: {
			name: '商品数',
			type: 'value',
			min: 0,
			max: 15
		},
		series: [{
			data: [9, 11, 13, 10, 8, 11, 5],
			type: 'bar',
			barWidth: 20
		}]
	};
	myChart.setOption(option);
}
bar();
