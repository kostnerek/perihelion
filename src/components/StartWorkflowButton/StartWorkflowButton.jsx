import "./StartWorkflowButton.css";
import { useContext } from "react";
import NodesContext from "../../context/NodesContext.js";

export const StartWorkflowButton = () => {
    const { edges, nodes, workflow } = useContext(NodesContext);

    const startWorkflow = () => {
        window.startWorkflow({
            workflow: workflow,
            nodes: nodes,
            edges: edges,
        });
    };
    return (
        <div className="start-workflow" onClick={startWorkflow}>
            Start
        </div>
    );
};
