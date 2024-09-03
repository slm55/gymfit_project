import Users from "../repositories/Users.mjs";
import { hashPassword } from "../helpers/hash.mjs";

class AuthController {
    async register(req, res) {
        const { email, username, password } = req.body;

        if (!email || !username ||!password) {
            return res.status(400).json({ message: "Emails, username and password are required." });
        }

        try {
            const existingUser = await Users.findOne(username);

            if (existingUser) {
                return res.status(400).json({ message: "Username already exists." });
            }

            const hashedPassword = hashPassword(password);
            await Users.addUser({ email, username, password: hashedPassword });

            res.sendStatus(201);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async status(req, res) {
       if (req.user) {
        res.status(200).json({ authenticated: true });
       } else {
        res.status(401).json({ authenticated: false });
       }
    }

    async logout(req, res) {
        try {
              req.logout((err) => {
                if (err) {
                  throw new Error("Failed to log out")
                }
                res.sendStatus(200);
              });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

export default AuthController;