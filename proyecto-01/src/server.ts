import createApp from './app';
import handleMongoConnection from './db';

const app = createApp();

// Start the server after MongoDB is connected
const startServer = async () => {
    await handleMongoConnection();  // Ensure MongoDB is connected first

    app.listen(3000, () => {
        console.log('Server listening on port 3000.');
    });
};

startServer();
