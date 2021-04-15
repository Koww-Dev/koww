import express from 'express';

const app = express();

app.get('/', (request, response) => {
  response.send({
    message: 'Hello World',
  });
});

app.listen(process.env.PORT || 2000);
