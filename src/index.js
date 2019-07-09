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
   * The getAllBadis method loads all badis from the endpoint and parses them in
   * the right format.
   */
  async getAllBadis() {
    let response = await this.get('bad.json?search=0');
    response = JSON.parse(response);
    return Array.isArray(response) ? response.map(badi => this.badiReducer(badi)) : []; // check if the response is actually a array
  }

  /**
   * The badiReducer method reduces the data given from the API endpoint to the data needed by the
   * defined GraphQL schema.
   * @param {Object} badi 
   */
  badiReducer(badi) {
    return {
      id: badi.badid || 0,
      name: badi.badname || "",
      canton: badi.kanton || "",
      plz: badi.plz || "",
      location: badi.ort || "",
      becken: this.beckenReducer(badi.becken),
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
        status: element.status
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
  }

  # Badi
  type Badi {
    # The id of the badi
    id: Int

    # The name of the badi
    name: String

    # The canton where the badi is located
    canton: String

    # The postal code of the location
    plz: String

    # The location
    location: String

    # The list of becken
    becken: [Becken]
  }

  # The possible queries (query)
  type Query {
    badis: [Badi]
  }
`;

/**
 * The resolvers define the way to load the data for each possible query
 */
const resolvers = {
  Query: {
    badis: async (_source, _args, { dataSources }) => {
      return dataSources.wieWarmAPI.getAllBadis();
    },
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