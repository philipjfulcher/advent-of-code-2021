import { createReadStream } from "fs";
import { createInterface } from "readline";
import { arrayMinMax } from "../util/arrayMinMax";
import { createMatrix, Matrix } from "../util/matrix";

export function run(inputFile: string) {
  let rl = createInterface({
    input: createReadStream(inputFile),
  });

  const rows: number[][] = [];

  rl.on("line", (line) => {
    rows.push(line.split("").map((number) => parseInt(number, 10)));
  });

  rl.on("close", () => {
    const matrix = createMatrix(rows);
    const oxygenRating = findRating(matrix, "max", "1");
    const scrubberRating = findRating(matrix, "min", "0");

    console.log(`Oxygen Rating is ${oxygenRating}`);
    console.log(`Scrubber Rating is ${scrubberRating}`);
    console.log(`Answer is ${scrubberRating * oxygenRating}`);
  });
}

run("03/input.txt");

function findRating(
  matrix: Matrix<number>,
  useMinOrMax: "min" | "max",
  tieBreakerKey: string
) {
  const numCols = matrix.getColumns().length;

  let mutableMatrix = createMatrix(matrix.data);

  for (let i = 0; i < numCols; i++) {
    if (mutableMatrix.getRows().length <= 1) {
      break;
    }

    const minMax = arrayMinMax(mutableMatrix.getColumns()[i]);
    let maxKey = minMax[useMinOrMax];

    if (minMax.maxCount === minMax.minCount) {
      maxKey = tieBreakerKey;
    }

    const filteredValues = mutableMatrix
      .getRows()
      .filter((row) => row[i].toString() === maxKey);

    mutableMatrix = createMatrix(filteredValues);
  }

  if (mutableMatrix.getRows().length !== 1) {
    throw Error("Unable to find oxygen rating");
  } else {
    const ratingString = mutableMatrix.getRows()[0].join("");

    return parseInt(ratingString, 2);
  }
}
