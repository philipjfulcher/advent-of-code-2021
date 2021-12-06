import { createMatrix, Matrix } from "./matrix";

export interface BingoBoardCell {
  isMarked: boolean;
  boardNumber: string;
}

export interface BingoBoard {
  matrix: Matrix<BingoBoardCell>;
  reverseLookup: Record<string, [row: number, column: number]>;
  mark: (boardNumber: string) => void;
  checkWin: () => boolean;
  hasWon: boolean;
  winningNumber: string;
  getFinalScore: () => number;
}

export function createBingoBoard(boardNumbers: string[][]): BingoBoard {
  let reverseLookup: Record<string, [row: number, column: number]> = {};

  const boardNumberCells = boardNumbers.map((row, rowNum) =>
    row.map((boardNumber, colNum) => {
      //   console.log({ boardNumber, rowNum, colNum });
      reverseLookup[boardNumber] = [rowNum, colNum];
      return {
        isMarked: false,
        boardNumber,
      };
    })
  );

  return {
    matrix: createMatrix<BingoBoardCell>(boardNumberCells),
    reverseLookup,
    mark: function (this: BingoBoard, boardNumber: string) {
      const reverseLookup = this.reverseLookup[boardNumber];

      if (reverseLookup !== undefined) {
        const [row, col] = reverseLookup;
        this.matrix.setCellValue(row, col, { isMarked: true, boardNumber });
        const hasWon = this.checkWin();

        if (hasWon) {
            console.log('board win!')
          this.hasWon = true;
          this.winningNumber = boardNumber;
        }
      }
    },
    hasWon: false,
    winningNumber: "",
    checkWin: function (this: BingoBoard) {
      const winningRow = this.matrix.getRows().reduce((hasWinningRow, row) => {
        if (hasWinningRow) {
          return hasWinningRow;
        }

        return row.every((cell) => cell.isMarked);
      }, false);

      const winningColumn = this.matrix
        .getColumns()
        .reduce((hasWinningColumn, column) => {
          if (hasWinningColumn) {
            return hasWinningColumn;
          }

          return column.every((cell) => cell.isMarked);
        }, false);

      return winningRow || winningColumn;
    },
    getFinalScore: function (this: BingoBoard) {
      const flattenedData = this.matrix.data.flat();
      const unmarked = flattenedData.filter((cell) => !cell.isMarked);
      const sum = unmarked.reduce(
        (currentSum, cell) => currentSum + parseInt(cell.boardNumber, 10),
        0
      );
console.log({sum, number: this.winningNumber})
      const total = sum * parseInt(this.winningNumber, 10);

      return total;
    },
  };
}
