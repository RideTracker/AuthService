import { Client, createClient } from "@libsql/client/web";
import { DatabasePreparedStatement } from "../databasePreparedStatement";
import { DatabaseSource } from "../databaseSource";
import { DatabaseValue } from "../databaseValue";
import { TursoDatabasePreparedStatement } from "../statements/tursoDatabasePreparedStatement";

export class TursoDatabaseSource implements DatabaseSource {
    private static client: Client;

    constructor(tursoUrl: string, tursoToken: string) {
        if(!TursoDatabaseSource.client || TursoDatabaseSource.client.closed) {
            TursoDatabaseSource.client = createClient({
                url: tursoUrl.replace("libsql://", "wss://"),
                authToken: tursoToken
            });
        }
    };

    async batch<T>(preparations: TursoDatabasePreparedStatement[]): Promise<T[][]> {
        const results = await TursoDatabaseSource.client.batch(preparations.map((preparedStatement) => preparedStatement.tursoPreparedStatement));

        return results.map((result) => {
            return result.rows as T[];
        });
    };
    
    prepare(statement: string, ...args: DatabaseValue[]): DatabasePreparedStatement {
        return new TursoDatabasePreparedStatement(TursoDatabaseSource.client, {
            sql: statement,
            args: args
        });
    };
};
