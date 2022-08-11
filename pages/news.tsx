import Link from "next/link";
import React from "react";
import { client } from "../src/libs/client";
import { NewsData } from "../src/utils/types/news";

type Props = { news: NewsData["contents"] };

const News = (props: Props) => {
  const { news } = props;

  return (
    <>
      <h1>News</h1>
      <ul>
        {news.map((news) => (
          <li key={news.id}>
            <Link href={`/news/${news.id}`}>
              <a>{news.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/">
        <a>
          <h2>←TOP</h2>
        </a>
      </Link>
    </>
  );
};

export default News;

export const getStaticProps = async () => {
  const data: NewsData = await client.get({ endpoint: "blogs" });

  return {
    props: {
      news: data.contents,
    },
  };
};
