import { createReadStream } from "fs";
import { column, matrix, row } from "mathjs";
import { createInterface } from "readline";

export function run(inputFile: string) {
  let rl = createInterface({
    input: createReadStream(inputFile),
  });

  const rows: number[][] = [];

  rl.on("line", (line) => {
    rows.push(line.split("").map((number) => parseInt(number, 10)));
  });

  rl.on("close", () => {
    let oxygenMatrix = matrix(rows);
    const [, oxygenNumCols] = oxygenMatrix.size();

    let currentColumn = 0;

    while (oxygenMatrix.size()[0] > 1 && currentColumn < oxygenNumCols) {
      console.log(`Checking oxygen column ${currentColumn}`);
      const [numRows] = oxygenMatrix.size();
      console.log(`${numRows} remaining`);

      if (numRows === 1) {
        break;
      }

      const colValues = column(oxygenMatrix, currentColumn);

      let zeroes = 0;
      let ones = 0;

      colValues.forEach((val) => {
        if (val === 0) {
          zeroes++;
        } else {
          ones++;
        }
      });

      const filteredValues = [];

      if (ones > zeroes || zeroes === ones) {
        console.log("More ones!");
        for (let rowNum = 0; rowNum < numRows; rowNum++) {
          const valueToCheck = oxygenMatrix.get([rowNum, currentColumn]);

          //   console.log(`Checking if ${valueToCheck} is 0`);
          if (valueToCheck === 1) {
            filteredValues.push(row(oxygenMatrix, rowNum).toArray()[0]);
          }
        }
      } else {
        console.log("More zeroes!");

        for (let rowNum = 0; rowNum < numRows; rowNum++) {
          const valueToCheck = oxygenMatrix.get([rowNum, currentColumn]);
          //   console.log(`Checking if ${valueToCheck} is 1`);

          if (valueToCheck === 0) {
            filteredValues.push(row(oxygenMatrix, rowNum).toArray()[0]);
          }
        }
      }
      console.log(`Filtered down to ${filteredValues.length}`);
      console.log(filteredValues);
      currentColumn++;
      oxygenMatrix = matrix(filteredValues);
    }

    let scrubberMatrix = matrix(rows);
    const [, scrubberNumCols] = scrubberMatrix.size();

    currentColumn = 0;

    while (scrubberMatrix.size()[0] > 1 && currentColumn < scrubberNumCols) {
      console.log(`Checking column ${currentColumn}`);
      const [numRows] = scrubberMatrix.size();
      console.log(`${numRows} remaining`);

      if (numRows === 1) {
        break;
      }

      const colValues = column(scrubberMatrix, currentColumn);

      let zeroes = 0;
      let ones = 0;

      colValues.forEach((val) => {
        if (val === 0) {
          zeroes++;
        } else {
          ones++;
        }
      });

      const filteredValues = [];

      if (zeroes < ones || zeroes === ones) {
        console.log("Fewer zeroes!");
        for (let rowNum = 0; rowNum < numRows; rowNum++) {
          const valueToCheck = scrubberMatrix.get([rowNum, currentColumn]);

          //   console.log(`Checking if ${valueToCheck} is 0`);
          if (valueToCheck === 0) {
            filteredValues.push(row(scrubberMatrix, rowNum).toArray()[0]);
          }
        }
      } else {
        console.log("Fewer ones!");

        for (let rowNum = 0; rowNum < numRows; rowNum++) {
          const valueToCheck = scrubberMatrix.get([rowNum, currentColumn]);
          //   console.log(`Checking if ${valueToCheck} is 1`);

          if (valueToCheck === 1) {
            filteredValues.push(row(scrubberMatrix, rowNum).toArray()[0]);
          }
        }
      }
      //   console.log(`Filtered down to ${filteredValues.length}`);
      //   console.log(filteredValues);
      currentColumn++;
      scrubberMatrix = matrix(filteredValues);
    }

    let oxygenRating, scrubberRating;

    if (oxygenMatrix.size()[0] !== 1) {
      console.log("Unable to find oxygen rating");
    } else {
      const oxygenRatingString = (
        row(oxygenMatrix, 0).toArray()[0] as number[]
      ).join("");

      oxygenRating = parseInt(oxygenRatingString, 2);
      console.log(`Oxygen Rating is ${oxygenRating}`);
    }

    if (scrubberMatrix.size()[0] !== 1) {
      console.log("Unable to find scrubber rating");
    } else {
      const scrubberRatingString = (
        row(scrubberMatrix, 0).toArray()[0] as number[]
      ).join("");

      scrubberRating = parseInt(scrubberRatingString, 2);
      console.log(`Scrubber Rating is ${scrubberRating}`);
    }

    if (oxygenRating !== undefined && scrubberRating !== undefined) {
      console.log(`Answer is ${scrubberRating * oxygenRating}`);
    }
  });
}

run("03/input.txt");
