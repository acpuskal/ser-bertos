console.log("JS program")
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

const users = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/register', async (req, res) => {
  const { email, password } = req.body;

if (users.some((user) => user.email === email)) {
    return res.send('Email already registered.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({
    email,
    password: hashedPassword,
  });

  res.send('Registration successful!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});