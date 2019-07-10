> No time? Learn by doing in the GraphQL [Playground](https://wiewarm-graphql.raphaelgosteli.now.sh/)! 🚀


# wiewarm.ch GraphQL

GraphQL wrapper for the [wiewarm.ch](https://www.wiewarm.ch) RESTful API.
Thanks to GraphQL just get the data you need or want.  


## Getting started

1. Learn the schema by playing with the data in the [Playground](https://wiewarm-graphql.raphaelgosteli.now.sh/).
2.   Have a look at the [client implementations](#client-implementations) or choose a client implementation from the [GraphQL clients implementations](https://graphql.org/code/#graphql-clients).
3. Let's go! 🤗


## Examples

### Queries

#### Bad

Search for a bad
```typescript
Query {
  search(query: "Thun"){
    id
    name
    location
  }
}
```
[Run in Playground →](https://wiewarm-graphql.raphaelgosteli.now.sh/?query=%7B%0A%20%20search%28query%3A%20%22Thun%22%29%7B%0A%20%20%20%20id%0A%20%20%20%20name%0A%20%20%20%20location%0A%20%20%7D%0A%7D)

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

#### Bads
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


## Client implementations

### Android

Have a look at the [Android example →](examples/android) by [@wauchi](https://github.com/wauchi) using the [Apollo Android client](https://github.com/apollographql/apollo-android).

### Angular

> No time? Have a look at the example project. [Angular example →](examples/angular/)

Add the apollo angular implementation to your angular project.

`ng add apollo-angular`

Change constant `uri` in the `src/app/graphql.module.ts` to
```typescript
const uri = 'https://wiewarm-graphql.raphaelgosteli.now.sh'
```

Query the data using the Apollo Client method `watchQuery`

*src/app.component.ts*
```typescript
apollo.watchQuery({
      query: gql`
        {
          bads {
            id
            name
            location
            becken {
              name
              temp
            }
          }
        }
      `
    }).valueChanges.subscribe(result => {
      this.bads = result.data && result.data.bads;
      this.loading = result.loading;
      this.error = result.errors;
    })
```

Load the data into a template by iterating through the list of bad as shown in the example.

*src/app.component.html*
```html
<div *ngIf="bads">
    <div *ngFor="let bad of bads">
      <div class="bad">
        <p class="bad-id">#{{bad.id}}</p>
        <h2>{{bad.name}}</h2>
        <p class="location">{{bad.location}}</p>

        <table>
            <tr>
              <th>Becken</th>
              <th>Temperatur</th> 
            </tr>
            <tr *ngFor="let becken of bad.becken">
              <td>{{becken.name}}</td>
              <td>{{becken.temp}}°C</td> 
            </tr>
          </table>
      </div>
    </div>
</div>
```

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
