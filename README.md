# Build Next.js redirects from a CSV file

- This app writes a list of redirects from a CSV file to an output file. This gets imported into next.config.js where redirects are handled in Next.js.
- Node's readline module is used to provide an interface for reading data from a readable stream, one line at a time.

### Instructions
1. Upload a CSV file named redirects.csv to /server/build-redirects. The first row is a header and gets skipped. Each row should have the old url followed by the new url as follows:

| old url   | new url                    |
|:----------|:---------------------------|
| /cromwell | https://www.cromwell.co.uk | 
| /google   | https://google.com         | 
| /next     | https://nextjs.org         | 

2. Run this in the terminal
```bash
npm run build-redirects
```
3. Restart Next.js to see the redirects working

### Links  
- [Next redirects docs](https://nextjs.org/docs/api-reference/next.config.js/redirects)
- [This app is based on this repo](https://github.com/kaimanaagency/pixels-next-redirects)
- [How to set up Express in Next.js](https://www.youtube.com/watch?v=kmrJkrW-ha0&ab_channel=skell)
- [readline module explained in the docs](https://nodejs.org/api/readline.html#readline)
- [How to use the readline module](https://gist.github.com/initlove/2478016)

### Notes
- [the crlfDelay option in createInterface](https://nodejs.org/api/readline.html#example-read-file-stream-line-by-line) is used to recognize all instances of CR LF which are control characters and used to mark a line break in a text file
- Below is the promise-based solution for the readLines function which wasn't used in the end. See [example on stackoverflow](https://stackoverflow.com/questions/69811324/how-can-i-make-a-readline-await-async-promise)

<details>
  <summary>View promise-based solution</summary>
  
```js
const readLines = async (file) => {
  const result = []
  const lineReader = rcreateInterface({
    input: createReadStream(file),
    crlfDelay: Infinity,
  });
  const promises = [];
  for await (const line of lineReader) {
    const parts = line.split(',');
    const promise = new Promise((resolve, reject) => {
      resolve(parts);
    });
    promises.push(promise);
  }
  return await Promise.all(promises);
}
```

</details>

> These commands have been added to package.json

```json
"scripts": {
  "dev": "node server/index.js",
  "build-redirects": "node server/build-redirects/index.js"
}
```