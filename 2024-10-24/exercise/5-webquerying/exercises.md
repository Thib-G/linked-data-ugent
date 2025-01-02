# 1: Query a local dataset

We start with the centralized case.
We use the SPARQL query engine Comunica to query over local, fixed data.
To Comunica however, this data is still viewed as "dynamic" and thus it cannot create any indexes to speed up the query process.
(Not that it would matter in the small dataset we use here.)

Useful resources:
* https://comunica.dev/docs/query/getting_started/query_app/
* https://www.w3.org/TR/sparql11-query/

## a) Simple Query

Query the local dataset to determine the name of the primary topic of https://comunica.dev/.

## b) More complex query

Now that you know how to query a local dataset, let's try a harder query that introduces some more SPARQL features.
Query languages that work over graphs provide easy tools to recursively traverse the graph.
SPARQL is no exception as it provides ways to [recursively follow the properties](https://www.w3.org/TR/sparql11-query/#propertypaths) of a resource.

This exercise is quite a bit more challenging than the previous one.
You are instructed to find all `species` of mushrooms.
You are expected to find 3 species of mushrooms within the `mushrooms.ttl` dataset.

Good Luck!


# 2: Query federated datasets

In the second case, our data is federated.
Meaning our data is no longer at the same location as our query engine.
Instead, we query over a fixed list of sources.

## Query over a big centralized dataset and a WebID

We will use two remote datasets, accessible over the web.
Note that the API of both interfaces are different, Comunica abstracts this away for us.
For DBPedia we use a [TPF](https://linkeddatafragments.org/specification/triple-pattern-fragments/) interface,
while the other is a REST API, the Linked Data is serialized inside the webpage using JSON-LD.

You are tasked to perform a federated query over DBpedia and rubensworks.net to find all interests of https://www.rubensworks.net/#me with their labels.

You can use [RDF play](https://rdf-play.rubensworks.net/) to find the information exposed by Ruben.

## A lab of Pieters and Rubens

Ruben knows quite some People called "Pieter" or "Ruben".
You are tasked to find the full name of all Rubens and Pieters that Ruben knows.
The result should be distinct and only contain the full name and the uri used by Ruben T to identify the person.
The Result count should be 6.
