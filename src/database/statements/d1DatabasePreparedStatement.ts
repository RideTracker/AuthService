import { D1PreparedStatement } from "@cloudflare/workers-types";
import { DatabasePreparedStatement } from "../databasePreparedStatement";

export class D1DatabasePreparedStatement implements DatabasePreparedStatement {
    constructor(public readonly d1PreparedStatemnt: D1PreparedStatement) {
        this.d1PreparedStatemnt = d1PreparedStatemnt;
    };

    async run(): Promise<void> {
        await this.d1PreparedStatemnt.run();
    };

    async first<T>(columnName?: string): Promise<T | null> {
        if(columnName) {
            const result = await this.d1PreparedStatemnt.first<T>(columnName);

            return result;
        }
        
        const result = await this.d1PreparedStatemnt.first<T>();

        return result;
    };

    async all<T>(): Promise<T[]> {
        const result = await this.d1PreparedStatemnt.all<T>();

        return result.results ?? [];
    };
};
