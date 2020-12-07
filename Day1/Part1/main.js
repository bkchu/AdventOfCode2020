function main(inputArr) {
  const nums = inputArr.slice().map((num) => +num);

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === 2020) {
        return nums[i] * nums[j];
      }
    }
  }
}

module.exports = {
  main,
};
