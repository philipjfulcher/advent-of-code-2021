import { createReadStream } from "fs";
import { createInterface } from "readline";

function run() {
  let rl = createInterface({
    input: createReadStream("01/input.txt"),
  });

  const lines: number[] = [];

  rl.on("line", (line) => lines.push(parseInt(line, 10)));

  rl.on("close", () => {
    let increaseCount = 0;

    let previousTotal;

    lines.forEach((line, index) => {
      if (index < 2) {
        return;
      }

      const groupTotal = line + lines[index - 1] + lines[index - 2];

      if (previousTotal) {
        if (groupTotal > previousTotal) {
          console.log(`${groupTotal} (increased)`);
          increaseCount++;
        } else if (groupTotal === previousTotal) {
          console.log(`${groupTotal} (no change)`);
        } else {
          console.log(`${groupTotal} (decreased)`);
        }
        previousTotal = groupTotal;
      } else {
        console.log(`${groupTotal} (N/A - no previous measurement)`);
        previousTotal = groupTotal;
      }
    });

    console.log(
      `There are ${increaseCount} measurements that are larger than the previous measurement`
    );
  });
}

run();
