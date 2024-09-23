//IMPORT
const dotenv = require('dotenv');
const colors = require('colors');
const db = require('./db_config/db');
const app = require('./app/app');
const PORT = 3000


//SERVER CONNECTION
app.listen(PORT,()=>{
    console.log(`Server is listening at http://localhost:${PORT}`.blue.underline.bold);
})