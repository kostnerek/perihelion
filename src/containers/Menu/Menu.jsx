import { useState, useContext } from "react";
import "./menu.css";
import logo from "./logo.png";
import NodesContext from "../../context/NodesContext";
import { v4 as uuidv4 } from "uuid";
import NodeCreator from "../../components/NodeCreator/NodeCreator";
import { useEdgesState } from "reactflow";

const Menu = () => {
    const { nodes, setNodes, setNodeTypes, edges } = useContext(NodesContext);
    const [showSidemenu, setShowSidemenu] = useState(false);

    const toggleSidemenu = () => {
        setShowSidemenu(!showSidemenu);
    };

    const essa = () => {
        console.log(edges);
    };

    const spawnNode = (nodeType) => {
        /* setNodeTypes((prev) => ({
            ...prev,
            [nodeType]: NodeCreator(nodeType),
        })); */

        console.log("spawn node", nodeType);
        setNodes((prev) => [
            ...prev,
            {
                id: uuidv4(),
                type: nodeType,
                data: { label: nodeType },
                position: { x: 0, y: 0 },
            },
        ]);
        /* setNodes((nodes) => [
            ...nodes,
            {
                id: uuidv4(),
                type: "custom",
                position: { x: 0, y: 0 },
                data: {
                    targetPosition: "right",
                    sourcePosition: "left",
                    selects: {
                        "handle-0": "bezier",
                        "handle-1": "smoothstep",
                    },
                },
            },
        ]); */
    };
    return (
        <>
            <div className={`menu ${showSidemenu ? "" : "box-shadow"}`}>
                <img className="logo" src={logo} onClick={toggleSidemenu} />
                <div className="menu-items">
                    <div
                        className="menu-item"
                        onClick={() => spawnNode("gaussian")}
                    >
                        n
                    </div>
                    <div
                        className="menu-item"
                        onClick={() => spawnNode("uniform")}
                    >
                        i
                    </div>
                    <div className="menu-item" onClick={essa}>
                        i
                    </div>
                </div>
            </div>
            <div className={`side-menu ${showSidemenu ? "show" : ""}`}></div>
        </>
    );
};
export default Menu;
