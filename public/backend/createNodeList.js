/**
 * Creates json file with all nodes and its parameters
 */


const fs = require("fs");
const path = require("path");
const importModules = require('import-modules');
const nodes = importModules('./nodes');

const arraysEqual = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

const creator = () => {
    let nodeList = [];
    for (let node in nodes) {
        let nodeObj = {};
        nodeObj.name = node;
        nodeObj.label = nodes[node].label;
        nodeObj.type = nodes[node].type;
        nodeObj.subtype = nodes[node].subtype;
        nodeObj.description = nodes[node].description;
        nodeObj.parameters = nodes[node].parameters;
        nodeList.push(nodeObj);
    }
}

const createNodeList = () => {
    let nodeList = [];
    if(fs.existsSync(path.join(__dirname, "nodeList.json"))) {
        let fileNode = JSON.parse(fs.readFileSync(path.join(__dirname, "nodeList.json")));
        let names = fileNode.map(node => node.name);
        let currentNodes = []
        for (let node in nodes) {
            currentNodes.push(node);
        }
        if(arraysEqual(names, currentNodes)) {
            nodeList = fileNode;
            console.log("No changes");
        } else {
            console.log("Changes detected");
            nodeList = creator();
            fs.writeFileSync(path.join(__dirname, "nodeList.json"), JSON.stringify(nodeList));
        }
    } else {
        nodeList = creator();
        fs.writeFileSync(path.join(__dirname, "nodeList.json"), JSON.stringify(nodeList));
    }
    return nodeList;
}

module.exports = createNodeList;