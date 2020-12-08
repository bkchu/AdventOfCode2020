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
  const numValidPassports = passports.filter(isPassportValid).length;

  return numValidPassports;
};

const isPassportValid = (passport) => {
  const REQUIRED_FIELDS = ["eyr", "hgt", "hcl", "pid", "byr", "ecl", "iyr"];

  const fieldsInPassport = passport.split(" ").map((fieldAndValue) => {
    const [, field, value] = fieldAndValue.match(/([a-z]{3})\:(.+)/);
    console.log(field, value);
    return { field, value };
  });

  const containsAllRequiredFields = REQUIRED_FIELDS.reduce(
    (containsAllRequiredFields, requiredField) => {
      return (
        containsAllRequiredFields &&
        fieldsInPassport.map(({ field }) => field).includes(requiredField)
      );
    },
    true
  );

  if (containsAllRequiredFields) {
    const areAllFieldsValid = fieldsInPassport.every(isFieldValid);
    return areAllFieldsValid;
  }

  return false;
};

const isFieldValid = ({ field, value }) => {
  /**
   * byr (Birth Year) - four digits; at least 1920 and at most 2002.
   * iyr (Issue Year) - four digits; at least 2010 and at most 2020.
   * eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
   * hgt (Height) - a number followed by either cm or in:
   *    If cm, the number must be at least 150 and at most 193.
   *    If in, the number must be at least 59 and at most 76.
   * hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
   * ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
   * pid (Passport ID) - a nine-digit number, including leading zeroes.
   * cid (Country ID) - ignored, missing or not.
   */

  const validationRules = [
    {
      field: "eyr",
      rules: [
        (value) => /[0-9]{4}/.test(value),
        (value) => +value >= 2020 && +value <= 2030,
      ],
    },
    {
      field: "hgt",
      rules: [
        (value) => {
          const isInch = /([0-9]+)in/.exec(value);
          const isCm = /([0-9]+)cm/.exec(value);

          if (isInch && +isInch[1] >= 59 && +isInch[1] <= 76) {
            return true;
          } else if (isCm && +isCm[1] >= 150 && +isCm[1] <= 193) {
            return true;
          }
          return false;
        },
      ],
    },
    { field: "hcl", rules: [(value) => /#[0-9a-f]{6}/.test(value)] },
    { field: "pid", rules: [(value) => /[0-9]{9}/.test(value)] },
    {
      field: "byr",
      rules: [
        (value) => /[0-9]{4}/.test(value),
        (value) => +value >= 1920 && +value <= 2002,
      ],
    },
    {
      field: "ecl",
      rules: [(value) => /(amb|blu|brn|gry|grn|hzl|oth){1}/.test(value)],
    },
    {
      field: "iyr",
      rules: [
        (value) => /[0-9]{4}/.test(value),
        (value) => +value >= 2010 && +value <= 2020,
      ],
    },
    {
      field: "cid",
      rules: [() => true],
    },
  ];

  const isFieldValid = validationRules
    .find((rule) => rule.field === field)
    .rules.every((rule) => rule(value));

  return isFieldValid;
};
