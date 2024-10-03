import { RdfStore } from 'rdf-stores';
import { DataFactory } from 'rdf-data-factory';
import { rdfDereferencer } from 'rdf-dereference';

async function main() {
  const quads = [];

  const { data: jsonld } = await rdfDereferencer.dereference('me.jsonld', { localFiles: true });
  jsonld.on('data', (quad) => quads.push(quad))
      .on('error', (error) => console.error(error))
      .on('end', async () => {
        const { data: ttl} = await rdfDereferencer.dereference('./me.ttl', { localFiles: true });
        ttl.on('data', (quad) => quads.push(quad))
            .on('error', (error) => console.error(error))
            .on('end', () => {
              // Create a new store with default settings
              const store = RdfStore.createDefault();

              // Ingest manually defined data
              const DF = new DataFactory();
              for (const quad of quads) {
                store.addQuad(quad);
              }

              console.log(store.getQuads());
              console.log(store.getQuads().length);
              }
            );
      });

}

main();
