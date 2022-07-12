import { v4 } from "uuid";
import { IGenerateId } from "../business/ports";

export class IdGenerator implements IGenerateId {
    generateId(): string{
        return v4();
    }
}