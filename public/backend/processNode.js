// import './nodes/gaussian.js';
const importModules = require('import-modules');
const nodes = importModules('./nodes');

const processNode = async (edge, workdir, sourceNode, targetNode) => {
    /* console.log(nodes)
    console.log(edge);
    console.log(workdir); */
    const targetNodeName = edge.target.split("&")[0];
    const targetNodeId = edge.target.split("&")[1];

    if (Object.keys(nodes).includes(targetNodeName)) {
        console.log("Node found");
        console.log("Processing node: ", sourceNode.id, targetNode.id);
    } else {
        console.log("Node not found");
        return;
    }
    await nodes[targetNodeName](workdir, sourceNode, targetNode);
}

module.exports = processNode;
