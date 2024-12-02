const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});

const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://matsveikavalenka:iuAnynQEMWOezNFd@cluster0.mrktms5.mongodb.net/HW3_DB?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Connected to database');
    } catch (err) {
        console.error('Error connecting to the database', err);
    }
}

connectDB();

const UserModel = require("./models/Users");
const LanguagesModel = require("./models/Languages");

app.get("/getUsers", (req, res) => {
    UserModel.find().then(function (response) {
        res.json(response);
    }).catch(function (err) {
        res.json(err);
    })
});

app.post("/createUser", async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();
    res.json(user)
});

app.put("/updateUser", async (req, res) => {
    console.log(req.body);
    const { id, name, age, username, email } = req.body;

    try {
        const updatedDocument = await UserModel.findByIdAndUpdate(
            id,
            { name, age, username, email },
            { new: true }
        );
        if (!updatedDocument) {
            return res.status(404).send({ error: 'Document not found' });
        }
        res.status(200).send(updatedDocument);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'An error occurred' });
    }
});

app.put("/updateUserLanguages", async (req, res) => {
    console.log(req.body);
    const { id, userId, languages } = req.body;

    try {
        const updatedDocument = await LanguagesModel.findByIdAndUpdate(
            id,
            { userId, languages },
            { new: true }
        );
        if (!updatedDocument) {
            return res.status(404).send({ error: 'Document not found' });
        }
        res.status(200).send(updatedDocument);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'An error occurred' });
    }
});

app.delete("/deleteUser", async (req, res) => {
    try {
        const id = req.body.id;
        await UserModel.findByIdAndDelete(id);
        res.status(200).send("User deleted");
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send("An error occurred while deleting the user.");
    }
});

app.get("/getAllLanguages", (req, res) => {
    LanguagesModel.find().then(function (response) {
        res.json(response);
    }).catch(function (err) {
        res.json(err);
    })
});

app.get("/getLanguagesById", (req, res) => {
    LanguagesModel.findById().then(function (response) {
        res.json(response);
    }).catch(function (err) {
        res.json(err);
    })
});

app.post("/addLanguages", async (req, res) => {
    const languages = req.body;
    const newLanguages = new LanguagesModel(languages);
    await newLanguages.save();
    res.json(languages)
}); 


app.delete("/deleteUserLanguages", async (req, res) => {
    try {
        const id = req.body.id;
        await LanguagesModel.findByIdAndDelete(id);
        res.status(200).send("Languages deleted");
    } catch (error) {
        console.error("Error deleting languages:", error);
        res.status(500).send("An error occurred while deleting the user.");
    }
});