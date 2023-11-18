export class Vertex {
  id: number;
  adjacent: Vertex[];

  constructor(id: number) {
    this.id = id;
    this.adjacent = [];
  }

  addAdjacent(v: Vertex): boolean {
    if (!this.adjacent.includes(v)) {
      this.adjacent.push(v);
      return true;
    }
    return false;
  }

  removeAdjacent(v: Vertex): boolean {
    const index = this.adjacent.indexOf(v);
    if (index > -1) {
      this.adjacent.splice(index, 1);
      return true;
    }
    return false;
  }
}
