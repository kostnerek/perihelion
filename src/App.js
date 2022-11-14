import { useState } from 'react';
import { useNodesState, useEdgesState } from 'reactflow';

import NodesContext from './context/NodesContext';

import EdgeButton from './components/EdgeButton/EdgeButton';
import CustomNode from './components/CustomNode/CustomNode';
import StartNode from './components/StartNode/StartNode';

import NodeCreator from './components/NodeCreator/NodeCreator';

import Backboard from './containers/Backboard/Backboard';
import Menu from './containers/Menu/Menu';

import {nodes as initialNodes, edges as initialEdges} from './containers/Backboard/initial-element';

function App() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [nodeTypes, setNodeTypes] = useState({
        custom: CustomNode,
        start: StartNode,
        gaussian: NodeCreator,
        uniform: NodeCreator,
    });
    const [edgeTypes, setEdgeTypes] = useState({
        edgebutton: EdgeButton
    });

    return (
        <NodesContext.Provider value={{
            nodes,
            setNodes,
            edges,
            setEdges,
            onNodesChange,
            onEdgesChange,
            nodeTypes,
            setNodeTypes,
            edgeTypes,
            setEdgeTypes
        }}>
            <div>
                <Menu />
                <Backboard />
            </div>
        </NodesContext.Provider>
    );
}

export default App;
