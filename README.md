> No time? Learn by doing in the GraphQL [Playground](https://wiewarm-graphql.raphaelgosteli.now.sh/)! 🚀


# wiewarm.ch GraphQL

GraphQL wrapper for the [wiewarm.ch](https://www.wiewarm.ch) RESTful API.
Thanks to GraphQL just get the data you need or want.  


## Getting started

1. Learn the schema by playing with the data in the [Playground](https://wiewarm-graphql.raphaelgosteli.now.sh/).
2. Choose a (GraphQL) client implementation from the [GraphQL Clients list](https://graphql.org/code/#graphql-clients). The server/wrapper is built using [Apollo](https://www.apollographql.com/). You might also use an [Apollo Client](https://www.apollographql.com/docs/react/#prefer-a-non-react-platform) for good result.
4. Use [https://wiewarm-graphql.raphaelgosteli.now.sh/](https://wiewarm-graphql.raphaelgosteli.now.sh/) as endpoint.
3. Let's go! 🤗


## Examples


### Bad
Get the name, temperature and the prettified date of a bad by it's id.
```typescript
Query {
  bad(id: 5) {
    name
    becken {
      temp
      datePretty
    }
  }
}
```
[Run in Playground →](https://wiewarm-graphql.raphaelgosteli.now.sh/?query=%7B%0A%20%20bad%28id%3A%205%29%20%7B%0A%20%20%20%20name%0A%20%20%20%20becken%20%7B%0A%20%20%20%20%20%20temp%0A%20%20%20%20%20%20datePretty%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A)

### Bads
Get all bad and show their id, location and becken info.

```typescript
Query {
  bads {
    id
    location
    becken {
      status
      type
    }
  }
}
```
[Run in Playground →](https://wiewarm-graphql.raphaelgosteli.now.sh/?query=%7B%0A%20%20bads%20%7B%0A%20%20%20%20id%0A%20%20%20%20location%0A%20%20%20%20becken%20%7B%0A%20%20%20%20%20%20status%0A%20%20%20%20%20%20type%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D)



## Schema

### Badi
```typescript
type Bad {
  id: Int
  name: String
  address1: String
  address2: String
  canton: String
  plz: String
  location: String
  long: Int
  lat: Int
  becken: [Becken]
}
```

### Becken
```typescript
type Becken {
  id: Int
  name: String
  temp: String
  status: String
  typ: String
  date: String
  datePretty: String
}
```
