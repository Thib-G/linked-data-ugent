const { QueryEngine } = require("@comunica/query-sparql");
const { RdfStore } = require("rdf-stores");
const { rdfParser } = require("rdf-parse");
const fs = require("fs");


(async function(){
    // Comunica is a big project, read the docs: https://comunica.dev/docs/query/getting_started/query_app/
    const myEngine = new QueryEngine();
    const store = RdfStore.createDefault();

    // Populate the store with contents of mushrooms.ttl
    await new Promise(resolve =>  rdfParser.parse(fs.createReadStream("mushrooms.ttl"), { contentType: "text/turtle" })
        .on("data", quad => store.addQuad(quad))
        .on("error", error => console.error(error))
        .on("end", resolve));

    // Your code goes here
})();
