function main(inputArr) {
  const testSlopes = [
    {
      x: 1,
      y: 1,
    },
    {
      x: 3,
      y: 1,
    },
    {
      x: 5,
      y: 1,
    },
    {
      x: 7,
      y: 1,
    },
    {
      x: 1,
      y: 2,
    },
  ];

  const productOfTotalTreesOnEachSlope = testSlopes.reduce((product, slope) => {
    return product * numTrees(inputArr, slope.x, slope.y);
  }, 1);

  return productOfTotalTreesOnEachSlope;
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
