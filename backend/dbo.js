
const { MongoClient } = require("mongodb");
const connectionString = process.env.ATLAS_URI;

// let dbConnection;

// module.exports = {
//     connectToServer: async function (callback) {
//         // Implement Database connection
//         try {

//             callback();
//         }
//         catch(err) {
//             callback(err)
//         }
//     },

//     getDb: function () {
//         return dbConnection;
//     },
// };

module.exports = {
    mongoClient: async function () {
        let client;

        try {
            client = new MongoClient(connectionString, {
                useUnifiedTopology: true,
            });
            console.log('Connecting to MongoDB Atlas cluster...');
            await client.connect();
            console.log('Successfully connected to MongoDB Atlas!');
            return client;
        }
        catch (err) {
            console.error('Connection to MongoDB Atlas failed!', err);
            process.exit();
        }
    }
}
