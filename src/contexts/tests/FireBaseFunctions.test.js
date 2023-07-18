// At the top of test/index.test.js
const test = require('firebase-functions-test')({
    databaseURL: 'https://my-project.firebaseio.com',
    storageBucket: 'my-project.appspot.com',
    projectId: 'my-project',
  }, '/Users/paridhiagarwal/Downloads/famtime2-1822a-05e3a03eebd9.json');

  const mockuseFirebase= require('../FireBaseFunctions');
  const wrapped= test.wrap(mockuseFirebase.setUser);

  const data =;
  wrapped(data);
