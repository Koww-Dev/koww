const Chat = require('../app/models/Chat');

const DocumentProject = require('../app/models/DocumentProject');
const Notes = require('../app/models/Notes');
const Projects = require('../app/models/Projects');
const Todo = require('../app/models/Todo');
const User = require('../app/models/User');
const VideoCall = require('../app/models/VideoCall');

Chat.deleteMany().then(() => {
  console.warn('all Chat have been deleted');
}).catch((error) => {
  console.error(error);
});

DocumentProject.deleteMany().then(() => {
  console.warn('all DocumentProject have been deleted');
}).catch((error) => {
  console.error(error);
});

Notes.deleteMany().then(() => {
  console.warn('all Notes have been deleted');
}).catch((error) => {
  console.error(error);
});

Projects.deleteMany().then(() => {
  console.warn('all Projects have been deleted');
}).catch((error) => {
  console.error(error);
});

Todo.deleteMany().then(() => {
  console.warn('all Todo have been deleted');
}).catch((error) => {
  console.error(error);
});

User.deleteMany().then(() => {
  console.warn('all User have been deleted');
}).catch((error) => {
  console.error(error);
});

VideoCall.deleteMany().then(() => {
  console.warn('VideoCall users have been deleted');
}).catch((error) => {
  console.error(error);
});
