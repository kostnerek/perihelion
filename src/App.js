import { useState } from 'react';
import { useNodesState, useEdgesState } from 'reactflow';

import NodesContext from './context/NodesContext.js';

import EdgeButton from './components/EdgeButton/EdgeButton.jsx';

import StartNode from './components/StartNode/StartNode.jsx';
import NodeCreator from './components/NodeCreator/NodeCreator.jsx';
import AddImageNode from './components/AddImageNode/AddImageNode.jsx';


import Backboard from './containers/Backboard/Backboard.jsx';
import Menu from './containers/Menu/Menu.jsx';

import {nodes as initialNodes, edges as initialEdges} from './containers/Backboard/initial-element.js';
import { StartWorkflowButton } from './components/StartWorkflowButton/StartWorkflowButton.jsx';

function App() {
    console.log(window.getNodeList());
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [nodeTypes, setNodeTypes] = useState({
        start: StartNode,
        gaussian: NodeCreator,
        erode: NodeCreator,
        addImage: AddImageNode
    });
    const [edgeTypes, setEdgeTypes] = useState({
        edgebutton: EdgeButton
    });
    const [workflow, setWorkflow] = useState("test");

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
            setEdgeTypes,
            workflow,
            setWorkflow
        }}>
            <div>
                <Menu />
                <StartWorkflowButton />
                <Backboard />
            </div>
        </NodesContext.Provider>
    );
}

export default App;

/* 

npm link
build-opencv --incDir /usr/include/opencv4/ --libDir /lib/x86_64-linux-gnu/ --binDir=/usr/bin/ --nobuild rebuild

*/