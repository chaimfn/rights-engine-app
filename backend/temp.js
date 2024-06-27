const _rights = require("./data/rights-array.json");
const fs = require("fs")

let rights = [];
let cnt = 0;
for (let i = 0; i < 300; i++) {
    for (let j = 0; j < _rights.length; j++, cnt++) {
        rights.push({
            code: 4000 + cnt,
            title: _rights[j].title + " " + cnt,
            rule: _rights[j].rule,
            origincode: _rights[j].origincode
        });
    }
}

fs.writeFile("./data/rights.json", JSON.stringify(rights, null, 2), (error) => {
    if (error) {
        console.log('An error has occurred ', error);
        return;
    }
    console.log('Data written successfully to disk');
});


