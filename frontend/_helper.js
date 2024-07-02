const { RightModel } = require("rights-engine-core");
const _rights = require("../backend/data/rights-array.json");
const fs = require("fs")

const rights = _rights.map(right => RightModel.convert(right));
const fields = RightModel.getPopularFields(rights)
let person = {};
fields.forEach(field => {
    console.log(Object.keys(field)[0])
    person[Object.keys(field)[0]] = null;
});
fs.writeFile("./_person.txt", JSON.stringify(person, null, 2), (error) => {
    if (error) {
        console.log('An error has occurred ', error);
        return;
    }
    console.log('Data written successfully to disk');
});


