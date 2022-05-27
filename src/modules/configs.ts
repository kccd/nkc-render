import {readFileSync} from 'fs';
import {resolve} from 'path';
import {Configs} from '../interfaces/configs';
import {yamlToJson} from './yaml';

const configFilePath = resolve(__dirname, '../../configs.yaml');
const yamlContent = readFileSync(configFilePath).toString();

const configs = <Configs>yamlToJson(yamlContent);

export function GetMoleculerConfigs() {
  return configs.moleculer;
}

export function GetRenderConfigs() {
  return configs.render;
}
