const brain = require('brain.js')
const network = new brain.NeuralNetwork()

const normalizeString = str => str.split().map(char => char.charCodeAt(0) / (2 ** 8))

const trainingData = [
	{ input: 'This is some important shit right here. Doctor!', output: { importance: 1 } },
	{ input: 'Complete rubbish, absolutely unhelpful.', output: { importance: 0 } },
	{ input: 'Another example of something that works. Medicine!', output: { importance: 1 } },
	{ input: 'VERY IMPORTANT MEDICAL INFO!! DO NOT MISS!', output: { importance: 1 } },
	{ input: 'Yea this isnt too imporant tbh.', output: { importance: 0 } },
	{ input: 'This should not be important at all', output: { importance: 0 } }
]

network.train(trainingData.map(data => ({ input: normalizeString(data.input), output: data.output})))

const inputs = [
	'This should not be important at all',
	'This is extremely important, please pay close attention',
	'Wait wut?',
	'Yea this isnt too imporant tbh.',
	'Medicine, bitches! even more stuff that im blah!'
]

const results = inputs.map(input => network.run(normalizeString(input)))

console.log(results)
