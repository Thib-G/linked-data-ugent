//import { ActorHttpInruptSolidClientAuthn } from '@comunica/actor-http-inrupt-solid-client-authn';
import { QueryEngine } from '@comunica/query-sparql-link-traversal-solid';

const queryEngine = new QueryEngine();

/**
 * By omitting the 'sources' entry, we are causing the engine to extract the
 * set of initial IRIs from the query itself. For example, if the query contains
 * the IRI of someone's WebID, then the engine will use that one as the starting
 * point, and will look it up first.
 * 
 * Optionally, a Session object can be provided to authenticate to Solid pods.
 * The key of this property entry uses the full string key value, because there
 * exists no shortcut. By default, with no session defined, Comunica appears
 * unauthenticated to Solid pods while traversing them. This Session class
 * object can be acquired from one of the Inrupt Solid auth libraries:
 * https://github.com/inrupt/solid-client-authn-js
 * 
 * The 'lenient' flag will instruct Comunica to not fail immediately when an IRI
 * cannot be dereferenced. During link traversal, a lot of links are encountered
 * that do not lead anywhere or that require additional authentication, making
 * this flag essentially required for queries over real-world data.
 * 
 * Unfortunately, the lenient flag also silently excludes all data behind
 * inaccessible or temporarily unavailable links from the query results.
 * Within controlled environment where every link is expected to be accessible,
 * this flag should probably be omitted.
 */
const queryContext = {
  // [ActorHttpInruptSolidClientAuthn.CONTEXT_KEY_SESSION.name]: session,
  lenient: true,
};

/**
 * Exercise 3.1: Names and email addresses of everyone Ruben Taelman knows
 * 
 * This query should traverse from Ruben T's WebID to the WebIDs he knows,
 * and then extract the names and email address from there.
 * 
 * Bonus/catch: The query keeps running for a long time without producing
 * further results. Why? And how to terminate it (in theory)?
 */
async function exercise_3_1() {
  const query = `
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
 
    SELECT ?person ?p ?o WHERE {
        <https://www.rubensworks.net/#me> foaf:knows ?person .
        ?person ?p ?o .
        
    }
  `;

  const bindingsStream = await queryEngine.queryBindings(query, queryContext);

  for await (const bindings of bindingsStream) {
    console.log(bindings.toString());
  }
}

/**
 * Exercise 3.2: Find all blog posts from Ruben Verborgh from 2020.
 * 
 * This query should traverse from Ruben V's WebID to the blog posts he made,
 * and return the blog post IRIs, headlines and publication dates.
 * 
 * The following could be useful for this exercise:
 *  - FILTER
 *  - year()
 */
async function exercise_3_2() {
  const query = `
    PREFIX schema: <http://schema.org/>

    PREFIX foaf: <http://xmlns.com/foaf/0.1/>

    SELECT ?post ?published ?headline WHERE {
      ?post a schema:BlogPosting .
      ?post foaf:maker <https://ruben.verborgh.org/profile/#me> .
      ?post schema:datePublished ?published .
      ?post schema:headline ?headline .

      FILTER (year(?published) = 2020)
    }
  `;

  const bindingsStream = await queryEngine.queryBindings(query, queryContext);

  for await (const bindings of bindingsStream) {
    console.log(bindings.toString());
  }
}

/**
 * Exercise 3.3: The number of shared interests.
 * 
 * Calculate the number of shared interests between Ruben T and the people he
 * knows, starting from his WebID. The query should return the person whom
 * Ruben T knows, as well as the total count of distinct shared interests.
 * 
 * The following could be useful for this exercise:
 *  - GROUP BY
 *  - COUNT
 *  - DISTINCT
 *  - FILTER
 */
async function exercise_3_3() {
  const query = `
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>

    @TODO
  `;

  const bindingsStream = await queryEngine.queryBindings(query, queryContext);

  for await (const bindings of bindingsStream) {
    console.log(bindings.toString());
  }
}

/**
 * Exercise 3.4: Co-authored publication count.
 * 
 * Count the number of publications Ruben T has co-authored with the people he
 * knows, if he has co-authored something with them. Then order them based on
 * this co-authored publication count.
 * 
 * Bonus/catch: Does the data look weird? It should! Why does it look weird?
 * 
 * The following could be useful for this exercise:
 *  - GROUP BY
 *  - COUNT
 *  - ORDER BY
 */
async function exercise_3_4() {
  const query = `
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    PREFIX schema: <http://schema.org/>

    @TODO
  `;

  const bindingsStream = await queryEngine.queryBindings(query, queryContext);

  for await (const bindings of bindingsStream) {
    console.log(bindings.toString());
  }
}

/**
 * Example: Traversing within a single pod.
 * 
 * The query has been taken from the SolidBench benchmark, and it will find the
 * messages creates by the specified WebID's owner.
 */
async function example_single_pod() {
  const query = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX snvoc: <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/>

    SELECT ?messageId ?messageCreationDate ?messageContent WHERE {
      ?message snvoc:hasCreator <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>;
        rdf:type snvoc:Post;
        snvoc:content ?messageContent;
        snvoc:creationDate ?messageCreationDate;
        snvoc:id ?messageId.
    }
  `;

  const bindingsStream = await queryEngine.queryBindings(query, queryContext);

  for await (const bindings of bindingsStream) {
    console.log(bindings.toString());
  }
}

/**
 * Example: Traversing over multiple pods.
 * 
 * The query has been taken from the SolidBench benchmark, and it will find the
 * messages/comments from others in reply to something that the owner of the
 * provided WebID has liked.
 */
async function example_multiple_pods() {
  const query = `
    PREFIX snvoc: <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/>

    SELECT DISTINCT ?creator ?messageContent WHERE {
      <https://solidbench.linkeddatafragments.org/pods/00000006597069767117/profile/card#me> snvoc:likes _:g_0.
      _:g_0 (snvoc:hasPost|snvoc:hasComment) ?message.
      ?message snvoc:hasCreator ?creator.
      ?otherMessage snvoc:hasCreator ?creator;
        snvoc:content ?messageContent.
    } LIMIT 10
  `;

  const bindingsStream = await queryEngine.queryBindings(query, queryContext);

  for await (const bindings of bindingsStream) {
    console.log(bindings.toString());
  }
}

// These can be un-commented to run them
// await exercise_3_1()
await exercise_3_2()
//await exercise_3_3()
//await exercise_3_4()

// Examples to try out
// await example_single_pod()
// await example_multiple_pods()
