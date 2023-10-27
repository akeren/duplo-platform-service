import './config';
import { Server, createServer } from 'http';
import { app } from './app';
import { AppDataSource } from './data-source';

const port = process.env.APP_PORT || 4000;

async function startServer() {
	try {
		await AppDataSource.initialize();
		console.log('DB connection established successfully');

		const server: Server = createServer(app);

		server.listen(port, () => {
			console.log(`Server listening on port: http://127.0.0.1:${port}`);
		});
	} catch (error) {
		console.error(error);
	}
}

startServer();
