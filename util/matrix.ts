export interface Matrix<CellType> {
  data: CellType[][];
  getCellValue: (x: number, y: number) => CellType | null;
  setCellValue: (x: number, y: number, value: CellType) => void;

  getColumns: () => CellType[][];
  getRows: () => CellType[][];
}

export function createMatrix<CellType>(data: CellType[][]): Matrix<CellType> {
  return {
    data,
    getCellValue: function (x: number, y: number) {
      return this.data?.[x]?.[y] ?? null;
    },
    setCellValue: function (x: number, y: number, value: CellType) {
      data[x][y] = value;
    },
    getRows: function () {
      return this.data;
    },
    getColumns: function () {
      const numRows = data.length;
      const numCols = data[0].length;

      //   console.log({numRows,numCols})

      const columns: CellType[][] = [];

      for (let col = 0; col < numCols; col++) {
        const column: CellType[] = [];
        for (let row = 0; row < numRows; row++) {
          // console.log({row, col});
          column.push(this.data[row][col]);
        }
        // console.log({col, column})
        columns.push(column);
      }

      return columns;
    },
  };
}
