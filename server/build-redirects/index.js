const readline = require('readline');
const fs = require('fs');
const { once } = require('events');
const skipLines = 1; // ignore the header line

const readLines = async (file) => {
  const result = []
  const lineReader = readline.createInterface({
    input: fs.createReadStream(file),
    crlfDelay: Infinity,
  });
  const lines = [];
  lineReader.on(`line`, (line) => {
    const parts = line.split(',');
    lines.push(parts);
  });
  lineReader.on('error', (err) => {
    console.log('error', err);
  });
  await once(lineReader, 'close');
  return lines;
}

const parseLine = (line) => {
  if (!line || line === '/') {
    return '/';
  }
  return line.endsWith('/') ? line.slice(0, -1) : line;
}

const parseRedirects = async (inputFile) => {
  const lines = await readLines(inputFile);
  return lines.reduce((acc, line, index) => {
    console.log(index)
    const redirect = {
      source: parseLine(line[0]),
      destination: parseLine(line[1]),
      permanent: true
    }
    if (index >= skipLines && redirect.source !== redirect.destination) {
      acc.push(redirect);
    }
    return acc;
  }, []);
}

const buildRedirects = async ({ inputFile, outputFile }) => {
  const redirects = await parseRedirects(inputFile)
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
