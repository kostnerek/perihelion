const cv = require('opencv-bindings');
const nodeUtils = require("../utils/node");


const erode = async (workdir, sourceNode, targetNode) => {
    const imgPath = `${workdir}\\${sourceNode.id}.png`;
    const imgSavePath = `${workdir}\\${targetNode.id}.png`;
    
    const kernelX = targetNode.data.kernelX;
    const kernelY = targetNode.data.kernelY;
    const anchorX = targetNode.data.anchorX;
    const anchorY = targetNode.data.anchorY;
    const iterations = targetNode.data.iterations;
    const customKernel = targetNode.data.customKernel;

    console.log(`
        Erode:
        - kernelX: ${kernelX}
        - kernelY: ${kernelY}
        - anchorX: ${anchorX}
        - anchorY: ${anchorY}
        - iterations: ${iterations}
        - customKernel: ${customKernel}
    `);
    
    let img = await nodeUtils.loadImage(imgPath);
    
    let outputDst = new cv.Mat();
    let M;
    if(customKernel && customKernel.length === kernelX * kernelY) {
        M = new cv.matFromArray(kernelX, kernelY, cv.CV_8U, customKernel);
    } else {
        M = cv.Mat.ones(kernelX, kernelY, cv.CV_8U);
    }
    console.log(M);
    let anchor = new cv.Point(anchorX, anchorY);
    cv.erode(img, outputDst, M, anchor, iterations , cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());


    await nodeUtils.saveImage(outputDst, imgSavePath);
}
module.exports = {
    init: erode,
    label: "Erode",
    type: "filter",
    subtype: "morporology",
    description: "Applies erosion to the image",
    parameters: {
        anchorX: {
            label: "Anchor X",
            type: "number",
            range: [0, "ImgWidth"],
            default: -1,
            step: 1,
            description: "Anchor X"
        },
        anchorY: {
            label: "Anchor Y",
            type: "number",
            range: [0, "ImgHeight"],
            default: -1,
            step: 1,
            description: "Anchor Y"
        },
        kernelX: {
            label: "Kernel X",
            type: "number",
            range: [1, Infinity],
            default: 1,
            step: 2,
            description: "Kernel X - must be odd"
        },
        kernelY: {
            label: "Kernel Y",
            type: "number",
            range: [1, Infinity],
            default: 1,
            step: 2,
            description: "Kernel Y - must be odd"
        },
        iterations: {
            label: "Iterations",
            type: "number",
            range: [1, Infinity],
            default: 1,
            step: 1,
            description: "How many times to apply the erosion"
        },
        customKernel: {
            label: "Custom Kernel",
            type: "array",
            default: [],
            description: "Default kernel is a defined by kernelX and kernelY filled with ones, you can define your own kernel here in form of array of size kernelX * kernelY (e.g. [1,0,1,0,1,0,1,0,1])"
        }
    }
}