import { Button, Container, Typography } from "@material-ui/core";
import React from "react";
import Link from "next/link";
import getBooks from "../api/getBooks";
import { gql, useMutation } from "@apollo/client";
import { Book } from "../../server/interface";

const BooksPage = (props: Book) => {
  const [exampleMutation] = useMutation(
    gql`
      mutation insertBook($title: String, $author: String) {
        insertBook(title: $title, author: $author) {
          title
          author
        }
      }
    `
  );

  const onClick = async (props: Book) => {
    await exampleMutation({
      variables: {
        title: props.title,
        author: props.author,
      },
    })
      .then((e) => console.log(e))
      .catch((e) => console.log(e));
  };

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

      <Button
        onClick={() =>
          onClick({ id: "1", author: "테스트", title: "뮤테이션" })
        }
      >
        Mutation
      </Button>
    </Container>
  );
};

export async function getStaticProps(params: any) {
  const data = await getBooks();
  return {
    props: {
      ...data,
    },
  };
}

export default BooksPage;
