const { QueryEngine } = require("@comunica/query-sparql");
const { RdfStore } = require("rdf-stores");
const { DataFactory } = require("rdf-data-factory");

(async function(){
    // Comunica is a big project, read the docs: https://comunica.dev/docs/query/getting_started/query_app/
    const myEngine = new QueryEngine();
    const DF = new DataFactory();
    const store = RdfStore.createDefault();

    store.addQuad(DF.quad(
        DF.namedNode('https://comunica.dev/#software'),
        DF.namedNode('http://xmlns.com/foaf/0.1/name'),
        DF.literal("Software"),
    ));
    store.addQuad(DF.quad(
        DF.namedNode('https://comunica.dev/'),
        DF.namedNode('http://xmlns.com/foaf/0.1/primaryTopic'),
        DF.namedNode('https://comunica.dev/#website'),
    ));
    store.addQuad(DF.quad(
        DF.namedNode('https://comunica.dev/#website'),
        DF.namedNode('http://xmlns.com/foaf/0.1/name'),
        DF.literal("Website"),
    ));

    // Your code goes here
    const bindingsStream = await myEngine.queryBindings(`
        PREFIX foaf:<http://xmlns.com/foaf/0.1/>

        SELECT ?s ?p ?o 
        WHERE {
          ?s foaf:primaryTopic ?o .
          
        }`, {
        sources: [store],
      });

      bindingsStream.on('data', (binding) => {
        console.log(binding.toString()); // Quick way to print bindings for testing
    
        // console.log(binding.has('s')); // Will be true
        
        // // Obtaining values
        // console.log(binding.get('s').value);
        // console.log(binding.get('s').termType);
        // console.log(binding.get('p').value);
        // console.log(binding.get('o').value);
    });
})();
