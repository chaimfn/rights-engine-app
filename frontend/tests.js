const { RightModel } = require("rights-engine-core");

fetch("http://localhost:5000/rights")
    .then(res => res.json())
    .then(data => {
        console.log(data.rights);
        let list = data.rights.map(item => RightModel.convert(item));
        console.log(list);
    })



