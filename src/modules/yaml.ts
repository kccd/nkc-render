import {readFile} from 'fs/promises';
import {parse} from 'yaml';

export async function readYamlFileAsJson(yamlFilePath: string): Promise<never> {
  const yamlContent = await readFile(yamlFilePath);
  return yamlToJson(yamlContent.toString());
}

export function yamlToJson(yamlContent: string): never {
  return <never>parse(yamlContent);
}
