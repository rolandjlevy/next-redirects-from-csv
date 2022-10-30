const redirects = [
  {
    "source": "/cromwell",
    "destination": "https://www.cromwell.co.uk",
    "permanent": true,
    "has": [
      {
        "type": "query",
        "key": "page",
        "value": "home"
      },
      {
        "type": "cookie",
        "key": "authorized",
        "value": "true"
      }
    ]
  },
  {
    "source": "/google",
    "destination": "https://google.com",
    "permanent": true
  },
  {
    "source": "/next",
    "destination": "https://nextjs.org",
    "permanent": true
  },
  {
    "source": "/react",
    "destination": "https://reactjs.org",
    "permanent": true
  }
];

module.exports = redirects;