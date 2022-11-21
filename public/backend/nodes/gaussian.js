const cv = require('opencv-bindings');
const nodeUtils = require("../utils/node");

const gaussian = async (workdir, sourceNode, targetNode) => {
    const imgPath = `${workdir}\\${sourceNode.id}.png`;
    const imgSavePath = `${workdir}\\${targetNode.id}.png`;
    
    const sigmaX = targetNode.data.sigmaX;
    const sigmaY = targetNode.data.sigmaY;
    const kernelX = targetNode.data.kernelX;
    const kernelY = targetNode.data.kernelY;

    console.log(`
        Gaussian:
        - sigmaX: ${sigmaX}
        - sigmaY: ${sigmaY}
        - kernelX: ${kernelX}
        - kernelY: ${kernelY}`
    );
    
    let img = await nodeUtils.loadImage(imgPath);
    
    let outputDst = new cv.Mat();
    let kSize = new cv.Size(kernelX, kernelY);
    await cv.GaussianBlur(img, outputDst, kSize, sigmaX, sigmaY, cv.BORDER_DEFAULT);
    await nodeUtils.saveImage(outputDst, imgSavePath);
}
module.exports = {
    init: gaussian,
    label: "Gaussian",
    type: "filter",
    subtype: "blur",
    description: "Applies Gaussian blur to the image",
    parameters: {
        sigmaX: {
            label: "Sigma X",
            type: "number",
            range: [0, Infinity],
            default: 0,
            step: 1,
            description: "Sigma X"
        },
        sigmaY: {
            label: "Sigma Y",
            type: "number",
            range: [0, Infinity],
            default: 0,
            step: 1,
            description: "Sigma Y"
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
        }
    }
}