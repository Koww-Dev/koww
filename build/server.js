"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.get('/', (request, response) => {
  response.send({
    message: 'Hello World'
  });
});
app.listen(process.env.PORT || 2000);