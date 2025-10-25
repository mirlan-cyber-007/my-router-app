const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const USERS_FILE = path.resolve(__dirname, 'users-store.json');
function readUsers() {
    try {return JSON.parse(fs.readFileSync(USERS_FILE));} catch (e) {return [];}
}
function writeUsers(u) {fs.writeFileSync(USERS_FILE, JSON.stringify(u, null, 2));}

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

app.post('/register', async (req, res) => {
    const {email, password, name} = req.body;
    if (!email || !password) return res.status(400).json({error: 'email and password required'});
    const users = readUsers();
    if (users.find(u => u.email === email)) return res.status(409).json({error: 'user_exists'});
    const hash = await bcrypt.hash(password, 10);
    const id = (users.reduce((m, u) => Math.max(m, u.id || 0), 0) || 0) + 1;
    const user = {id, email, name: name || '', passwordHash: hash, createdAt: new Date().toISOString()};
    users.push(user);
    writeUsers(users);
    const token = jwt.sign({id: user.id, email: user.email}, JWT_SECRET, {expiresIn: '7d'});
    res.json({token, user: {id: user.id, email: user.email, name: user.name}});
});

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) return res.status(400).json({error: 'email and password required'});
    const users = readUsers();
    const user = users.find(u => u.email === email);
    if (!user) return res.status(401).json({error: 'invalid_credentials'});
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({error: 'invalid_credentials'});
    const token = jwt.sign({id: user.id, email: user.email}, JWT_SECRET, {expiresIn: '7d'});
    res.json({token, user: {id: user.id, email: user.email, name: user.name}});
});

app.get('/me', (req, res) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({error: 'missing_token'});
    const token = auth.split(' ')[1];
    try {
        const data = jwt.verify(token, JWT_SECRET);
        const users = readUsers();
        const user = users.find(u => u.id === data.id);
        if (!user) return res.status(404).json({error: 'not_found'});
        res.json({id: user.id, email: user.email, name: user.name});
    } catch (e) {res.status(401).json({error: 'invalid_token'});}
});

const port = Number(process.env.PORT) || 4242;
app.listen(port, () => console.log('Auth server listening on', port));
// Payment server removed
// Per user request, payment endpoints and Stripe integration were removed.
// This file is a harmless placeholder to avoid startup errors if someone tries to run the server.
// payment server files removed per owner request
// file intentionally left blank

