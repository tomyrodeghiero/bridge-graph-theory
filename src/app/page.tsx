// Home.tsx
"use client";

import React, { useState } from "react";
import { UndirectedGraph } from "@/UndirectedGraph";
import { Vertex } from "@/Vertex";
import GraphVisualizer from "@/components/GraphVisualizer";
import { findEssentialFriendships } from "@/function";

export default function Home() {
  const [graph, setGraph] = useState(new UndirectedGraph());
  const [vertexId, setVertexId] = useState("");
  const [connectFrom, setConnectFrom] = useState(""); // ID of the first vertex to connect
  const [connectTo, setConnectTo] = useState(""); // ID of the second vertex to connect
  const [essentialFriendshipsCount, setEssentialFriendshipsCount] = useState(0);

  const updateGraphAndCount = (newGraph: UndirectedGraph) => {
    setGraph(newGraph); // This should create a new graph instance and trigger re-render
    const count = findEssentialFriendships(newGraph);
    setEssentialFriendshipsCount(count);
  };

  const handleAddVertex = () => {
    if (vertexId) {
      const vertexIdNum = parseInt(vertexId);
      // Create a new Vertex instance
      const newVertex = new Vertex(vertexIdNum);
      // Clone the current graph to a new instance
      const newGraph = new UndirectedGraph();
      // Copy over the existing vertices and edges
      graph.vertices().forEach((v) => newGraph.addVertex(new Object(v)));
      graph
        .edges()
        .forEach((e) =>
          newGraph.addEdge(new Object(e.first), new Object(e.second))
        );
      // Try to add the new vertex
      if (newGraph.addVertex(newVertex)) {
        updateGraphAndCount(newGraph);
      }
      setVertexId("");
    }
  };

  const handleRemoveVertex = () => {
    if (vertexId) {
      const vertexIdNum = parseInt(vertexId);
      // Clone the current graph to a new instance
      const newGraph = new UndirectedGraph();
      // Copy over the existing vertices and edges, except the one to remove
      graph.vertices().forEach((v) => {
        if (v.id !== vertexIdNum) {
          newGraph.addVertex(new Object(v));
        }
      });
      graph.edges().forEach((e) => {
        if (e.first.id !== vertexIdNum && e.second.id !== vertexIdNum) {
          newGraph.addEdge(new Object(e.first), new Object(e.second));
        }
      });
      updateGraphAndCount(newGraph);
      setVertexId("");
    }
  };

  const handleConnectVertices = () => {
    const fromVertex = graph
      .vertices()
      .find((v) => v.id === parseInt(connectFrom));
    const toVertex = graph.vertices().find((v) => v.id === parseInt(connectTo));

    if (fromVertex && toVertex) {
      const newGraph = new UndirectedGraph(
        [...graph.vertices()],
        [...graph.edges()]
      );
      if (newGraph.addEdge(fromVertex, toVertex)) {
        updateGraphAndCount(newGraph);
      }
      setConnectFrom("");
      setConnectTo("");
    }
  };

  const nodes = graph.vertices().map((vertex) => ({
    id: vertex.id.toString(),
    label: `Vertex ${vertex.id}`,
  }));

  const edges = graph.edges().map((edge, index) => ({
    from: edge.from.id.toString(),
    to: edge.to.id.toString(),
  }));

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <div className="flex flex-col items-center">
          <input
            type="text"
            value={vertexId}
            onChange={(e) => setVertexId(e.target.value)}
            placeholder="Enter Vertex ID"
            className="border p-2 mb-2"
          />
          <button onClick={handleAddVertex} className="border p-2 mb-2">
            Add Vertex
          </button>
          <button onClick={handleRemoveVertex} className="border p-2 mb-2">
            Remove Vertex
          </button>
          <input
            type="text"
            value={connectFrom}
            onChange={(e) => setConnectFrom(e.target.value)}
            placeholder="Connect From Vertex ID"
            className="border p-2 mb-2"
          />
          <input
            type="text"
            value={connectTo}
            onChange={(e) => setConnectTo(e.target.value)}
            placeholder="Connect To Vertex ID"
            className="border p-2 mb-2"
          />
          <button onClick={handleConnectVertices} className="border p-2 mb-2">
            Connect Vertices
          </button>
          <p className="mt-4">
            Essential Friendships Count: {essentialFriendshipsCount}
          </p>
        </div>
        <GraphVisualizer nodes={nodes} edges={edges} />
      </div>
    </main>
  );
}
