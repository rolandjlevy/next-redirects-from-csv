// Import redirects from CSV file with npm run build-redirects
const redirects = require('./server/build-redirects/output');

const nextConfig = {
  async redirects() {
    return redirects
  },
};

// const nextConfig = {
//   async redirects() {
//     return [
//       {
//         source: '/cromwell',
//         destination:
//           'https://www.cromwell.co.uk',
//         permanent: true,
//       },
//       {
//         source: '/google',
//         destination: 'https://google.com',
//         permanent: true,
//       },
//       {
//         source: '/next',
//         destination: 'https://nextjs.org',
//         permanent: true,
//       },
//     ];
//   },
// };

module.exports = nextConfig