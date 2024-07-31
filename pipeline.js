const { Transform, pipeline } = require('stream');
const { createReadStream, createWriteStream } = require('fs');

// read file as stream:
const readLargeFile = createReadStream('./data/large-file.txt');

// write file as stream:
const writeResultFile = createWriteStream('./data/output.txt');

const numberGroupRegex = /\d+/g;
const dateRegex = /(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2}):(\d{2})\.\d{3}Z/g;

// removes all numbers from the file and replace with the current date.
const transformLineNumberIntoDate = new Transform({
	transform(chunk, _, callback) {
		const transformedData = chunk
			.toString()
			.replace(numberGroupRegex, new Date().toISOString());

		callback(null, transformedData);
	},
});

const transformDateIntoHumanDate = new Transform({
	transform(chunk, _, callback) {
		const transformedData = chunk
			.toString()
			.replace(dateRegex, (_, date, hours, minutes, seconds) => {
				const formattedDate = `${date} ${hours}:${minutes}:${seconds}`;
				return formattedDate;
			});

		callback(null, transformedData);
	},
});

(async function run() {
	pipeline(
		readLargeFile,
		transformLineNumberIntoDate,
		transformDateIntoHumanDate,
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
