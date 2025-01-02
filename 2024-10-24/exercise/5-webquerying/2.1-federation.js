const { QueryEngine } = require("@comunica/query-sparql");
const { DataFactory } = require("rdf-data-factory");
const { RdfStore } = require("rdf-stores");

(async function(){
    const myEngine = new QueryEngine();

    const context = {
        sources: [
            'https://www.rubensworks.net/',
            'https://fragments.dbpedia.org/2016-04/en',
        ],
    };

    // Your code goes here
})();
