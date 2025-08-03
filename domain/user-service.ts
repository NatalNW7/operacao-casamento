import database from "@/config/database/database-connection";
import { User, UserDTO } from "./models";

export default class UserService {
    async getOrCreate(user: User): Promise<UserDTO> {
        let userDb = await this.get(user.cpf);
        console.log(userDb)
        if(!userDb){
            return await this.create(user);
        }

        return userDb;
    }

    async create(user: User): Promise<UserDTO> {
        try {
            await database.query(
                `INSERT INTO users (name, whatsapp, email, cpf) VALUES
                ('${user.name}','${user.whatsapp}','${user.email}','${user.cpf}');`
            );
            return await this.get(user.cpf);
        } catch (error) {
            throw error;
        }
    }

    async get(cpf: string): Promise<UserDTO> {
        try {
            const user = await database.query(
                `SELECT * FROM users WHERE cpf = '${cpf}';`
            );
            return user.rows[0];
        } catch (error) {
           throw error; 
        }
    }
}