const http = require('http');

const server = http.createServer((req, res) => {
  // Simulate an asynchronous operation that might fail
  doAsyncOperation(() => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!');
  }, (error) => {
    // Proper error handling
    console.error('Error during async operation:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  });
});

function doAsyncOperation(successCallback, errorCallback) {
  // Simulate an asynchronous operation that might fail randomly
  const success = Math.random() < 0.8; // 80% chance of success
  setTimeout(() => {
    if (success) {
      successCallback();
    } else {
      errorCallback(new Error('Async operation failed'));
    }
  }, 100);
}

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});