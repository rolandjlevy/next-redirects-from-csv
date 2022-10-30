// import redirects from CSV file using `npm run build-redirects`
// output is built from server/build-redirects/index.js
const redirects = require('./server/build-redirects/output');

module.exports = {
 async redirects() {
    return redirects
  },
}