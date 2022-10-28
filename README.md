# Build Next.js redirects from a CSV file

- This app builds a list of redirects from a comma separated CSV and writes it to an output file. This is imported into next.config.js where redirects are handled in Next.js.
- The readline module is used to provide an interface for reading data from a readable stream one line at a time.

### Instructions

1. Add the following to package.json
```json
"scripts": {
  "dev": "node server/index.js",
  "build-redirects": "node server/build-redirects/index.js"
}
```
2. Upload a CSV file named redirects.csv to the `/server/build-redirects` folder. The format of the CSV file should be two columns with each redirect as a row with old url > new url

| old url   | new url                    |
|:----------|:---------------------------|
| /cromwell | https://www.cromwell.co.uk | 
| /google   | https://google.com         | 
| /next     | https://nextjs.org         | 

4. Run this in the terminal
```bash
npm run build-redirects
```
4. Restart next to see the redirects working

### Links  
- [Next redirects docs](https://nextjs.org/docs/api-reference/next.config.js/redirects)
- [app is based on this repo](https://github.com/kaimanaagency/pixels-next-redirects)
- [setting up Express in Next](https://www.youtube.com/watch?v=kmrJkrW-ha0&ab_channel=skell)
- [readline module from the docs](https://nodejs.org/api/readline.html)
- [How to use the readline module](https://gist.github.com/initlove/2478016)

### Notes

- Promise-based solution for readLines function which wasn't used in the end. See [example on stackoverflow](https://stackoverflow.com/questions/69811324/how-can-i-make-a-readline-await-async-promise)

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