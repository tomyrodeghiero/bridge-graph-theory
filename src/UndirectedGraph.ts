import { Edge } from "./Edge";
import { Graph } from "./Graph";
import { Vertex } from "./Vertex";

export class UndirectedGraph implements Graph {
  private vertexMap: Map<number, Vertex>;
  private edgeArray: Edge[];

  constructor() {
    this.vertexMap = new Map<number, Vertex>();
    this.edgeArray = [];
  }

  addVertex(node: Vertex): boolean {
    if (node == null || this.vertexMap.has(node.id)) {
      return false;
    }

    this.vertexMap.set(node.id, node);
    return true;
  }

  removeVertex(node: Vertex): boolean {
    if (node == null) {
      return false;
    }

    if (this.vertexMap.has(node.id)) {
      this.vertexMap.delete(node.id);
      this.edgeArray = this.edgeArray.filter(
        (edge) => edge.first !== node && edge.second !== node
      );
      return true;
    }

    return false;
  }

  exists(node: Vertex): boolean {
    return this.vertexMap.has(node.id);
  }

  vertices(): Vertex[] {
    return Array.from(this.vertexMap.values());
  }

  edges(): Edge[] {
    return this.edgeArray;
  }

  addEdge(vertex1: Vertex, vertex2: Vertex): boolean {
    if (this.vertexMap.has(vertex1.id) && this.vertexMap.has(vertex2.id)) {
      const newEdge = new Edge(vertex1, vertex2);
      if (!this.edgeArray.includes(newEdge)) {
        this.edgeArray.push(newEdge);
        vertex1.addAdjacent(vertex2);
        vertex2.addAdjacent(vertex1);
        return true;
      }
    }
    return false;
  }

  removeEdge(vertex1: Vertex, vertex2: Vertex): boolean {
    const edgeToRemove = new Edge(vertex1, vertex2);
    const index = this.edgeArray.indexOf(edgeToRemove);
    if (index > -1) {
      this.edgeArray.splice(index, 1);
      vertex1.removeAdjacent(vertex2);
      vertex2.removeAdjacent(vertex1);
      return true;
    }
    return false;
  }

  getAdjacents(v: Vertex): Vertex[] {
    const realVertex = this.vertexMap.get(v.id);
    return realVertex ? Array.from(realVertex.adjacent) : [];
  }

  vertexCount(): number {
    return this.vertexMap.size;
  }

  isEmpty(): boolean {
    return this.vertexMap.size === 0;
  }

  edgeCount(): number {
    return this.edgeArray.length;
  }

  hasEdge(v1: Vertex, v2: Vertex): boolean {
    return this.edgeArray.some(
      (edge) =>
        (edge.first === v1 && edge.second === v2) ||
        (edge.first === v2 && edge.second === v1)
    );
  }
}
