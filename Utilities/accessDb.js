const fs = require("fs");

module.exports.readDb = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./FakeData/UsersFakeData.json', 'utf-8', (err, data) => {
            resolve(data);
        })
    });
}

module.exports.writeDb = (writeThisData) => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./FakeData/UsersFakeData.json', JSON.stringify(writeThisData), (err) => {
            if (err) throw err;
            else {
                resolve("Data written successfully");
            }
        });
    })

}