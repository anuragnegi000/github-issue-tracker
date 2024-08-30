const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());


const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
});