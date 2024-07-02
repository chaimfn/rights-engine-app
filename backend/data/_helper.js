const _rights = require("./rights-array.json");
const fs = require("fs")


function generateRights() {
    let rights = [];
    let cnt = 0;
    for (let i = 0; i < 200; i++) {
        for (let j = 0; j < _rights.length; j++, cnt++) {
            rights.push({
                code: `${cnt}-${_rights[j].code}`,
                title: _rights[j].title + " " + cnt,
                rule: _rights[j].rule
            });
        }
    }

    fs.writeFile("./rights.json", JSON.stringify(rights, null, 2), (error) => {
        if (error) {
            console.log('An error has occurred ', error);
            return;
        }
        console.log('Data written successfully to disk');
    });
}

generateRights()