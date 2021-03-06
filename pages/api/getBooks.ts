import { gql, NormalizedCacheObject, ApolloClient } from "@apollo/client";
import { addApolloState, initializeApollo } from "../../lib/client";

export default async () => {
  const apollo: ApolloClient<NormalizedCacheObject> = initializeApollo();

  const { data } = await apollo.query({
    query: gql`
      query books {
        books {
          id
          title
          author
        }
      }
    `,
  });

  return addApolloState(apollo, {
    props: {
      ...data,
    },
    revalidate: 1,
  });
};
