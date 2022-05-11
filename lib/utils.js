// sort product by weight
export const sortByWeight = (array) => {
  const post = array.sort(
    (a, b) => a.frontmatter.weight - b.frontmatter.weight
  );
  return post;
};

// date sorting
let options = { year: "numeric", month: "long", day: "numeric" };
const currentDate = new Date();
export const dateFormat = (date) => {
  const dateFormat =
    currentDate.getFullYear() > new Date(date).getFullYear() ? (
      new Date(date).toLocaleDateString("en-US", options)
    ) : currentDate.getMonth() > new Date(date).getMonth() ? (
      new Date(date).toLocaleDateString("en-US", options)
    ) : currentDate.getDate() == new Date(date).getDate() ? (
      <span>Today</span>
    ) : currentDate.getDate() - new Date(date).getDate() <= 3 ? (
      <span>{currentDate.getDate() - new Date(date).getDate()} day ago </span>
    ) : (
      new Date(date).toLocaleDateString("en-US", options)
    );
  return dateFormat;
};

export const sortByDate = (array) => {
  const post = array.sort(
    (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
  );
  return post;
};

// similer products
export const similerProduct = (array, singleArray, slug) => {
  const categories = singleArray[0].category;
  const filterProducts = array.filter((array) =>
    categories.find((c) => array.category.includes(c))
  );
  const remainProducts = array.filter((el) => !filterProducts.includes(el));
  const filterBySlug = filterProducts.filter((product) => product.slug != slug);
  const similerProducts = [...filterBySlug, ...remainProducts];
  return similerProducts;
};
// content reading
export const readingTime = (content) => {
  const WPS = 275 / 60;

  let images = 0;
  const regex = /\w/;

  let words = content.split(" ").filter((word) => {
    if (word.includes("<img")) {
      images += 1;
    }
    return regex.test(word);
  }).length;

  let imageAdjust = images * 4;
  let imageSecs = 0;
  let imageFactor = 12;

  while (images) {
    imageSecs += imageFactor;
    if (imageFactor > 3) {
      imageFactor -= 1;
    }
    images -= 1;
  }

  const minutes = Math.ceil(((words - imageAdjust) / WPS + imageSecs) / 60);

  if (minutes < 10) {
    if (minutes < 2) {
      return "0" + minutes + ` Min to read`;
    } else {
      return "0" + minutes + ` Mins to read`;
    }
  } else {
    return minutes + ` Mins to read`;
  }
};

// strip function
export const strip = (html) => {
  var one = html.replace(/<\/?[^>]+(>|$)/gm, "");
  var two = one.replace(/[\r\n]\s*[\r\n]/gm, "");
  return two;
};
