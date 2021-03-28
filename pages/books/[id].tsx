import { Container, Typography } from "@material-ui/core";
import React from "react";
import { Book } from "../../server/interface";
import getBook from "../api/getBook";
import getBooks from "../api/getBooks";

const BookDetail = ({ book }: any) => {
  return (
    <Container>
      <Typography>{book.id}</Typography>
      <Typography>{book.title}</Typography>
      <Typography>{book.author}</Typography>
    </Container>
  );
};

export async function getStaticProps({ params }: any) {
  const data = await getBook(params.id);

  return {
    ...data,
  };
}

export async function getStaticPaths(params: any) {
  const {
    props: { books },
  } = await getBooks();

  const paths = books.map((e: Book) => {
    return {
      params: {
        id: e.id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export default BookDetail;
