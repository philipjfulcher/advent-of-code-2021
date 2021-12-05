export interface MinMax {
  min: string;
  minCount: number;
  max: string;
  maxCount: number;
}

export function arrayMinMax(arr: Array<string | number>): MinMax {
  const arrCounter = arr.reduce<{ [key: string | number]: number }>(
    (counter, val) => {
      if (counter[val] === undefined) {
        counter[val] = 1;
      } else {
        counter[val]++;
      }

      return counter;
    },
    {}
  );

  const minMax: MinMax = {
    max: "",
    min: "",
    minCount: 0,
    maxCount: 0,
  };

  for (let key in arrCounter) {
    const count = arrCounter[key];
    if (minMax.max === "" || count > minMax.maxCount) {
      minMax.max = key;
      minMax.maxCount = count;
    }

    if (minMax.min === "" || count < minMax.minCount) {
      minMax.min = key;
      minMax.minCount = count;
    }
  }

  return minMax;
}
