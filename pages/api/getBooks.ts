import { gql } from "@apollo/client";
import { addApolloState, initializeApollo } from "../../lib/client";

export default async () => {
  const apollo = initializeApollo();

  const { data } = await apollo.query({
    query: gql`
      query books {
        books {
          title
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
