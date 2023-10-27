import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
	type: 'mongodb',
	url: `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}/${process.env.MONGO_DB_NAME}`,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	synchronize: true,
	logging: true,
	entities: [__dirname + '/entity/*{.js,.ts}'],
	migrations: [],
	subscribers: []
});
