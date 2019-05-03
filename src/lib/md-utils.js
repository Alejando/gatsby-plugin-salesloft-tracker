function uniqElementsBy(elements, props) {
  const uniqueKeysMap = {};
  return elements.filter(el => {
    const elementKey = props.reduce((composed, prop) => `${composed}:${el[prop]}` , '')
    if (uniqueKeysMap[elementKey]) return false;
    uniqueKeysMap[elementKey] = true;
    return true;
  })
};

function dataToPosts(data) {
	const edges = data.allMarkdownRemark.edges;
  return uniqElementsBy(edges.map(edge => {
    return {
      id: edge.node.id,
      name: edge.node.frontmatter.name,
      date: edge.node.frontmatter.date,
      imageSrc: edge.node.frontmatter.image.childImageSharp.original.src,
      tags: edge.node.frontmatter.tags,
      author: edge.node.frontmatter.author,
      summaryHtml: edge.node.excerpt,
    }
  }), ['name', 'date']);
}

function postsTags(posts) {
  let tags = []
  posts.forEach((post) => {
    tags = tags.concat(post.tags)
  })
  return tags;
}

export {
 uniqElementsBy,
 dataToPosts,
 postsTags
};
