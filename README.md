> No time? Learn by doing in the GraphQL [Playground](https://wiewarm-graphql.raphaelgosteli.now.sh/)! 🚀


# wiewarm.ch GraphQL

GraphQL wrapper for the [wiewarm.ch](https://www.wiewarm.ch) RESTful API.
Thanks to GraphQL just get the data you need or want.  


## Getting started

1. Learn the schema by playing with the data in the [Playground](https://wiewarm-graphql.raphaelgosteli.now.sh/).
2. Choose a (GraphQL) client implementation from the [GraphQL Clients list](https://graphql.org/code/#graphql-clients). The server/wrapper is built using [Apollo](https://www.apollographql.com/). You might also use an [Apollo Client](https://www.apollographql.com/docs/react/#prefer-a-non-react-platform) for good result.
4. Use [https://wiewarm-graphql.raphaelgosteli.now.sh/](https://wiewarm-graphql.raphaelgosteli.now.sh/) as endpoint.
3. Let's go! 🤗




## Schemas

### Badi
```typescript
type Badi {
    id: int
    name: string
    location: string
    plz: string
    canton: string
    becken: [Becken]
}
```

### Becken
```typescript
type Becken {
    id: int
    name: string
    temp: string,
    status: string
}
```