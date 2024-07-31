const { Transform, pipeline } = require('stream');
const { createReadStream, createWriteStream } = require('fs');

// read file as stream:
const readLargeFile = createReadStream('./data/large-file.txt');

// write file as stream:
const writeResultFile = createWriteStream('./data/output.txt');

const numberGroupRegex = /\d+/g;

// removes all numbers from the file and replace with the current date.
const replaceLineNumberWithCurrentDate = new Transform({
	transform(chunk, _, callback) {
		const transformedData = chunk
			.toString()
			.replace(numberGroupRegex, new Date().toISOString());

		callback(null, transformedData);
	},
});

(async function run() {
	pipeline(
		readLargeFile,
		replaceLineNumberWithCurrentDate,
		writeResultFile,
		(err) => {
			if (err) {
				console.error('Pipeline failed', err);
			} else {
				console.log('Pipeline succeeded');
			}
		}
	);
})();
