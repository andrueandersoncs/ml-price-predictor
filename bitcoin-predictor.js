const brain = require('brain.js')
const network = new brain.recurrent.GRUTimeStep({
	inputSize: 6,
	hiddenLayers: [10, 10, 10],
	outputSize: 6
})

const csv = require('csv-parser');
const fs = require('fs');

const trainingData = []

fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (row) => {
		// Time,Open,High,Low,Last,Change,Volume
		console.log(row)
    trainingData.unshift(row)
  })
  .on('end', () => {
		// console.log('CSV file successfully processed');
		const values = trainingData.map(data => Object.values(data).slice(-6).map(Number))
		const maxes = values.reduce((maxes, day) => day.map((value, index) => Math.max(value, maxes[index])), [0, 0, 0, 0, 0, 0])
		const normalizedValues = values.map(day => day.map((value, index) => value / maxes[index]))
		// console.log('values', values, maxes)
		// console.log('normalized values', normalizedValues)
		network.train(normalizedValues, { iterations: 10000 })
		const result = network.forecast(normalizedValues, 3)
		const denormalizedResult = result.map(day => day.map((value, index) => value * maxes[index]))
		console.log(denormalizedResult)
	});

