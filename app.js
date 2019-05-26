const express = require('express');
const path = require('path');
const pagesRoutes = require('./src/routes/pagesRoutes');
const authRoutes = require('./src/routes/authRoutes')
const adminRoutes = require('./src/routes/adminRoutes')
const app = express();
const port = process.env.PORT || 3000;
// Set express urlencoded middlewear
app.use(express.urlencoded({
    extended: false
}))

app.use(express.json())


// set views folder
app.set('views', path.join(__dirname, '/src/views'));
// set view engine
app.set('view engine', 'ejs');

// set the public folder
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', pagesRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes)
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});


/// body parser is now included in express, since around half a year, now we need only express