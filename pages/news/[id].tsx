import { GetStaticProps, GetStaticPropsContext } from "next";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { client } from "../../src/libs/client";
import { NewsData, News } from "../../src/utils/types/news";

type Props = { news: News };

const NewsId = (props: Props) => {
  const { news } = props;

  return (
    <div>
      <h1>{news.title}</h1>
      <p>{news.publishedAt}</p>
      <Image
        src={news.eyecatch.url}
        width={news.eyecatch.width}
        height={news.eyecatch.height}
      />
      <div
        dangerouslySetInnerHTML={{
          __html: `${news.content}`,
        }}
      />
      <Link href="/news">
        <a>
          <h2>←News一覧</h2>
        </a>
      </Link>
    </div>
  );
};

export default NewsId;

export const getStaticPaths = async () => {
  const data: NewsData = await client.get({ endpoint: "blogs" });

  const paths = data.contents.map((content) => `/news/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const params = context.params as { id: string };
  const id = params.id;
  const data = await client.get({ endpoint: "blogs", contentId: id });

  return {
    props: {
      news: data,
    },
  };
};
