import {ServiceBroker} from 'moleculer';
import {GetMoleculerConfigs} from './configs';
import {ip} from 'address';
const moleculerConfigs = GetMoleculerConfigs();
export const Broker = new ServiceBroker({
  namespace: moleculerConfigs.namespace,
  nodeID: `${moleculerConfigs.nodeID}_${(ip() as string) || ''}_${process.pid}`,
  transporter: moleculerConfigs.transporter,
  registry: {
    strategy: moleculerConfigs.registry.strategy,
    discoverer: moleculerConfigs.registry.discoverer,
  },
  logger: {
    type: 'File',
    options: {
      folder: './logs',
      filename: 'moleculer-{date}.log',
      formatter: 'json',
      eol: '\n',
      interval: 5 * 1000,
    },
  },
});
