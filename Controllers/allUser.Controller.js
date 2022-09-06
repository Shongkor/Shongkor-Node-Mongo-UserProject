const DataBase = require('../Utilities/accessDb');

module.exports.allUsers = (req, res) => {
    let {
        limit
    } = req.query;
    limit = parseInt(limit);
    console.log(limit);
    if (!limit) {
        res.send("Please Provide an limit");
    } else {
        DataBase.readDb()
            .then(usersArray => {
                usersArray = JSON.parse(usersArray);
                res.send(usersArray.slice(0, limit))
            });
    }


}


module.exports.randomUser = (req, res) => {
    const {
        random
    } = req.params;
    DataBase.readDb()
        .then(usersArray => {
            usersArray = JSON.parse(usersArray);
            res.send(usersArray.filter(item => item.Id === parseInt(random)));
        })
    // fs.readFile('./FakeData/UsersFakeData.json', 'utf-8', (err, data) => {
    //     usersArray = JSON.parse(data);
    //     res.send(usersArray.filter(item => item.Id === parseInt(random)));
    // })

}
module.exports.addUser = (req, res) => {
    // console.log(JSON.stringify(req.body));

    DataBase.readDb()
        .then(usersArray => {
            const newUsers = req.body
            console.log(newUsers);
            if (!newUsers.Id || !newUsers.gender || !newUsers.name || !newUsers.contact || !newUsers.address || !newUsers.photoUrl) {
                res.send("Required properties are not provided in the body");
            } else {
                usersArray = JSON.parse(usersArray)
                usersArray.push(req.body)
                DataBase.writeDb(usersArray)
                    .then(returnRes => res.status(200).send(usersArray))
            }
        })
    // fs.readFile('./FakeData/UsersFakeData.json', 'utf-8', (err, data) => {
    //     const usersArray = JSON.parse(data);
    //     usersArray.push(req.body);
    //     console.log(usersArray);

    //     fs.writeFile('./FakeData/UsersFakeData.json', JSON.stringify(usersArray), (err) => {
    //         res.send(usersArray);
    //     });
    // })


}
module.exports.updateUser = (req, res) => {
    const {
        random
    } = req.params;


    DataBase.readDb()
        .then(allUser => {
            allUsers = JSON.parse(allUser)
            let selectedUser = allUsers.find(user => user.Id === parseInt(random));
            // console.log(req.body);
            // selectedUser.Id = req.body.Id;
            // selectedUser.gender = req.body.gender;
            // selectedUser.name = req.body.name;
            // selectedUser.contact = req.body.contact;
            // selectedUser.address = req.body.address;
            // selectedUser.photoUrl = req.body.photoUrl;
            Object.assign(selectedUser, req.body)


            DataBase.writeDb(allUsers)
                .then(sig => res.status(200).send(allUsers))
        })
};

module.exports.deleteUser = (req, res) => {
    const {
        random
    } = req.params;
    console.log(random);
    DataBase.readDb()
        .then(allUser => {
            allUsers = JSON.parse(allUser)
            let selectedUser = allUsers.find(user => user.Id === parseInt(random));
            if (!selectedUser) {
                res.status(404).send("User not found");
            } else {
                const RemainingUsers = allUsers.filter(user => user.Id !== parseInt(random))
                DataBase.writeDb(RemainingUsers)
                    .then(sig => res.status(200).send(RemainingUsers))
            }
        })
};