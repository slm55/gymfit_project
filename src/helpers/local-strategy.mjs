import passport from "passport";
import { Strategy } from "passport-local";
import Users from "../repositories/Users.mjs"
import { comparePassword } from "./hash.mjs";

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const findUser = await Users.findById(id);
		if (!findUser) throw new Error("User Not Found");
		done(null, findUser);
	} catch (err) {
		done(err, null);
	}
});

export default passport.use(
	new Strategy(async (username, password, done) => {
		try {
			const findUser = await Users.findOne(username);
			if (!findUser) throw new Error("User not found");
			if (!comparePassword(password, findUser.password))
				throw new Error("Bad Credentials");
			done(null, findUser);
		} catch (err) {
			done(err, null);
		}
	})
);