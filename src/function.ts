import { Edge } from "./Edge";
import { UndirectedGraph } from "./UndirectedGraph";
import { Vertex } from "./Vertex";

export function findEssentialFriendships(graph: UndirectedGraph): number {
  let time = 0;
  const visited: boolean[] = [];
  const discoveryTime: number[] = [];
  const low: number[] = [];
  const parent: number[] = [];
  const bridges: Edge[] = []; // Asumiendo que tienes una clase Edge

  for (let i = 0; i < graph.vertexCount(); i++) {
    parent[i] = -1;
    visited[i] = false;
  }

  for (let i = 0; i < graph.vertexCount(); i++) {
    if (!visited[i]) {
      DFS(i, visited, discoveryTime, low, parent, bridges, graph);
    }
  }

  return bridges.length;

  function DFS(
    u: number,
    visited: boolean[],
    disc: number[],
    low: number[],
    parent: number[],
    bridges: Edge[],
    graph: UndirectedGraph
  ) {
    visited[u] = true;
    disc[u] = low[u] = ++time;

    const adjacents = graph.getAdjacents(new Vertex(u + 1)); // Ajustar índice si es necesario

    adjacents.forEach((v) => {
      const vIndex = v.id - 1; // Ajustar índice si es necesario

      if (!visited[vIndex]) {
        parent[vIndex] = u;
        DFS(vIndex, visited, disc, low, parent, bridges, graph);

        low[u] = Math.min(low[u], low[vIndex]);

        if (low[vIndex] > disc[u]) {
          bridges.push(new Edge(new Vertex(u + 1), new Vertex(vIndex + 1))); // Ajustar índice si es necesario
        }
      } else if (vIndex !== parent[u]) {
        low[u] = Math.min(low[u], disc[vIndex]);
      }
    });
  }
}
