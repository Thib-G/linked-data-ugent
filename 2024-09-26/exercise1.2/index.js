const jsonld = require('jsonld');
const { readFile, writeFile } = require('node:fs/promises');

const main = async () => {
  const doc = JSON.parse(await readFile('../exercise1.1/solution.jsonld', 'utf-8'));
  console.log(doc);

  const nquads = await jsonld.toRDF(doc, {format: 'application/n-quads'});
  console.log(nquads);
  await writeFile('nquads.nq', nquads, 'utf-8');

  const frame = JSON.parse(await readFile('frame.jsonld', 'utf-8'));
  const framed = await jsonld.frame(doc, frame);
  console.log(framed);
  await writeFile('framed.jsond', JSON.stringify(framed, null, 2), 'utf-8');
};

main();
