# How to Reproduce
* Run the 2 subgraphs and the gateway (`npm install && npm start` on each one)
* Go to http://localhost:3000/graphiql
* Execute the following query:
```graphql
query {
  users {
    nodes {
      id
      friends {
        nodes {
          id 
        }
      }
    }
  }
}
```
* Notice how the `friends` are `null`, and there is no console message in Subgraph2 for the friends resolver, since it never triggers. But Subgraph2 has a resolver for `friends` that returns data.
