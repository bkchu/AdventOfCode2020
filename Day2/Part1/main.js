function main(inputArr) {
  const validPasswords = inputArr.reduce((acc, password) => {
    const [, least, most, letter, code] = password.match(
      /(\d+)-(\d+) ([a-z]): ([a-z]+)/
    );
    const countOfLetter = code.replace(new RegExp("[^" + letter + "]", "g"), "")
      .length;
    return countOfLetter >= least && countOfLetter <= most ? acc + 1 : acc;
  }, 0);
  return validPasswords;
}

module.exports = {
  main,
};
