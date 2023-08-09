import { DatabaseSource } from "../../database/databaseSource";
import { Token } from "../../models/Token";

export async function getTokenByKey(databaseSource: DatabaseSource, key: string): Promise<Token | null> {
    return await databaseSource.prepare("SELECT tokens.*, users.email FROM tokens LEFT JOIN users ON users.id = tokens.user WHERE tokens.key = ?", key).first<Token>();
};
