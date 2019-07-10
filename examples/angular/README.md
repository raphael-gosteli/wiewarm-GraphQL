# Angular example

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
