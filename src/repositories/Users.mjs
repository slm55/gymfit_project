import pool from "../database.mjs";

class Users {
    static async getUsers() {
        try {
            const result = await pool.query("SELECT * FROM users");
            return result.rows;
        } catch (e) {
            throw new Error("Error fetching users");
        }
    }

    static async addUser(user) {
        try {
            const result = await pool.query("INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *", [user.email, user.username, user.password]);
            return result.rows[0];
        } catch (e) {
            console.log(e)
            throw new Error("Error adding user");
        }
    }

    static async findById(id) {
        try {
            const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
            return result.rows[0];
        } catch (e) {
            throw new Error("Error finding user");
        }
    }

    static async findOne(username) {
        try {
            const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
            return result.rows[0];
        } catch (e) {
            throw new Error("Error finding user by username");
        }
    }
}

export default Users;