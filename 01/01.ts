import { createInterface } from "readline";
import { createReadStream } from "fs";

function run() {
  let rl = createInterface({
    input: createReadStream("01/input.txt"),
  });

  const lines: number[] = [];

  rl.on("line", (line) => lines.push(parseInt(line, 10)));

  rl.on("close", () => {
    let increaseCount = 0;

    lines.forEach((line, index) => {
      const prevLine = lines[index - 1];

      if (prevLine) {
        if (line > prevLine) {
          console.log(`${line} (increased)`);
          increaseCount++;
        } else {
          console.log(`${line} (decreased)`);
        }
      } else {
        console.log(`${line} (N/A - no previous measurement)`);
      }
    });

    console.log(
      `There are ${increaseCount} measurements that are larger than the previous measurement`
    );
  });
}

run();
