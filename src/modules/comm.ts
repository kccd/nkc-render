import {Broker} from './broker';

export const ServiceActionNames = {};

export function BrokerCall<T>(
  serviceActionName: string,
  params: unknown,
): Promise<T> {
  return Broker.call(serviceActionName, params);
}
