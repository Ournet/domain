import { BaseEntity, BaseEntityId } from "./entities";
import { Repository, RepositoryUpdateData, RepositoryAccessOptions } from "./repository";
import { EntityValidator } from "./entity-validator";

export abstract class BaseRepository<T extends BaseEntity> implements Repository<T> {

    constructor(private validator: EntityValidator<T>) { }

    async create(data: T) {
        data = this.validator.onCreate(data);
        return await this.innerUpdate(data);
    }
    async update(data: RepositoryUpdateData<T>) {
        data = this.validator.onUpdate(data);
        return await this.innerUpdate(data);
    }

    abstract innerCreate(data: T): Promise<T>
    abstract innerUpdate(data: RepositoryUpdateData<T>): Promise<T>
    abstract delete(id: BaseEntityId): Promise<boolean>

    abstract getById(id: BaseEntityId, options?: RepositoryAccessOptions<T>): Promise<T | null>
    abstract getByIds(ids: BaseEntityId[], options?: RepositoryAccessOptions<T>): Promise<T[]>
    abstract exists(id: BaseEntityId): Promise<boolean>
}
