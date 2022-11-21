// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge } = require("electron");
//const createWorkdir = require("./backend/createWorkdir");
const startWorkflow = require("./backend/startWorkflow");
const imageHandler = require("./backend/addImageHandler");
const createNodeList = require("./backend/createNodeList");
// As an example, here we use the exposeInMainWorld API to expose the browsers 
// and node versions to the main window. 
// They'll be accessible at "window.versions".
process.once('loaded', () => {
    contextBridge.exposeInMainWorld("versions", process.versions);

    contextBridge.exposeInMainWorld("startWorkflow", (args) => { 
        startWorkflow(args.workflow, args.edges, args.nodes); 
    });

    contextBridge.exposeInMainWorld("addImage", (args) => {
        imageHandler.addImage(args.workflow, args.id, args.path);
    });

    contextBridge.exposeInMainWorld("checkImageStatus", (args) => {
        return imageHandler.checkStatus(args.workflow, args.id);
    });

    contextBridge.exposeInMainWorld("getNodeList", (args) => {
        return createNodeList();
    });
});