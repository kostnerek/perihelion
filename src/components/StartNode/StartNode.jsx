import React, { memo } from "react";
import { Handle } from "reactflow";

import "./startNode.css";

export default memo(({ data, isConnectable }) => {
    return (
        <div className="start-node">
            <div>Start</div>
            <Handle
                type="source"
                position="right"
                id="_start_"
                style={{ top: "50%", background: "#555" }}
                isConnectable={isConnectable}
            />
        </div>
    );
});
