// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('rights-engine');

// Insert a few documents into the sales collection.
db.getCollection('rights').insertMany([
    {
        "code": 3000,
        "title": "Right 3000",
        "description": "Right 300 description",
        "rule": {
            "condition": "&&",
            "rules": [
                {
                    "field": "civilStatus",
                    "operator": "==",
                    "value": "citizen"
                },
                {
                    "field": "maritalStatus",
                    "operator": "==",
                    "value": "divorced"
                }
            ]
        }
    },
    {
        "code": 3000,
        "title": "Right 3000",
        "description": "Right 300 description",
        "rule": {
            "condition": "&&",
            "rules": [
                {
                    "field": "civilStatus",
                    "operator": "==",
                    "value": "citizen"
                },
                {
                    "field": "maritalStatus",
                    "operator": "==",
                    "value": "divorced"
                }
            ]
        }
    },
]);

