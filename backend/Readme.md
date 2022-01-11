# Backend For Coding Challenge with Benjamin Arko Afrasah

### Tooling

-   We recommend installation with [yarn](https://github.com/yarnpkg/yarn).

-   Sources and tests are written in strict [TypeScript](https://github.com/Microsoft/TypeScript).

    -   Common base `tsconfig.json`.

### Included sample packages

-   **src/\_shared**

    -   Source for shared utilities

-   **src/{module}/access**

    -   Source for database management
    -   [Knex](https://knexjs.org) query builder is used to build queries

-   **src/{module}/entities.ts**

    -   Source for normalising database objects

-   **src/{module}/use-cases**

    -   Source for building logic in the backend

-   **src/{module}/resolvers.ts**
    -   Source for registering graphql resolvers for  each module
-   **Server Engine**
    -   [Express](https://expressjs.com/en/starter/installing.html) server.
    -   [Apollo GraphQL](https://www.apollographql.com/docs/apollo-server/)

### Setting up

-   Duplicate `.env.example` and rename one to `.env`.
-   Fill in the env variables.
-   Setup a firebase project and enable storage, then download your firebase config file
-   Use this tool to convert the firebase config to a single line JSON; [Single Line JSON](https://tools.knowledgewalls.com/online-multiline-to-single-line-converter)
-   Set the value for your firebase config in the .env `FIREBASE_SERVICE_CONFIG=`
-   Run `yarn dev` to start the application in development.

### Deployment

-   Deployment is done by github actions
