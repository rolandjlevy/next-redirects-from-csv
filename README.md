# Build Next.js redirects from a CSV file

- This app writes a list of redirects from a CSV file to an output file. This gets imported into next.config.js where all redirects are handled in Next.js.
- Node's readline module is used to provide an interface for reading data from a readable stream, one line at a time.

### Instructions

1. Upload a CSV file named redirects.csv to /server/build-redirects. Each row should have the old url followed by the new url as follows:

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
- [app is based on this repo](https://github.com/kaimanaagency/pixels-next-redirects)
- [setting up Express in Next](https://www.youtube.com/watch?v=kmrJkrW-ha0&ab_channel=skell)
- [readline module from the docs](https://nodejs.org/api/readline.html)
- [How to use the readline module](https://gist.github.com/initlove/2478016)

### Notes

> Promise-based solution for readLines function which wasn't used in the end. See [example on stackoverflow](https://stackoverflow.com/questions/69811324/how-can-i-make-a-readline-await-async-promise)

<details>
  <summary>See the code</summary>
  
```js
const readLines = async (file) => {
  const result = []
  const lineReader = readline.createInterface({
    input: fs.createReadStream(file),
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