import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  bads: {};
  loading = true;
  error: any;

  constructor(private apollo: Apollo){}

  ngOnInit(): void {
    console.log("init")
    this.apollo.watchQuery({
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
      console.log(result);
      this.bads = result.data && result.data.bads;
      this.loading = result.loading;
      this.error = result.errors;
    })
  }

  title = 'wiewarm-GraphQL';
}
