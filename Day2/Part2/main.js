function main(inputArr) {
  const validPasswords = inputArr.reduce((acc, password) => {
    const [, firstPos, secondPos, letter, code] = password.match(
      /(\d+)-(\d+) ([a-z]): ([a-z]+)/
    );

    const isLetterInFirstPos = code[+firstPos - 1] == letter;
    const isLetterInSecondPos = code[+secondPos - 1] == letter;

    return (isLetterInFirstPos && !isLetterInSecondPos) ||
      (!isLetterInFirstPos && isLetterInSecondPos)
      ? acc + 1
      : acc;
  }, 0);
  return validPasswords;
}

module.exports = {
  main,
};
