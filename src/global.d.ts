import { Token } from "./models/Token";

declare global {
    interface RequestWithKey extends Request {
        key: Token;
    };
};
