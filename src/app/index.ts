import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import prisma from '../prisma';
import { registerUser, isAuth, authCallback } from './controllers/auth.controller';
import path from 'node:path';

const port = 3000;
const app = express()
    .use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 31556926000
        }
    }))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(passport.initialize())
    .use(passport.session())
    .use(express.static('public'))
    .use('/assets', express.static(__dirname + 'public/'))
    .set('view engine', 'ejs')
    .use(express.static(path.join(__dirname, 'views')));
express.static(path.join(__dirname, "./public"));

app.get('/', async function (req, res) {
    res.render('index')
});
app.get('/login', async function (req, res) {
    res.render('login')
});
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));
app.get('/register', async function (req, res) {
    res.render('register')
});
app.post('/register', async function (req, res) {
    await registerUser(req.body.email, req.body.username, req.body.password);
    res.redirect('/login');
});
app.listen(port, function () {
    console.log(`[APP] Initialized on localhost:${port}`)
});

const strategy = new LocalStrategy(
    {
        usernameField:'email',
        passwordField:'password',
    },
    authCallback
);

passport.use(strategy);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    prisma.users.findUnique({
        where: {
            id: id
        }
    }).then(user => {
        done(null, user);
    }).catch(err => {
        done(err, null);
    });
});

export default app;