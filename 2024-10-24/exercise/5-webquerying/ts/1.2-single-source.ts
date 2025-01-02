import { QueryEngine} from "@comunica/query-sparql";
import { RdfStore } from "rdf-stores";
import { DataFactory } from "rdf-data-factory";
import {BindingsStream} from "@comunica/types";
import * as fs from "fs";
import {rdfParser} from "rdf-parse";

(async function(){
    // Comunica is a big project, read the docs: https://comunica.dev/docs/query/getting_started/query_app/
    const myEngine = new QueryEngine();
    const store: RdfStore<number> = RdfStore.createDefault();

    // Populate the store with contents of mushrooms.ttl
    await new Promise(resolve =>  rdfParser.parse(fs.createReadStream("mushrooms.ttl"), { contentType: "text/turtle" })
        .on("data", quad => store.addQuad(quad))
        .on("error", error => console.error(error))
        .on("end", resolve));

    // Your code goes here
})();
