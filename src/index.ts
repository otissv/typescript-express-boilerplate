import { start } from './server';

const PORT = 5000;

async function main() {
  try {
    start(PORT);
  } catch (error) {
    console.error(error);
    return error;
  }
}

main();
