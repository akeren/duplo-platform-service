import {
	CreateDateColumn,
	UpdateDateColumn,
	ObjectIdColumn,
	ObjectId
} from 'typeorm';

export class AbstractEntity<T> {
	@ObjectIdColumn()
	id: ObjectId;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	constructor(entity: Partial<T>) {
		Object.assign(this, entity);
	}
}
