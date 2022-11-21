const fs = require('fs');

const createWorkdir = (workdirName) => {
    const baseDir = process.cwd()+"\\public\\backend\\cache";

    workdirName.replace(" ", "_");
    workdirName.replace("/", "");
    if (!fs.existsSync(`${baseDir}\\${workdirName}`)) {
        fs.mkdirSync(`${baseDir}\\${workdirName}`);
        /* fs.mkdirSync(`${baseDir}\\${workdirName}\\output`);
        fs.mkdirSync(`${baseDir}\\${workdirName}\\input`); */
    }
    return `${baseDir}\\${workdirName}`;
}

module.exports = createWorkdir;