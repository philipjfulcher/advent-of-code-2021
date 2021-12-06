import { createReadStream } from "fs";
import { createInterface } from "readline";
import { BingoBoard, createBingoBoard } from "../util/bingo";

export function run(inputFile: string) {
  let rl = createInterface({
    input: createReadStream(inputFile),
  });

  let numberDraws: string[] = [];
  let currentBoard: string[][] = [];

  let boards: BingoBoard[] = [];

  let lineNum = 0;

  rl.on("line", (line) => {
    lineNum++;
    if (lineNum === 1) {
      numberDraws = line.split(",");
    } else {
      if (line.length !== 0) {
        currentBoard.push(
          line
            .replace(/\s{2,}/g, " ")
            .trim()
            .split(" ")
        );
      } else if (line.length === 0 && currentBoard.length > 0) {
        boards.push(createBingoBoard(currentBoard));
        currentBoard = [];
      }
    }
  });

  rl.on("close", () => {
    boards.push(createBingoBoard(currentBoard));

    console.log(`Playing ${boards.length} boards`);

    let lastWinningBoard: number = -1;

    let numberDrawCount = 0;
    let numLeft = boards.length;

    while (numLeft > 0 && numberDrawCount < numberDraws.length) {
      const currentDraw = numberDraws[numberDrawCount];
      console.log(`Drawing ${currentDraw}`);

      boards.forEach((board, boardIndex) => {
        numLeft = boards.filter(
          (boardTofilter) => !boardTofilter.hasWon
        ).length;

        if (numLeft !== 0) {
          board.mark(numberDraws[numberDrawCount]);
          numLeft = boards.filter(
            (boardTofilter) => !boardTofilter.hasWon
          ).length;
          console.log(`${numLeft} left`);
          lastWinningBoard = numLeft === 0 ? boardIndex : -1;
        }
      });

      numberDrawCount++;
    }

    console.log(`Last winning board is ${lastWinningBoard + 1}`);
    console.log(`Board score is ${boards[lastWinningBoard].getFinalScore()}`);
  });
}

run("04/input.txt");
