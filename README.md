# studgraph
Web frontend that visualizes course dependencies of our university major

## Project structure

* `app/` - contains the web frontend sources
* `cql/` - contains cypher scripts to execute on your Neo4j server
* `internals/` - contains configurations and scripts to build `app/`
* `server/` - sources to run the web frontend locally


## Install instructions

### Prerequisites

* [Neo4j Server](http://neo4j.com/download)
* [NodeJS](https://nodejs.org)

### Minimal installation

> The minimal installation will not need any local web server.
> You will use the frontend at http://studgraph.herokuapp.com

1. Install Neo4j
2. Open the Neo4j interface at http://localhost:7474
3. When opening it for the first time, you'll need to set a new password. 
   Choose `1234` so it's compatible with the app deployed on Heroku.
4. Execute `cql/01_insert-data.cql` by copy-pasting it into the command bar
5. Go to http://studgraph.herokuapp.com
6. Profit!

### Full installation (for devs)
 
1. Follow steps 1-4 from [Minimal installation]
2. Execute the following commands:

    $ npm install
    $ npm start

3. Go to http://localhost:3000
4. Get coding!

