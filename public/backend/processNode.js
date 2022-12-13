// import './nodes/gaussian.js';
const importModules = require('import-modules');
const nodes = importModules('./nodes');

const processNode = async (edge, workdir, sourceNode, targetNode) => {
    const [targetNodeName, targetNodeId] = edge.target.split("&");

    if (Object.keys(nodes).includes(targetNodeName)) {
        console.log("Node found");
        console.log("Processing node:\n src:", sourceNode.id, "trgt:", targetNode.id);
    } else {
        console.log("Node not found");
        return;
    }
    await nodes[targetNodeName].init(workdir, sourceNode, targetNode);
}

module.exports = processNode;
