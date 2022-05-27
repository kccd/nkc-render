import {Broker} from './modules/broker';
import app, {ConsoleApiServiceInfo} from './app';
import {InfoLog} from './modules/logger';

Broker.createService(app);

async function run() {
  await Broker.start();
  InfoLog(`Service[${app.name}] started`);
  ConsoleApiServiceInfo();
}

run().catch(console.error);
