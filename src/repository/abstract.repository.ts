import { EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { NotFoundError } from '../errors';
import { AbstractEntity } from '../entity';

export abstract class AbstractRepository<T extends AbstractEntity<T>> {
	constructor(
		private readonly entityRepository: Repository<T>,
		private readonly entityManger: EntityManager
	) {}

	async create(entity: T): Promise<T> {
		return await this.entityManger.save(entity);
	}

	async findOneAndUpdate(
		where: FindOptionsWhere<T>,
		partialEntity: QueryDeepPartialEntity<T>
	): Promise<number> {
		const updateResult = await this.entityRepository.update(
			where,
			partialEntity
		);

		if (!updateResult.affected) {
			console.warn('Entity not found with where query to update', where);

			throw new NotFoundError('Entity not found to update!');
		}

		console.info(`Successfully updated the record`);

		return updateResult.affected;
	}
}
