//basic setup for Chart.js

//Canvas setup
let myChart = document.getElementById('myChart').getContext('2d')
let delayed //For animation
let typeOfCharts = document.querySelector('.typeOfCharts')
let gradient = myChart.createLinearGradient(0, 0, 0, 400)
gradient.addColorStop(0, 'rgba(58,123,213,1)')
gradient.addColorStop(1, 'rgba(0,210,255,0.3)')
let defaultColor = [
	//How to deal with color?
	'rgba(54,162,235,0.6)',
	'rgba(255,206,86,0.6)',
	'rgba(75,192,192,0.6)',
	'rgba(153,102,255,0.6)',
	'rgba(255,159,64,0.6)',
	'rgba(255,99,132,0.6)'
]

//category on X axis.
//line chart label
let labels = [
	'Boston',
	'Worcester',
	'Springfield',
	'Lowell',
	'Cambridge',
	'New Bedford'
]

//the data we need.
let data = {
	labels,
	datasets: [
		{
			data: [617594, 181045, 153060, 106519, 105162, 95072],
			label: 'Turnover',
			fill: true, //fill color
			backgroundColor: defaultColor, //see upper section
			borderColor: '#fff',
			pointBackgroundColor: '#000', //for the pinnacle color on line chart
			barThickness: 100
			/* tension: 0.4 //make a curved line */
		}
	]
}

//type: 'bar',
//decide what chart we are going to use.
let pieConfig = {
	type: 'pie',
	data: data, //took data from above.
	options: {
		plugins: {
			title: {
				//chart title: https://www.chartjs.org/docs/latest/configuration/title.html
				display: true,
				text: 'District Turnover',
				font: { size: 30 },
				padding: {
					top: 10,
					bottom: 30
				}
			},
			legend: {
				display: false
			}
		},

		animation: {
			onComplete: () => {
				delayed = true
			},
			delay: (context) => {
				let delay = 0
				if (
					context.type === 'data' &&
					context.mode === 'default' &&
					!delayed
				) {
					delay = context.dataIndex * 300 + context.dataIndex * 100
				}
				return delay
			}
		},

		
	}
}

let config = {
	type: 'bar',
	data: data, //took data from above.
	options: {
		//radius: 3, //for the pinnacle on line chart //<=affected pie chart, doughnut
		hitRadius: 30,
		pointHoverRadius: 8, // make the pinnacle bigger
		responsive: true, //size-responsive

		plugins: {
			title: {
				//chart title: https://www.chartjs.org/docs/latest/configuration/title.html
				display: true,
				text: 'District Turnover',
				font: { size: 30 },
				padding: {
					top: 10,
					bottom: 30
				}
			},
			legend: {
				display: false
			}
		},

		animation: {
			onComplete: () => {
				delayed = true
			},
			delay: (context) => {
				let delay = 0
				if (
					context.type === 'data' &&
					context.mode === 'default' &&
					!delayed
				) {
					delay = context.dataIndex * 300 + context.dataIndex * 100
				}
				return delay
			}
		},

		scales: {
			//^= Should't not show on pie chart, doughnut,polarArea, radar
			y: {
				//put units like $, people, pieces on y axis.
				ticks: {
					callback: (value) => '$' + value
				}
			}
		}
	}
}

let chart = new Chart(myChart, config) //Load all the things out.

//Adding and removing data
let updateLabel = document.querySelector('.category')
let updateData = document.querySelector('.data')

function addData() {
	chart.data.labels.push(updateLabel.value)
	chart.data.datasets.forEach((dataset) => {
		dataset.data.push(updateData.value * 1)
	})
	chart.update()
}

function removeData() {
	chart.data.labels.pop()
	chart.data.datasets.forEach((dataset) => {
		dataset.data.pop()
	})
	chart.update()
}
//District Turnover
document
	.querySelector('.districtTurnover')
	.addEventListener('click', function () {
		typeOfCharts.innerHTML = ''
		typeOfCharts.innerHTML = `<option value="0">Bar Chart</option>
		<option value="2">Doughnut Chart</option>
		<option value="3">Pie Chart</option>
		<option value="4">Polar Area Chart</option>
		<option value="5">Radar Chart</option>
		`
		typeOfCharts = document.querySelector('.typeOfCharts')
		
		chart.destroy()
		chart = new Chart(myChart, config)
	})

