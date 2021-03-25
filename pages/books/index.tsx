import { Container, Typography } from "@material-ui/core";
import React from "react";
import Link from "next/link";
import getBooks from "../api/getBooks";

const BooksPage = (props) => {
  console.log(props);
  return (
    <Container>
      <Typography>Books Page</Typography>
      <Link href={"/books/[id]"} as={`/books/1`}>
        Go to 1
      </Link>
      <Link href={"/books/[id]"} as={`/books/2`}>
        Go to 2
      </Link>
      <Link href={"/books/[id]"} as={`/books/3`}>
        Go to 3
      </Link>
    </Container>
  );
};

export async function getStaticProps(params) {
  const data = await getBooks();

  return {
    props: {
      ...data,
    },
  };
}

export default BooksPage;
