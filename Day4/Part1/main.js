function main(inputArr) {
  // get passports
  const passports = getPassports(inputArr);

  // count valid passports
  const numValidPassports = getNumValidPassports(passports);
  return numValidPassports;
}

module.exports = {
  main,
};

/**
 * gets the passports
 * @param {string[]} inputArr
 */
const getPassports = (inputArr) => {
  const passports = inputArr
    .map((line) => (line === "" ? " " : line))
    .join(" ")
    .split("   ")
    .map((line) => line.trim());
  return passports;
};

const getNumValidPassports = (passports) => {
  const numValidPassports = passports.reduce((numValid, passport) => {
    const isValid = isPassportValid(passport);

    return isValid ? numValid + 1 : numValid;
  }, 0);

  return numValidPassports
};

const isPassportValid = (passport) => {
  const REQUIRED_FIELDS = ["eyr", "hgt", "hcl", "pid", "byr", "ecl", "iyr"];

  const fieldsInPassport = passport.split(" ").map(fieldAndValue => fieldAndValue.match(/([a-z]{3})\:.+/)[1]);

  const isValid = REQUIRED_FIELDS.reduce((isValid, requiredField) => {
    return isValid && fieldsInPassport.includes(requiredField);
  }, true);

  return isValid
};

