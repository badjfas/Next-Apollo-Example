import { ApolloClient, gql, NormalizedCacheObject } from "@apollo/client";
import { addApolloState, initializeApollo } from "../../lib/client";
export default async (id: string) => {
  const apollo: ApolloClient<NormalizedCacheObject> = initializeApollo();

  const { data } = await apollo.query({
    query: gql`
      query book($id: String) {
        book(id: $id) {
          id
          title
          author
        }
      }
    `,
    variables: {
      id,
    },
  });

  return addApolloState(apollo, {
    props: {
      ...data,
    },
    revalidate: 1,
  });
};
