const { createInterface } = require('readline');
const { createReadStream, writeFileSync } = require('fs');
const { once } = require('events');
const path = require('path');
// skip the csv file's first row which is the header
const skipLines = 1; 

// Use Node's readline module to read data from a file one line at a time
const readLines = async (inputFile) => {
  try {
    const lineReader = createInterface({
      input: createReadStream(inputFile),
      crlfDelay: Infinity, // crlfDelay explained in README Notes
    });
    const lines = [];
    lineReader.on('line', (line) => {
      const parts = line.split(',');
      lines.push(parts);
    });
    await once(lineReader, 'close');
    return lines;
  } catch (err) {
    console.error(err);
  }
}

const formatString = (str) => {
  if (!str || str === '/') {
    return '/';
  }
  return str.endsWith('/') ? str.slice(0, -1) : str;
}

// Create an array of redirects in a format compatible with next.config.js
const formatRedirects = async (inputFile) => {
  const lines = await readLines(inputFile);
  return lines.reduce((acc, line, index) => {
    const [source, destination] = line;
    const redirect = {
      source: formatString(source),
      destination: formatString(destination),
      permanent: true
    }
    if (index >= skipLines && redirect.source !== redirect.destination) {
      acc.push(redirect);
    }
    return acc;
  }, []);
}

// Build the contents of the output and write it to file
const buildRedirects = async ({ inputFile, outputFile }) => {
  const redirects = await formatRedirects(inputFile)
  let contents = `const redirects = ${JSON.stringify(redirects, null, 2)};\n\n`;
  contents += `module.exports = redirects;`;
  writeFileSync(outputFile, contents);
}

const inputFile = path.join(__dirname, '/', 'redirects.csv');
const outputFile = path.join(__dirname, '/', 'output.js');

(async () => {
  await buildRedirects({ inputFile, outputFile });
})();
