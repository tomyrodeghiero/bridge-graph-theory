import { Edge } from "./Edge";
import { Vertex } from "./Vertex";

export interface Graph {
  addVertex(node: Vertex): boolean;
  removeVertex(node: Vertex): boolean;
  exists(node: Vertex): boolean;
  vertices(): Vertex[];
  edges(): Edge[];
  addEdge(vertex1: Vertex, vertex2: Vertex): boolean;
  removeEdge(vertex1: Vertex, vertex2: Vertex): boolean;
  getAdjacents(v: Vertex): Vertex[];
  vertexCount(): number;
  isEmpty(): boolean;
  edgeCount(): number;
  hasEdge(v1: Vertex, v2: Vertex): boolean;
}
