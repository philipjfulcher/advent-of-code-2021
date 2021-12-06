import { createReadStream } from "fs";
import { createInterface } from "readline";
import { BingoBoard, createBingoBoard } from "../util/bingo";

export function run(inputFile: string) {
  let rl = createInterface({
    input: createReadStream(inputFile),
  });

  let numberDraws: string[] = [];
  let currentBoard: string[][] = [];

  const boards: BingoBoard[] = [];

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

    let winningBoard: number = -1;

    let numberDrawCount = 0;

    while (winningBoard === -1 && numberDrawCount < numberDraws.length) {
      const currentDraw = numberDraws[numberDrawCount];
      console.log(`Drawing ${currentDraw}`);

      boards.forEach((board, boardIndex) => {
        if (winningBoard === -1) {
          board.mark(numberDraws[numberDrawCount]);
          winningBoard = board.hasWon ? boardIndex : -1;
        }
      });

      numberDrawCount++;
    }

    console.log(`Winning board is ${winningBoard + 1}`);
    console.log(`Board score is ${boards[winningBoard].getFinalScore()}`);
  });
}

run("04/input.txt");
