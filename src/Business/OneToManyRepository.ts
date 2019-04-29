import { BasicRepository } from "./BasicRepository";
import { getMany } from "../DataAccess/getMany";
import { getClassName } from "../helper";

export class OneToManyRepository<T1, T2> extends BasicRepository<T1> {
    public readonly manyClassName : string;
    private manyType : new () => T2;

    constructor(oneType: new () => T1, manyType: new() => T2) {
        super(oneType);
        this.manyType = manyType;
        this.manyClassName = getClassName(manyType);
    }

    public async getMany(id: number): Promise<T2[]> {
        return await getMany<T1, T2>(this.type, this.manyType, id);
    }
}