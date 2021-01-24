const isOverlapArray = (firstArray, secondArray) => {
  let smallerArray = [];
  let biggerArray = [];
  if (firstArray.length < secondArray.length) {
    smallerArray = firstArray;
    biggerArray = secondArray;
  } else {
    smallerArray = secondArray;
    biggerArray = firstArray;
  }
  const arraySet = new Set(biggerArray);

  for (const iterator of smallerArray) {
    if (arraySet.has(iterator)) return true;
  }
  return false;
}

module.export = {
  isOverlapArray,
}
