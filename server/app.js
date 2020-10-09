const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

// Import Routes
app.use('/api/user', require('./routes/auth'));
app.use('/api/templates', require('./routes/templates'));
app.use('/api/projects', require('./routes/projects'));

if(process.env.NODE_ENV === 'production') {
    
    // static folder
    app.use(express.static(__dirname + '/public/'));

    // handle SPA
    app.get(/.*/, (req, res) => {
        res.sendFile(__dirname + '/public/index.html');
    });
}

/*
app.use((req, res) => {
    res.send('<h1>Error 404 </h1>')
});
*/
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(port + ' portu dinleniyor'));
