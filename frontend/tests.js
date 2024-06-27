const { RightModel } = require("rights-engine-core");
const person = require("./src/person.json");

function convert(list) {
    return list.map(item => RightModel.convert(item));
}

function test(rights) {
    rights.forEach(right => {
        console.log(right.isMatched(person))
    });
}

console.log(person)
console.log("==========")


// const list = require("../backend/data/rights-array.json");
// const rights = convert(list)
// return test(rights)




fetch("http://localhost:5000/rights")
    .then(res => res.json())
    .then(data => {
        let rights = data.rights.map(item => RightModel.convert(item));
        test(rights)
    })



