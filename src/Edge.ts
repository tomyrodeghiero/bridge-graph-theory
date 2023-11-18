import { Vertex } from "./Vertex";

export class Edge {
  first: Vertex;
  second: Vertex;

  constructor(first: Vertex, second: Vertex) {
    this.first = first;
    this.second = second;
  }
}
