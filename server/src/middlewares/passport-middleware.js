const passport = require('passport');
const { Strategy } = require('passport-jwt');
const { SECRET } = require('../constants/index');
const db = require('../db/index');


//check if the user sends a cookie called token. If so, return the token
const cookieExtractor = function(req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['token'];
    }
    return token;
};


const opts = {
    secretOrKey: SECRET,
    jwtFromRequest: cookieExtractor
};


passport.use(
    new Strategy(opts, async ({ id }, done) => { //use the id from the token payload
        try {
            const { rows } = await db.query(`SELECT user_id, email FROM users WHERE user_id = $1`, [id]);
            if (!rows.length) {
                throw new Error('401 not authorized');
            }
            const user = {
                id: rows[0].user_id,
                email: rows[0].email
            };
            return await done(null, user);
        } catch(error) {
            console.log(error.message);
            done(null, false);
        }
    })
);
