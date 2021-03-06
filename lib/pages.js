import fs from "fs";
import path from "path";
import matter from "gray-matter";
const currentDate = new Date();
// all individual file

// POSTS_PATH is useful when you want to get the path to a specific file

const root = process.cwd();

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const getPaths = (folder) => {
  const postFilePaths = fs.readdirSync(path.join(root, folder));
  // Only include md(x) files

  return postFilePaths;
};
export const getSingleFile = (fileName) => {
  const file = fs.readFileSync(path.join(fileName), "utf-8");
  const { data: frontmatter, content } = matter(file);
  return {
    frontmatter,
    content,
  };
};

// all data (products,blog ..)

export const getAllData = (type, isDate) => {
  const allPage = getPaths(type);

  const allfile = allPage.filter((d) => d.match(/^[a-z]/));
  const file = allfile.filter((file) => file.includes(".md"));
  const posts = file.map((filename) => {
    const slug = filename.replace(/ /g, "-").replace(/\.(mdx|md)/, "");

    const postsData = fs.readFileSync(path.join(type, filename), "utf-8");
    const dataPost = matter(postsData);
    const frontmatterParse = JSON.stringify(dataPost.data);
    const frontmatter = JSON.parse(frontmatterParse);
    const content = dataPost.content;

    const category = frontmatter.categories ? frontmatter.categories : "";

    return { frontmatter, slug, content, category };
  });

  const filterByDraft = posts.filter(
    (p) => p.frontmatter.draft === false && posts
  );
  const filterByDate = isDate
    ? filterByDraft
    : filterByDraft.filter((d) => new Date(d.frontmatter.date) <= currentDate);

  return {
    posts: filterByDate,
  };
};
// export const getAllDataSlug = (type, slug) => {
//   const postFilePath = path.join(root, type, `${slug}.md`);
//   const source = fs.readFileSync(postFilePath);

//   const dataPost = matter(source);
//   const frontmatterParse = JSON.stringify(dataPost.data);
//   const frontmatter = JSON.parse(frontmatterParse);
//   const content = dataPost.content;

//   // console.log(allPage);
//   // console.log(path.join(root, type));
//   // const allfile = allPage.filter((d) => d.match(/^[a-z]/));
//   // const file = allfile.filter((file) => file.includes(".md"));
//   // const posts = file.map((filename) => {
//   //   const slug = filename.replace(/ /g, "-").replace(/\.(mdx|md)/, "");

//   //   const postsData = fs.readFileSync(path.join(type, filename), "utf-8");
//   //   const dataPost = matter(postsData);
//   //   const frontmatterParse = JSON.stringify(dataPost.data);
//   //   const frontmatter = JSON.parse(frontmatterParse);
//   //   const content = dataPost.content;

//   //   const category = frontmatter.categories ? frontmatter.categories : "";

//   //   return { frontmatter, slug, content, category };
//   // });

//   // const filterByDraft = posts.filter(
//   //   (p) => p.frontmatter.draft === false && posts
//   // );
//   // const filterByDate = isDate
//   //   ? filterByDraft
//   //   : filterByDraft.filter((d) => new Date(d.frontmatter.date) <= currentDate);

//   return {
//     frontmatter,
//     content,
//   };
// };
// regular pages
export const getRegulerPage = (slugs) => {
  const allPages = getPaths("content");

  const allContentPost = path.join(root, "content", `${slugs}.md`);
  // console.log(allPages);

  const allBlogFile = path.join(process.cwd(), "content/blog", `${slugs}.md`);
  const allBlog = getPaths("content/blog");

  // console.log(allBlog);
  const allFiles = [...allPages, ...allBlog];
  // console.log(allFiles);
  const filterIndexPage = allFiles.filter(
    (page) => page.match(/^[a-z]/) && page.includes(".md")
  );

  const regulerPage = filterIndexPage.map((file) => {
    const slug = file.replace(/ /g, "-").replace(/\.(mdx|md)/, "");

    const regulerFrontmatter = fs.readFileSync(
      path.join(
        allPages.includes(`${slugs}.md`) ? allContentPost : allBlogFile
      ),
      "utf-8"
    );
    // console.log(regulerFrontmatter);
    const regulerData = matter(regulerFrontmatter);

    const frontmatterParse = JSON.stringify(regulerData.data);
    const frontmatter = JSON.parse(frontmatterParse);

    const content = regulerData.content;
    return {
      slug,
      frontmatter,
      content,
    };
  });
  const filterSection = regulerPage.filter(
    (page) => page.frontmatter.build != false
  );
  // console.log(filterSection);
  return filterSection;
};

// changelog Data
// export const getChangelogData = () => {
//   const changeLogFile = fs.readdirSync(path.join("changelog"));
//   const changelog = changeLogFile.map((fileName) => {
//     const slug = fileName.replace(/ /g, "-").replace(".md", "");
//     const changelogPage = fs.readFileSync(
//       path.join("changelog", fileName),
//       "utf-8"
//     );
//     const changelogData = matter(changelogPage);
//     const frontmatter = changelogData.data;
//     const content = changelogData.content;
//     return {
//       frontmatter,
//       content,
//       slug,
//     };
//   });
//   return changelog;
// };

// // categories dicuments

// export const getAllCategoriesIndex = (categories) => {
//   const categoriesFile = fs.readFileSync(
//     path.join(`content/categories/${categories}.md`),
//     "utf-8"
//   );
//   const frontmatter = matter(categoriesFile).data;

//   return frontmatter;
// };

// export const getAllRegulerPageSlug = () => {
//   const getFolder = path.join(root, "content");
//   const allPages = fs.readdirSync(getFolder);

//   const allBlog = fs.readdirSync(path.join("content/blog"));
//   const allFiles = [...allBlog, ...allPages];
//   const filterIndexPage = allFiles.filter(
//     (page) => page.match(/^[a-z]/) && page.includes(".md")
//   );
//   const allSlug = filterIndexPage.map((file) =>
//     file.replace(/ /g, "-").replace(/\.(mdx|md)/, "")
//   );

//   return allSlug;
// };
