import { createInterface } from "readline";
import { createReadStream } from "fs";

type direction = "forward" | "up" | "down";

type command = [direction, number];

type position = [horizontal: number, depth: number];

function run() {
  let rl = createInterface({
    input: createReadStream("02/input.txt"),
  });

  const commands: command[] = [];

  rl.on("line", (line) => {
    const split = line.split(" ");
    const parsedCommand: command = [split[0] as direction, parseInt(split[1])];

    commands.push(parsedCommand);
  });

  rl.on("close", () => {
    let currentPosition = [0, 0];

    commands.forEach((command, index) => {
      switch (command[0]) {
        case "forward":
          currentPosition = [
            currentPosition[0] + command[1],
            currentPosition[1],
          ];
          break;

        case "down":
          currentPosition = [
            currentPosition[0],
            currentPosition[1] + command[1],
          ];
          break;

        case "up":
          currentPosition = [
            currentPosition[0],
            currentPosition[1] - command[1],
          ];
          break;
      }
    });

    console.log(
      `Current position is ${currentPosition}`,
      `The product of this position is ${
        currentPosition[0] * currentPosition[1]
      }`
    );
  });
}

run();
