const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser');
const UserRoutes = require('./Routes/V1/allUser.Routes');

app.use(cors());
app.use(bodyParser.json());


app.use('/api/v1/users', UserRoutes)


app.get('/', (req, res) => {
    res.send("hello world!")
});

app.all('*', function (req, res) {
    res.send('No Route Found')
});
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}....`)
});