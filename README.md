# Node pipeline experimenting

Experimenting with node [pipelines](https://www.geeksforgeeks.org/node-js-stream-pipeline-method/) and read/write streams.

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
This is a line in a large file. 99977
This is a line in a large file. 99978
This is a line in a large file. 99979
```

Run the experiments:

```
yarn start
```

Check the results:

```sh
cat data/output.txt

This is a line in a large file. 2024-07-31T12:14:37.398Z
This is a line in a large file. 2024-07-31T12:14:37.398Z
This is a line in a large file. 2024-07-31T12:14:37.398Z
This is a line in a large file. 2024-07-31T12:14:37.398Z
This is a line in a large file. 2024-07-31T12:14:37.398Z
```

```js
// Transform can be any function with any input, in this case,
// replaces all <numbers> with the current date:
const replaceLineNumberWithCurrentDate = new Transform({
	transform(chunk, _, callback) {
		const transformedData = chunk
			.toString()
			.replace(numberGroupRegex, new Date().toISOString());

		callback(null, transformedData);
	},
});
```

Have fun!

### Acknowledges

Inspired by [this video](https://www.linkedin.com/posts/mapocock_ever-heard-of-pipeline-in-node-its-a-activity-7224350269797507072-3uT_/?utm_source=share&utm_medium=member_desktop) by [@mattpocock](https://github.com/mattpocock)
