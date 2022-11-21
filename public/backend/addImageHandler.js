const fs = require('fs');
const createWorkdir = require("./createWorkdir");

const addImage = (workflow, id, path) => {
    console.log("addImage called");
    console.log(path);
    console.log(id);
    console.log(workflow);
    // check if file exists and is a file
    const workdirPath = createWorkdir(workflow);
    if (fs.existsSync(path) && fs.lstatSync(path).isFile()) {
        fs.copyFile(path, workdirPath+"\\"+id+".png", (err) => {
            if (err) throw err;
            console.log("File was copied to destination");
        });
        
    } else {
        return
    }
}

const checkStatus = (workflow, id) => {
    const workdirPath = createWorkdir(workflow);
    const file = workdirPath+"\\"+id+".png";
    if (fs.existsSync(file) && fs.lstatSync(file).isFile()) {
        return file;
    }
    return false;
}


module.exports = {
    addImage,
    checkStatus
}