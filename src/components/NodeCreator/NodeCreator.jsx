import React, { memo } from "react";
import { Handle } from "reactflow";
import "./index.css";

export default memo(({ data, isConnectable }) => {
    return (
        <div className="node-creator">
            <Handle
                type="target"
                position="left"
                id={`_${data.label}`}
                style={{ top: "50%", background: "#555" }}
                onConnect={(params) => console.log("handle onConnect", params)}
                isConnectable={isConnectable}
            />
            <div>{data.label}</div>
            <Handle
                type="source"
                position="right"
                id={`${data.label}_`}
                style={{ top: "50%", background: "#555" }}
                isConnectable={isConnectable}
            />
        </div>
    );
});
