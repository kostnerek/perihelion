import { useState, useContext } from "react";
import "./menu.css";
import logo from "./logo.png";
import NodesContext from "../../context/NodesContext.js";
import { v4 as uuidv4 } from "uuid";

const Menu = () => {
    const { setNodes, edges, nodes } = useContext(NodesContext);
    const [showSidemenu, setShowSidemenu] = useState(false);

    const toggleSidemenu = () => {
        setShowSidemenu(!showSidemenu);
    };

    const essa = () => {
        console.log(edges);
        console.log(nodes);
    };

    const spawnNode = (nodeType) => {
        console.log("spawn node", nodeType);
        setNodes((prev) => [
            ...prev,
            {
                id: nodeType + "&" + uuidv4(),
                type: nodeType,
                data: { label: nodeType },
                position: { x: 0, y: 0 },
            },
        ]);
    };
    return (
        <>
            <div className={`menu ${showSidemenu ? "" : "box-shadow"}`}>
                <img
                    className="logo"
                    src={logo}
                    onClick={toggleSidemenu}
                    alt="logo"
                />
                <div className="menu-items">
                    <div
                        className="menu-item"
                        onClick={() => spawnNode("gaussian")}
                    >
                        n
                    </div>
                    <div
                        className="menu-item"
                        onClick={() => spawnNode("erode")}
                    >
                        i
                    </div>
                    <div className="menu-item" onClick={essa}>
                        edges
                    </div>
                </div>
            </div>
            <div className={`side-menu ${showSidemenu ? "show" : ""}`}></div>
        </>
    );
};
export default Menu;
