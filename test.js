const User = require('./models/User');
const Project = require('./models/Projects')
const Notes = require('./models/Notes');
const Todo = require('./models/Todo')

Todo.create({
  projectsId: 'ueqiuwdu',

  name: 'asdasdasd',

  Todo: {
    time: 123187238172837,

    blocks: [
      {
        typeEditor: 'sdaflkdsfk',

        data: {
          text: 'ksdfskmdf',
          level: 72349817234,
          style: 'dajndjfnaskdf',
          items: ['sldfaldsf', 'jfkaldkfalkdsmf', 'kjdfajndfnaosd']
        }
      }
    ],
    version: 'skaldflaksdlfmkadlkfm'
  }
}).then(response => {
  console.log(response)
})