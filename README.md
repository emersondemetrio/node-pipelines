# Node pipeline experimenting

Experimenting with node [pipelines](https://www.geeksforgeeks.org/node-js-stream-pipeline-method/) and read/write streams.

## Some results

```bash

# Processing a csv file with 100.000 lines

➜  node-pipelines git:(main) yarn bootstrap 100000
yarn run v1.22.22
$ ./scripts/create-large-file.sh 100000
Creating a file with 100000 lines...

Lines created:   100000
✨  Done in 0.63s.


➜  node-pipelines git:(main) ✗ time node pipeline.js
Pipeline succeeded
node pipeline.js  0.10s user 0.02s system 100% cpu 0.125 total
```

## How to:

Create a large file:

```sh
yarn bootstrap N # N=1000000 by default
```

```sh
cat data/large-file.txt

This is a line in a large file. 99973
This is a line in a large file. 99974
This is a line in a large file. 99975
This is a line in a large file. 99976
```

Run the experiments:

```
yarn start
```

Check the results:

```sh
cat data/output.txt (line number transform)

This is a line in a large file. 2024-07-31T12:14:37.398Z
This is a line in a large file. 2024-07-31T12:14:37.398Z
This is a line in a large file. 2024-07-31T12:14:37.398Z
This is a line in a large file. 2024-07-31T12:14:37.398Z
```

```sh
cat data/output.txt (human date transform)

This is a line in a large file. 2024-07-31 12:36:09
This is a line in a large file. 2024-07-31 12:36:09
This is a line in a large file. 2024-07-31 12:36:09
This is a line in a large file. 2024-07-31 12:36:09
```

```js
// Transform can be any function with any input, in this case,
// replaces all <numbers> with the current date:
const transformLineNumberIntoDate = new Transform({
	transform(chunk, _, callback) {
		const transformedData = chunk
			.toString()
			.replace(numberGroupRegex, new Date().toISOString());

		callback(null, transformedData);
	},
});

// Transform date str into human date:
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
```

Have fun!

### Acknowledges

Inspired by [this video](https://www.linkedin.com/posts/mapocock_ever-heard-of-pipeline-in-node-its-a-activity-7224350269797507072-3uT_/?utm_source=share&utm_medium=member_desktop) by [@mattpocock](https://github.com/mattpocock)
