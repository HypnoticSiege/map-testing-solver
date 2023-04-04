import crypto from 'crypto';
import prisma from '../../prisma'

export function validatePassword(password, hash, salt) {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 60, 'sha512').toString('hex');
    
    return hash === hashVerify;
}
export function generatePassword(password) {
    var salt=crypto.randomBytes(32).toString('hex');
    var genhash = crypto.pbkdf2Sync(password, salt, 10000, 60, 'sha512').toString('hex');
    
    return {
        salt: salt,
        hash: genhash
    };
};

export function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
};

export async function registerUser(email, username, password) {
    const passwordData = generatePassword(password);

    const user = await prisma.users.create({
        data: {
            email: email,
            username: username,
            password: passwordData.hash,
            passwordSalt: passwordData.salt
        }
    });

    return user;
}

export async function authCallback(email, password, done) {
    await prisma.users.findFirst({
        where: {
            email: email
        }
    }).then((user) => {
        if (user == null) {
            return done(null, false);
        } else {
            const isValid = validatePassword(password, user.password, user.passwordSalt);
            const userData = {
                id: user.id,
                email: user.email,
                password: user.password,
                passwordSalt: user.passwordSalt
            }
            if (isValid) {
                return done(null, userData);
            } else {
                return done(null, false);
            }
        }
    })
};