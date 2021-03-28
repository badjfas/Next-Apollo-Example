const { ApolloServer, gql } = require("apollo-server");
const books = [
  {
    id: "1",
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    id: "2",
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    id: String
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    book(id: String): Book
  }

  type Mutation {
    insertBook(title: String, author: String): Book
  }
`;

const resolvers = {
  Query: {
    books: () => books,
    book: async (a, args, context) => {
      const { id } = args;

      const data = books.filter((e) => e.id === id);

      return {
        ...data[0],
      };
    },
  },
  Mutation: {
    insertBook: async (a, b, c) => {
      console.log(a, b, c);
      return await {
        title: b.title,
        author: b.author,
      };
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
