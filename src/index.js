const { ApolloServer, gql } = require('apollo-server');
const { RESTDataSource } = require('apollo-datasource-rest');

/**
 * The WieWarmAPI class represents the REST API data, by fetching and parsing the
 * JSON response.
 */
class WieWarmAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://www.wiewarm.ch:443/api/v1/'; // the API's base URL
  }

  /**
   * The getAllBad method loads all bad from the endpoint and parses them in
   * the right format.
   */
  async getAllBad() {
    let response = await this.get('bad.json?search=0');
    response = JSON.parse(response);
    return Array.isArray(response) ? response.map(bad => this.badReducer(bad)) : []; // check if the response is actually a array
  }

  /**
   * Get a bad by its id
   */
  async getBad(id){
    let response = await this.get(`bad.json/${id}`);
    response = JSON.parse(response);
    return this.badReducer(response);

  }

  /**
   * The badReducer method reduces the data given from the API endpoint to the data needed by the
   * defined GraphQL schema.
   * @param {Object} bad
   */
  badReducer(bad) {
    return {
      id: bad.badid || 0,
      name: bad.badname || "",
      address1: bad.adresse1 || "",
      address2: bad.adresse2 || "",
      canton: bad.kanton || "",
      plz: bad.plz || "",
      location: bad.ort || "",
      long: bad.long || null,
      lat: bad.lat || null,
      becken: this.beckenReducer(bad.becken),
    };
  }

  /**
   * The beckenReducer reduces the data of a becken to the data needed by the 
   * Becken GraphQL schema.
   * @param {Object} becken 
   */
  beckenReducer(becken) {
    let beckenArray = [];

    /* iterate through each key (becken name) in the object map */
    for (var key in becken) {
      let element = becken[key]; // get the becken with the defined key

      /* push the becken to the array of becken */
      beckenArray.push({
        id: element.beckenid,
        name: element.beckenname,
        temp: element.temp,
        status: element.status,
        type: element.typ,
        date: element.date,
        datePretty: element.date_pretty
      })
    }

    return beckenArray;
  }
}

/**
 * The type definitions define each object
 */
const typeDefs = gql`

  # Becken
  type Becken {
    # The id of the becken
    id: Int

    # The name of the becken
    name: String

    # The temperature of the becken
    temp: String

    # The status of the becken (eg. offen, geschlossen)
    status: String

    type: String

    date: String

    datePretty: String
  }

  # Bad
  type Bad {
    # The id of the bad
    id: Int

    # The name of the bad
    name: String

    address1: String
    address2: String

    # The canton where the bad is located
    canton: String

    # The postal code of the location
    plz: String

    # The location
    location: String

    long: Int
    lat: Int

    # The list of becken
    becken: [Becken]
  }

  # The possible queries (query)
  type Query {
    bads: [Bad]
    bad(id: ID!): Bad
  }
`;

/**
 * The resolvers define the way to load the data for each possible query
 */
const resolvers = {
  Query: {
    bads: async (_source, _args, { dataSources }) => {
      return dataSources.wieWarmAPI.getAllBad();
    },
    bad: async (_source, { id }, {dataSources}) => {
      return dataSources.wieWarmAPI.getBad(id);
    }
  },
};

/**
 * Creates a new instance of the ApolloServer based on the schema (typeDefs),
 * resolvers, dataSources (WieWarmAPI class) and options.
 */
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    wieWarmAPI: new WieWarmAPI()
  }),
  introspection: true, 
  playground: true, // enable the playground
});


/**
 * Listen
 */
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});