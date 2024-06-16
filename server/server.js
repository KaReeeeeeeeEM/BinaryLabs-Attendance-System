const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
const bodyparser = require('body-parser');
const bcrypt = require('bcryptjs');
require('dotenv').config();
require('./studentSchema');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}
connectDB();

const app = express();

//dependancies
app.use(express.json());
app.use(cors());

//welcome page
app.get('/', (req,res)=>{
    // res.redirect('https://laguku.vercel.app');
    res.status(200).json({message: "Welcome to the Binary Labs Saturday session"})
});

app.post('/register', async (req, res) => {
    const { name, password } = req.body;
    try {
        const student = await mongoose.model('students').findOne({ name });
        if (student) {
            res.status(400).json({ message: 'User already exists' });
        } else {
           const hashedPassword = await bcrypt.hash(password,10);
           const user = await mongoose.model('students').create({ name, password:hashedPassword });
           res.status(201).json({ message: 'User created successfully', user: user });
           console.log('User created successfully', user );
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
});

app.post('/login', async (req, res) => {
    const { name, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password,10);
        const student = await mongoose.model('students').findOne({ name });
        const passwordMatch = await bcrypt.compare(password, hashedPassword);
        if (student && passwordMatch) {
            res.status(200).json({ message: 'Login Successful', user: student, redirectTo: `http://localhost:3000/Dashboard/${student._id}` });
        } else {
            res.status(400).json({ message: 'Invalid Credentials' });
            console.log('Invalid Credentials');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
});

app.get('/student/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const student = await mongoose.model('students').findById(id);
        if (student) {
            res.status(200).json({ message: 'Student found', student: student });
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
});



const PORT = process.env.PORT_NO;
app.listen(PORT, () => console.log("Server is running at port " + PORT));