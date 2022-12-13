const cv = require('opencv-bindings');
const jimp = require('jimp');
const fs = require("fs");


const loadImage = async (imgPath) => {
    const fileGuard = () => {
        if (!fs.existsSync(imgPath)) return false
        return true
    }
    if (fileGuard()) {
        const jimpSrc = await jimp.read(imgPath);
        let img = await cv.matFromImageData(jimpSrc.bitmap);
        return img
    }
    return false
}

const saveImage = async (img, imgPath) => {
    let imgToSave = new jimp({
        width: img.cols,
        height: img.rows,
        data: Buffer.from(img.data)
    });
    await imgToSave.writeAsync(imgPath)
}

module.exports = {
    loadImage,
    saveImage
}