//Department Turnover chart
document
	.querySelector('.departmentTurnover')
	.addEventListener('click', function () {
		departmentName = []
		departmentTurnover = []
		typeOfCharts.innerHTML = ''
		typeOfCharts.innerHTML = `<option value="0">Bar Chart</option>
		<option value="2">Doughnut Chart</option>
		<option value="3">Pie Chart</option>
		<option value="4">Polar Area Chart</option>
		<option value="5">Radar Chart</option>
		`
		typeOfCharts = document.querySelector('.typeOfCharts')
		departmentTurnoverChart()
	})

let departmentName = [],
	departmentTurnover = []

async function getDepartmentData() {
	try {
		const res = await fetch('/departmentData')
		const data = await res.json()
		for (let departmentData of data) {
			departmentName.push(departmentData.department_name)
			departmentTurnover.push(departmentData.department_turnover)
		}
	} catch (err) {
		console.log(err)
	}
}

async function departmentTurnoverChart() {
	await getDepartmentData()
	let departmentData = {
		labels: departmentName,
		datasets: [
			{
				data: departmentTurnover,
				label: 'Turnover',
				fill: true, //fill color
				backgroundColor: defaultColor, //see upper section
				borderColor: '#fff',
				pointBackgroundColor: '#000' //for the pinnacle color on line chart
			}
		]
	}

	let departmentTurnoverConfig = {
		type: 'bar',
		data: departmentData, //took data from above.
		options: {
			//radius: 3, //for the pinnacle on line chart //<=affected pie chart, doughnut
			hitRadius: 30,
			pointHoverRadius: 8, // make the pinnacle bigger
			responsive: true, //size-responsive
			plugins: {
				title: {
					//chart title: https://www.chartjs.org/docs/latest/configuration/title.html
					display: true,
					text: 'Department Turnover',
					font: { size: 30 },
					padding: {
						top: 10,
						bottom: 30
					}
				},
				legend: {
					display: false
				}
			},
			scales: {
				//^= Should't not show on pie chart, doughnut,polarArea,radar
				y: {
					//put units like $, people, pieces on y axis.
					ticks: {
						callback: (value) => '$' + value
					}
				}
			}
		}
	}
	chart.destroy()
	chart = new Chart(myChart, departmentTurnoverConfig)
	typeOfCharts.value = 0
}

//Employee API chart
document
	.querySelector('.employeePerformance')
	.addEventListener('click', function () {
		typeOfCharts.innerHTML = ''
		typeOfCharts.innerHTML = `<option value="0">Bar Chart</option>
		<option value="5">Radar Chart</option>
		`
		typeOfCharts = document.querySelector('.typeOfCharts')
		employeeChart()
	})

let employeeLabel = [], //Items of X axis
	employeeTurnoverData = [], //Dataset one
	employeeAgeData = [] //Dataset two

async function getEmployeeData() {
	try {
		const res = await fetch('/employeeData') //< 依條係ts入面既route
		const data = await res.json() //要將data轉成json格式先讀到
		/* console.log(data[0].username) */ //data入面第一個人既名
		for (let personalData of data) {
			employeeLabel.push(personalData.username) //loop入面所有data，逐個push上我要用既array
			employeeTurnoverData.push(personalData.personal_turnover)
			employeeAgeData.push(personalData.age)
		}
	} catch (err) {
		console.log(err)
	}
}

