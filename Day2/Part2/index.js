const { once } = require("events");
const { createReadStream } = require("fs");
const { createInterface } = require("readline");
const { join } = require("path");
const { main } = require("./main.js");

(async function processLineByLine() {
  try {
    const inputArr = [];
    const rl = createInterface({
      input: createReadStream(join(".", "input")),
      crlfDelay: Infinity,
    });

    rl.on("line", (line) => {
      inputArr.push(line);
    });

    await once(rl, "close");

    // execute main functionality - and log result to screen
    const result = main(inputArr);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
})();
