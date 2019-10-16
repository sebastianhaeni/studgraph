# StudGraph
Web frontend that visualizes course dependencies of our university major.

See it live: http://studgraph.herokuapp.com

For project report, refer to `doc/report.pdf`.

## Project management

We used Trello to manage our tasks. Trello supports a Kanban workflow. So we had
a standard task board with columns. Even though it's a very small project, it was still helpful to see progress of other team members.
It was also very fast to set up.

## Technology Stack

![System Overview](/doc/system-overview.png?raw=true "System Overview")


### Web Frontend

Languages:
* JavaScript ES2015
* CSS

Frameworks:
* react
* react-redux
* redux-saga
* webpack
* VisJS

The following utilities are used to lint the code
* eslint
* jscs
* stylelint

Built with webpack.

Unit tests with karma

> Runs on Heroku

### PHP Middleware

* PHP 7

The middleware takes requests from the frontend, forwards them to the Neo4j server, transforms it into a useful and friendly format and returns it to the frontend.

> Runs on Heroku

### Neo4j

Any Neo4j server > 2.0

> Runs on GrapheneDB

## Deployment

The frontend of the app is automatically deployed to Heroku. It can be reached at http://studgraph.herokuapp.com.
When pushing to master branch on GitHub, the app is deployed.
The frontend will connect to a Neo4j server on GrapheneDB.

Both frontend and database run on a free subscription. So they are relatively slow in reaction time.

## Project structure

* `app/` - contains the web frontend sources
* `cql/` - contains cypher scripts to execute on your Neo4j server
* `internals/` - contains configurations and scripts to build `app/`
* `server/` - sources to run the web frontend locally


## Install instructions

### Prerequisites

* Neo4j
* PHP
* NodeJS

Frontend:

    $ npm install
    $ npm start
  
    
Middleware:

    $ cd app/
    $ php -S localhost:8000
