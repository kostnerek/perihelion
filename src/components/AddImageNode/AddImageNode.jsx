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
    const [imgStatus, setImgStatus] = useState(() => {
        const filePath = window.checkImageStatus({
            workflow: workflow,
            id: id,
        });
        if (filePath !== false) {
            return { ...filePath, status: filePath };
        } else return { ...filePath, status: "" };
    });

    const handleFileChange = (event) => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) return;
        event.target.value = null;
        window.addImage({ workflow: workflow, id: id, path: fileObj.path });
        const filePath = window.checkImageStatus({
            workflow: workflow,
            id: id,
        });
        if (filePath !== false) {
            setImgStatus({ ...filePath, status: filePath });
        } else setImgStatus({ ...filePath, status: "" });
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
                style={{ display: imgStatus ? "flex" : "none" }}
            >
                <img src={imgStatus.status} alt="" />
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
