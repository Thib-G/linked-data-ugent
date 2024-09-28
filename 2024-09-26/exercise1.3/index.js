import { readFile, writeFile } from 'node:fs/promises';
import { Parser, Writer } from 'n3';

async function main() {
  const quadsData = await readFile('../exercise1.2/nquads.nq', 'utf-8');
  const parser = new Parser({ format: 'N-Quads' });
  const quads = parser.parse(quadsData);
  console.log(quads);

  const writer = new Writer({
    format: 'text/turtle',
    prefixes: {
      schema: 'http://schema.org/',
    },
  });
  writer.addQuads(quads);

  const turtleData = await new Promise((resolve, reject) => {
    writer.end((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });

  console.log(turtleData);
  await writeFile('export.ttl', turtleData, 'utf-8');
}

main();
