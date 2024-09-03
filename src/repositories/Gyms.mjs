import pool from "../database.mjs";

class Gyms {
    static async getGyms() {
        try {
            const result = await pool.query("SELECT * FROM gyms");
            return result.rows;
        } catch (e) {
            throw new Error("Error fetching gyms");
        }
    }

    static async addGym(gym) {
        try {
            const result = await pool.query("INSERT INTO gyms (name, address, phone, area, description ) VALUES ($1, $2, $3) RETURNING *", [gym.name, gym.address, gym.phone, gym.area, gym.description]);
            return result.rows[0];
        } catch (e) {
            throw new Error("Error adding gym");
        }
    }

    static async getGymById(id) {
        try {
            const result = await pool.query("SELECT * FROM gyms WHERE id = $1", [id]);
            return result.rows[0];
        } catch (e) {
            throw new Error("Error fetching gym by id");
        }
    }
}

export default Gyms;