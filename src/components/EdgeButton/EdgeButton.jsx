import { useContext } from "react";
import { getBezierPath } from "reactflow";
import { Icon } from "@iconify/react";
import NodesContext from "../../context/NodesContext";
import "./index.css";

const foreignObjectSize = 40;

const onEdgeClick = (evt, id) => {
    evt.stopPropagation();
};

export default function EdgeButton({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
}) {
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    const { setEdges } = useContext(NodesContext);

    return (
        <>
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
            <foreignObject
                width={foreignObjectSize}
                height={foreignObjectSize}
                x={labelX - foreignObjectSize / 2}
                y={labelY - foreignObjectSize / 2}
                className="edgebutton-foreignobject"
                requiredExtensions="http://www.w3.org/1999/xhtml"
            >
                <body>
                    <button
                        className="edgebutton"
                        onClick={(event) => {
                            onEdgeClick(event, id);
                            setEdges((edges) =>
                                edges.filter((edge) => edge.id !== id)
                            );
                        }}
                    >
                        <Icon icon="carbon:trash-can" />
                    </button>
                </body>
            </foreignObject>
        </>
    );
}
