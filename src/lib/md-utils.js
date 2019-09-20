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
      summaryHtml: trimString(edge.node.frontmatter.description) || trimString(edge.node.frontmatter.social_summary) || edge.node.excerpt
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

function trimString(text) {
   if(text === null || text === undefined)
    return false
  
  return text.length > 250 ? text.substring(0, 250) + "..." : text;
}
export {
 uniqElementsBy,
 dataToPosts,
 postsTags
};
