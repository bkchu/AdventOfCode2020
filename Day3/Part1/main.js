function main(inputArr) {
  const numberOfTrees = numTrees(inputArr, 3, 1);

  return numberOfTrees;
}

module.exports = {
  main,
};

function numTrees(inputArr, slopeX, slopeY) {
  let index = slopeX;
  let count = 0;
  const LINE_LENGTH = inputArr[0].length;
  for (let i = slopeY; i < inputArr.length; i += slopeY) {
    if (inputArr[i][index] === "#") {
      count++;
    }
    index = (index + slopeX) % LINE_LENGTH;
  }
  return count;
}
