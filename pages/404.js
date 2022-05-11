import { getSingleFile } from "@/lib/pages";
import Layout from "components/Layouts/Layout";
import { marked } from "marked";
import Link from "next/link";
import styles from "styles/page-404.module.scss";

const NotFound = ({ notFoundData }) => {
  return (
    <Layout title="Page Not Found-Gethugothemes">
      <div className={styles.page404wrapper}>
        <div className={`container ${styles.container}`}>
          <div className={styles.child}>
            <div className={styles.mouth}></div>
            <div className={styles.hand}></div>
          </div>

          <div className={styles.info}>
            <h2
              dangerouslySetInnerHTML={{
                __html: marked.parseInline(notFoundData.frontmatter.title),
              }}
            ></h2>
            <p
              dangerouslySetInnerHTML={{
                __html: marked.parseInline(notFoundData.frontmatter.sub_title),
              }}
            ></p>
            <Link href={notFoundData.frontmatter.button.link}>
              <a className={`btn ${styles.btnHome}`}>
                {notFoundData.frontmatter.button.lebel}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;

export const getStaticProps = async () => {
  const notFoundData = getSingleFile("content/404.md");

  return {
    props: {
      notFoundData: notFoundData,
    },
  };
};
