import React from "react";
import ReactFlow, { Handle } from "reactflow";
import "reactflow/dist/style.css";

const circleNodeStyle = {
  width: 40,
  height: 40,
  border: "2px solid black",
  background: "white",
  borderRadius: "50%", // Makes the node a circle
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const GraphVisualizer = ({ nodes, edges }: any) => {
  const calculatePosition = (index: number, total: number) => {
    const width = window.innerWidth - 50;
    const height = window.innerHeight - 50;
    const x = (width / total) * index;
    const y = height / 2;
    return { x, y };
  };

  const formattedNodes = nodes.map((node: any) => {
    // Calculate position or set it randomly
    const position = { x: Math.random() * 400, y: Math.random() * 400 };
    return {
      id: node.id.toString(),
      type: "special",
      position,
      data: { label: node.label },
      style: { ...circleNodeStyle },
    };
  });

  const formattedEdges = edges.map((edge: any) => ({
    id: `e${edge.from}-${edge.to}`,
    source: edge.from.toString(),
    target: edge.to.toString(),
    type: "straight",
    arrowHeadType: "arrowclosed",
  }));

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={formattedNodes}
        edges={formattedEdges}
        fitView
        nodesDraggable={true}
        nodesConnectable={true}
        nodeTypes={{
          special: ({ data }) => (
            <div style={circleNodeStyle}>
              {/* You can adjust the position of these handles */}
              <Handle
                type="target"
                position="top"
                style={{ borderRadius: 0, top: "-5px" }} // Adjust this as needed
              />
              {data.label}
              <Handle
                type="source"
                position="bottom"
                style={{ borderRadius: 0, bottom: "-5px" }} // Adjust this as needed
              />
            </div>
          ),
        }}
      />
    </div>
  );
};

export default GraphVisualizer;
