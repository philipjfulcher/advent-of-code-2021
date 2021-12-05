import { createReadStream } from "fs";
import { createInterface } from "readline";
import { arrayMinMax } from "../util/arrayMinMax";
import { createMatrix } from "../util/matrix";

export function run(inputFile: string) {
  let rl = createInterface({
    input: createReadStream(inputFile),
  });

  const rows: number[][] = [];

  rl.on("line", (line) => {
    rows.push(line.split("").map((number) => parseInt(number, 10)));
  });

  rl.on("close", () => {
    const fuelMatrix = createMatrix<number>(rows);
    const columns = fuelMatrix.getColumns();

    const rateStrings = columns.reduce(
      (columnAcc, column) => {
        const minMax = arrayMinMax(column);

        columnAcc.gamma += minMax.max;
        columnAcc.epsilon += minMax.min;

        return columnAcc;
      },
      { gamma: "", epsilon: "" }
    );

    const gammaRate = parseInt(rateStrings.gamma, 2);
    const epsilonRate = parseInt(rateStrings.epsilon, 2);

    console.log(`Gamma Rate: ${gammaRate}`);
    console.log(`Epsilon Rate: ${epsilonRate}`);
    console.log(`Power consumption: ${gammaRate * epsilonRate}`);
  });
}

run("03/input.txt");
