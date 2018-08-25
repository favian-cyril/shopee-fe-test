- How to run unit tests: npm test. With coverage: npm test -- --coverage
- How to run in docker: docker build -t {tag} . | docker run -it \
                                                  -v ${PWD}:/usr/src/app \
                                                  -v /usr/src/app/node_modules \
                                                  -p 3000:3000 \
                                                  --rm \
                                                  {tag}
shopee-fe
├── README.md
├── node_modules
├── package.json
├── Dockerfile
├── .dockerignore
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── components  (Small components used in the App.js)
    │   ├── CurrencyCard.js
    │   ├── DialogPrompt.js
    │   └── DropdownCurrency.js
    ├── scripts (scripts for API calls & mocked function)
    │   ├── __mocks__
    │   └── getRatesData.js
    ├── __tests__   (unit tests)
    ├── App.js  (main App)
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── registerServiceWorker.js (for PWA made by create-react-app)
