import React from "react";
import { useRouter } from "next/router";

const Error = () => {
  const router = useRouter();
  return <div>Error</div>;
};

export default Error;
export const getStaticProps = async () => {
  const notFoundData = getSingleFile("content/404.md");

  return {
    props: {
      notFoundData: notFoundData,
    },
    notFound: true,
    redirect: {
      destination: "/404",
      permanent: false,
    },
  };
};
