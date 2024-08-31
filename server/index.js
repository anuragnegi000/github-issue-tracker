const express = require('express');
const cors = require('cors');
const AuthRouter = require('./Controllers/AuthController.js');
const RepoRouter = require('./Controllers/RepoController.js');
const dotenv = require('dotenv');
dotenv.config();

require('./Models/database');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/auth',AuthRouter);
app.use('/repos',RepoRouter);

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
});