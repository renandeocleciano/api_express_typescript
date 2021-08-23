const passport = require('passport');
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserServices } from '../user/user-services';

export class AuthServices {
    private secret: string;

    constructor(secret: string) {
        this.secret = secret;
    }

    setStrategy() {
        let opts = {
            secretOrKey: this.secret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT')
        };

        passport.use(new Strategy(opts, (jwtPayload, done) => {
            let id = jwtPayload.id;
            new UserServices().getById(id).then(user => {
                if(user) {
                    return done(null, {
                        id: user._id,
                        email: user.email
                    });
                }
                return done(null, false);
            }).catch(error => {
                done(error, null);
            })
        }));

        return {
            initialize: () => passport.initialize(),
            authenticate: () => passport.authenticate('jwt', { session: false })
        }
    }
}