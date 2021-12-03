import { createReadStream } from "fs";
import { createInterface } from "readline";
import { matrix, size, column } from "mathjs";

export function run(inputFile: string) {
  let rl = createInterface({
    input: createReadStream(inputFile),
  });

  const rows: number[][] = [];

  rl.on("line", (line) => {
    rows.push(line.split("").map((number) => parseInt(number, 10)));
  });

  rl.on("close", () => {
    const fuelMatrix = matrix(rows);
    const matrixSize = fuelMatrix.size();
    const numCols = matrixSize[1];

    let gammaRateString = "";
    let epsilonRateString = "";

    for (let i = 0; i < numCols; i++) {
      const colValues = column(fuelMatrix, i);

      let zeroes = 0;
      let ones = 0;

      colValues.forEach((val) => {
        if (val === 0) {
          zeroes++;
        } else {
          ones++;
        }
      });

      if (zeroes > ones) {
        gammaRateString += "0";
        epsilonRateString += "1";
      } else {
        gammaRateString += "1";
        epsilonRateString += "0";
      }
    }

    const gammaRate = parseInt(gammaRateString, 2);
    const epsilonRate = parseInt(epsilonRateString, 2);

    console.log(`Gamma Rate: ${gammaRate}`);
    console.log(`Epsilon Rate: ${epsilonRate}`);
    console.log(`Power consumption: ${gammaRate * epsilonRate}`);
  });
}

run("03/input.txt");
