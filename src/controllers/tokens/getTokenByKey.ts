import { Token } from "../../models/Token";

export async function getTokenByKey(database: D1Database, key: string): Promise<Token> {
    return await database.prepare(
        "SELECT tokens.*, users.email FROM tokens " +
        "LEFT JOIN users ON users.id = tokens.user AND tokens.type = 'user' " +
        "LEFT JOIN users ON users.id = (SELECT user FROM devices WHERE devices.id = tokens.user) AND tokens.type = 'device' " +
        "WHERE tokens.key = ?"
    ).bind(key).first();
};
