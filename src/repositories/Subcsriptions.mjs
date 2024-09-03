import pool from "../database.mjs";

class Subscriptions {
    static async subscribe(user, expire_date, price) {
        try {
            const result = await pool.query("INSERT INTO subscriptions (user_id, expire_date, price) VALUES ($1, $2) RETURNING *", [user.user_id, expire_date, price]);
            return result.rows[0];
        } catch (e) {
            throw new Error("Error subscribing user");
        }
    }
}

export default Subscriptions;