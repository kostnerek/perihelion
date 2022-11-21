import "./AddImageNode.css";
import { useContext } from "react";
import NodesContext from "../../context/NodesContext.js";
import React, { useRef, memo, useState } from "react";
import { Handle } from "reactflow";
import { Icon } from "@iconify/react";

export default memo(({ id, data, isConnectable }) => {
    const inputRef = useRef(null);
    const { workflow } = useContext(NodesContext);
    const handleClick = () => {
        inputRef.current.click();
    };
    const [status, setStatus] = useState(() => {
        const status = window.checkImageStatus({
            workflow: workflow,
            id: id,
        });
        if (status !== false) {
            return status;
        } else return "";
    });

    const handleFileChange = (event) => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) return;
        event.target.value = null;
        window.addImage({ workflow: workflow, id: id, path: fileObj.path });
        const status = window.checkImageStatus({
            workflow: workflow,
            id: id,
        });
        if (status !== false) {
            setStatus(status);
        } else setStatus("");
    };

    return (
        <div className="add-image-node">
            <Handle
                type="target"
                position="left"
                id="_addImage"
                style={{ top: "50%", background: "#555" }}
                isConnectable={isConnectable}
            />
            <div className="header">
                Image
                <Icon icon="mdi:image-add" onClick={handleClick} />
            </div>

            <input
                style={{ display: "none" }}
                ref={inputRef}
                type="file"
                onChange={handleFileChange}
            />
            <div
                className="image-status"
                style={{ display: status ? "flex" : "none" }}
            >
                <img src={status} alt="" />
            </div>
            <Handle
                type="source"
                position="right"
                id="addImage_"
                style={{ top: "50%", background: "#555" }}
                isConnectable={isConnectable}
            />
        </div>
    );
});
