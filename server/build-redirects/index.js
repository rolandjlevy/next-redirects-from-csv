const readline = require('readline');
const { once } = require('events');
const fs = require('fs');
const skipLines = 1; // ignore the header in the csv

const readLines = async (inputFile) => {
  const lineReader = readline.createInterface({
    input: fs.createReadStream(inputFile),
    crlfDelay: Infinity,
  });
  const lines = [];
  lineReader.on(`line`, (line) => {
    const parts = line.split(',');
    lines.push(parts);
  });
  await once(lineReader, 'close');
  return lines;
}

const formatString = (str) => {
  if (!str || str === '/') {
    return '/';
  }
  return str.endsWith('/') ? str.slice(0, -1) : str;
}

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

const buildRedirects = async ({ inputFile, outputFile }) => {
  const redirects = await formatRedirects(inputFile)
  let contents = `const redirects = ${JSON.stringify(redirects, null, 2)};\n\n`;
  contents += `module.exports = redirects;`;
  fs.writeFileSync(outputFile, contents);
}

const inputFile = `redirects.csv`;
const outputFile = `output.js`;

(async () => {
  await buildRedirects({
    inputFile: `${__dirname}/${inputFile}`,
    outputFile: `${__dirname}/${outputFile}`
  });
})();
