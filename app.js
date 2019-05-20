const express = require('express');
const app = express();
const port = process.env.PORT || 3000


app.get('/', (req, res) => {
    res.send('Hi there this is me and my heroku website')

})


app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});