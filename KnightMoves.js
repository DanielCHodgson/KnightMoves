class Knight {
  knightMoves(start, end) {
    if (!this.isInBounds(start) || !this.isInBounds(end))
      throw new Error("Point not on board");

    const startNode = new Node(start[0], start[1], [start]);
    const queue = [startNode];
    const visited = new Set();
    visited.add(start.toString());

    while (queue.length > 0) {
      const current = queue.shift();

      if (this.isDestination([current.getX(), current.getY()], end)) {
        return current.getPath();
      }

      const potentialMoves = this.getPotentialMoves([
        current.getX(),
        current.getY(),
      ]);

      potentialMoves.forEach((point) => {
        const key = point.toString();
        if (!visited.has(key)) {
          visited.add(key);
          queue.push(
            new Node(point[0], point[1], [...current.getPath(), point])
          );
        }
      });
    }
  }

  isDestination([x1, y1], [x2, y2]) {
    return x1 === x2 && y1 === y2;
  }

  getPotentialMoves(point) {
    const [x, y] = point;
    const knightMoves = [
      [2, 1],
      [1, 2],
      [-1, 2],
      [-2, 1],
      [-2, -1],
      [-1, -2],
      [1, -2],
      [2, -1],
    ];

    return knightMoves.map(([dx, dy]) => [x + dx, y + dy]).filter(this.isInBounds);
  }

  isInBounds([x, y]) {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  }
}

class Node {
  #x;
  #y;
  #path = [];

  constructor(x, y, path) {
    this.#x = x;
    this.#y = y;
    this.#path = path;
  }

  getX() {
    return this.#x;
  }
  getY() {
    return this.#y;
  }
  getPath() {
    return this.#path;
  }
}


const knight = new Knight();

function testKnightMoves(start, end) {
  const path = knight.knightMoves(start, end);
  console.log(`> knightMoves([${start}], [${end}])`);
  console.log(
    `=> You made it in ${path.length - 1} moves! Here's your path:`
  );
  console.log(path.map((p) => `[${p}]`).join(" -> "));
}

testKnightMoves([3, 3], [4, 3]);
testKnightMoves([0, 0], [1, 2]);
testKnightMoves([0, 0], [7, 7]);

