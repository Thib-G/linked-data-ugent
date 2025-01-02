import { QueryEngine} from "@comunica/query-sparql";
import { RdfStore } from "rdf-stores";
import { DataFactory } from "rdf-data-factory";
import {BindingsStream} from "@comunica/types";

(async function(){
    // Comunica is a big project, read the docs: https://comunica.dev/docs/query/getting_started/query_app/
    const myEngine = new QueryEngine();
    const DF = new DataFactory();
    const store: RdfStore<number> = RdfStore.createDefault();

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
})();
