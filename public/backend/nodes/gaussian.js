const cv = require('opencv-bindings');
const jimp = require('jimp');
const fs = require("fs");
// eslint-disable-next-line import/no-anonymous-default-export


const gaussian = async (workdir, sourceNode, targetNode) => {
    /*
        Needed parameters:
        - sigmaX
        - sigmaY
        - kernelX
        - kernelY
    */
    const imgPath = `${workdir}\\${sourceNode.id}.png`;
    const sigmaX = targetNode.data.sigmaX;
    const sigmaY = targetNode.data.sigmaY;
    const kernelX = targetNode.data.kernelX;
    const kernelY = targetNode.data.kernelY;


    if (!fs.existsSync(imgPath)) {
        return
    } 
    const jimpSrc = await jimp.read(imgPath);
        let img = await cv.matFromImageData(jimpSrc.bitmap);
        
        let outputDst = new cv.Mat();
        let kSize = new cv.Size(kernelX, kernelY);
        await cv.GaussianBlur(img, outputDst, kSize, sigmaX, sigmaY, cv.BORDER_DEFAULT);

        let imgToSave = new jimp({
            width: outputDst.cols,
            height: outputDst.rows,
            data: Buffer.from(outputDst.data)
        });
        await imgToSave.writeAsync(workdir+"\\"+targetNode.id+".png")
        await img.delete();
}
module.exports = gaussian;