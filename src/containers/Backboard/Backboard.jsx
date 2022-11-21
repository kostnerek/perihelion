import React, { useCallback, useContext } from "react";
import ReactFlow, { addEdge, MiniMap, Controls, Background } from "reactflow";

import "reactflow/dist/style.css";
import "./backboard.css";

import NodesContext from "../../context/NodesContext.js";

const minimapStyle = {
    height: 120,
};

const onInit = (reactFlowInstance) =>
    console.log("flow loaded:", reactFlowInstance);

const Backboard = () => {
    const {
        nodes,
        edges,
        setNodes,
        setEdges,
        onEdgesChange,
        onNodesChange,
        nodeTypes,
        setNodeTypes,
        edgeTypes,
    } = useContext(NodesContext);

    /* const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        []
    ); */

    // we are using a bit of a shortcut here to adjust the edge type
    // this could also be done with a custom edge for example
    const onConnect = useCallback(
        (params) =>
            setEdges((eds) => addEdge({ ...params, type: "edgebutton" }, eds)),
        []
    );

    return (
        <ReactFlow
            nodes={nodes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={onInit}
            fitView
            attributionPosition="bottom-left"
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            edges={edges}
            // connectionLineComponent={ConnectionLine}
        >
            <MiniMap style={minimapStyle} zoomable pannable />
            <Controls />
            <Background
                color="#D2D6DB"
                gap={24}
                style={{ backgroundColor: "#AEA9BA" }}
                size={2}
            />
        </ReactFlow>
    );
};

export default Backboard;
