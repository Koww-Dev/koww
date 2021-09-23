const bd = ['NodeJS', 'Vue', 'React Native', 'Angular', 'Flluter'];
const data_2 = ['NodeJS', 'React', 'React Native', 'Kotlin', 'Java', 'Rust', 'Electron'];

bd.forEach(item => {
  data_2.forEach((a) => {
    if (a === item) {
      data_2.splice(data_2.indexOf(a), 1)
    }
  })
});

console.log(data_2);