async function employeeChart() {
	await getEmployeeData()

	let employeeData = {
		labels: employeeLabel,
		datasets: [
			{
				data: employeeTurnoverData,
				label: 'Turnover',
				fill: true, //fill color
				backgroundColor: 'blue', //see upper section
				borderColor: '#fff',
				pointBackgroundColor: '#000' //for the pinnacle color on line chart
			},
			{
				data: employeeAgeData,
				label: 'Age',
				fill: true, //fill color
				backgroundColor: 'pink', //see upper section
				borderColor: '#fff',
				pointBackgroundColor: '#000' //for the pinnacle color on line chart
			}
		]
	}

	let employeeDataConfig = {
		type: 'bar',
		data: employeeData, //took data from above.
		options: {
			//radius: 3, //for the pinnacle on line chart //<=affected pie chart, doughnut
			hitRadius: 30,
			pointHoverRadius: 8, // make the pinnacle bigger
			responsive: true, //size-responsive
			plugins: {
				title: {
					//chart title: https://www.chartjs.org/docs/latest/configuration/title.html
					display: true,
					text: 'Employee Performance',
					font: { size: 30 },
					padding: {
						top: 10,
						bottom: 30
					}
				}
			},
			scales: {
				//^= Should't not show on pie chart, doughnut,polarArea,radar
				y: {
					//put units like $, people, pieces on y axis.
					ticks: {
						callback: (value) => '$' + value
					}
				}
			}
		}
	}
	chart.destroy()
	employeeLabel = []
	employeeTurnoverData = []
	employeeAgeData = []
	chart = new Chart(myChart, employeeDataConfig)
	typeOfCharts.value = 0
}

//NetProfit Chart
document.querySelector('.netProfit').addEventListener('click', function () {
	document.querySelector('.typeOfCharts').classList.add('hidden')
	typeOfCharts.innerHTML = ''
	typeOfCharts = document.querySelector('.typeOfCharts')
	getNetProfitDataX = []
	getNetProfitDataY = []
	netProfitChart()
})

let getNetProfitDataX = [],
	getNetProfitDataY = []

async function netProfitChart() {
	await getNetProfitData()

	let netProfit = {
		labels: getNetProfitDataX,
		datasets: [
			{
				data: getNetProfitDataY,
				label: 'Net Profit',
				fill: true, //fill color
				backgroundColor: defaultColor, //see upper section
				borderColor: '#fff',
				pointBackgroundColor: '#000' //for the pinnacle color on line chart
			}
		]
	}

	let netProfitDataConfig = {
		type: 'line',
		data: netProfit, //took data from above.
		options: {
			//radius: 3, //for the pinnacle on line chart //<=affected pie chart, doughnut
			hitRadius: 30,
			pointHoverRadius: 8, // make the pinnacle bigger
			responsive: true, //size-responsive
			plugins: {
				title: {
					//chart title: https://www.chartjs.org/docs/latest/configuration/title.html
					display: true,
					text: 'Net profit in the last 5 months ',
					font: { size: 30 },
					padding: {
						top: 10,
						bottom: 30
					}
				}
			},
			scales: {
				//^= Should't not show on pie chart, doughnut,polarArea,radar
				y: {
					//put units like $, people, pieces on y axis.
					ticks: {
						callback: (value) => value + 'K'
					}
				}
			}
		}
	}
	chart.destroy()
	chart = new Chart(myChart, netProfitDataConfig)
	typeOfCharts.value = 1
}

async function getNetProfitData() {
	const APIkey = '1FSCKOS73ZRQNTYM'
	let APIcall = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&outputsize=compact&apikey=${APIkey}`
	try {
		await fetch(APIcall)
			.then((response) => {
				return response.json()
			})
			.then(
				await function (data) {
					for (let key in data['Time Series (Daily)']) {
						getNetProfitDataX.unshift(key)
						getNetProfitDataY.push(
							data['Time Series (Daily)'][key]['1. open']
						)
					}
				}
			)
	} catch (err) {
		console.log(err)
	}
}

//Changing Chart
//We could use bar chart, horizontal bar, pie, line, doughnut, radar etc.
//Change Chart Function
typeOfCharts.addEventListener('click', function () {
	changeChart()
})
function changeChart() {
	//有無得精簡D?
	if (typeOfCharts.value == 0) {
		const updateType = 'bar'
		chart.config.type = updateType
		chart.update()
	}

	if (typeOfCharts.value == 1) {
		const updateType = 'line'
		chart.config.type = updateType
		chart.update()
	}

	if (typeOfCharts.value == 2) {
		const updateType = 'doughnut'
		chart.config.type = updateType
		chart.update()
	}

	if (typeOfCharts.value == 3) {
		const updateType = 'pie'
		chart.config.type = updateType
		chart.update()
	}

	if (typeOfCharts.value == 4) {
		const updateType = 'polarArea'
		chart.config.type = updateType
		chart.update()
	}

	if (typeOfCharts.value == 5) {
		const updateType = 'radar'
		chart.config.type = updateType
		chart.update()
	}
}

