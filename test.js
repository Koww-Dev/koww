const data = {
  id: [
    '1231',
    'sjdfoisjdf',
    'uei3209',
    '20939e'
  ]
}

async function test() {
  const tokenData = await Promise.all(data.id.find((item) => {
    if (item === data.id[0]) return false
    return true
  }));
  console.log(tokenData)
}

test()

// const array1 = [5, 12, 8, 130, 44];

// const found = array1.find(element => element > 10);

// console.log(found);