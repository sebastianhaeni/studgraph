# StudGraph
Web frontend that visualizes course dependencies of our university major

## Management summary
@TODO stoeffu

## Project management

We used Trello to manage our tasks. Trello supports a Kanban workflow. So we had
a standard task board with columns. Even though it's a very small project, it was still helpful to see progress of other team members.
It was also very fast to set up.

## Deployment

The frontend of the app is automatically deployed to heroku. It can be reached at http://studgraph.herokuapp.com.
When pushing to heroku, the app is checked for lint errors and unit tests are executed.
The frontend will connect to a locally running Neo4j server.

### Building

The following utilities are used to lint the code
* eslint
* jscs
* stylelint

Unit tests are started by karma.

The final resources are built with Webpack.

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

  ```
  $ npm install
  $ npm start
  ```

3. Go to http://localhost:3000
4. Get coding!

