import { app, start } from './server';
import api from './api/routes.api';
import { database } from './database';

const PORT = 5000;

async function main() {
  try {
    api(app, { database });

    start(PORT);
  } catch (error) {
    console.error(error);
    return error;
  }
}

main();
