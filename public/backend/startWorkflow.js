const createWorkdir = require("./createWorkdir");
const processNode = require("./processNode");

const checkIfCached = (workflowName, _edges) => {
    let edges = JSON.parse(_edges);
}

const startWorkflow = async (workflowName, edges, nodes) => {
    console.log("Started workflow: " + workflowName);
    const workdir = createWorkdir(workflowName);

    
    for(const edge of edges) {
        const start = nodes.find(node => node.id === edge.source);
        const end = nodes.find(node => node.id === edge.target);
        await processNode(edge, workdir, start, end);
    }
}

module.exports = startWorkflow;