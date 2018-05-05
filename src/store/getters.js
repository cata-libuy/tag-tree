import * as _ from 'underscore'

export const links = state => state.links

export const tagsData = (state) => { // Obtiene los tags y sus relaciones
  console.log('getter tagsData called');
  const tags = _.uniq(_.flatten(_.pluck(state.links, 'tags')));
  const tagsData = _.map(tags, (tagName) => {
    return {
      id: tagName,
      label: tagName,
      links: _.filter(state.links, (link) => link.tags.indexOf(tagName) > -1),
      relatedTo: _.reduce(state.links, (memo, link) => {
        if (link.tags.indexOf(tagName) > -1) {
          return _.without(_.uniq(_.flatten([memo, link.tags])), tagName)
        }
        return memo
      }, []),
      position: { x: 0, y: 0 }
    }
  });
  const orderedTags = _.sortBy(tagsData, (tag) => tag.relationScore).reverse();
  console.log('hello')
  const toReduce = _.map(orderedTags, (tag) => {
    return _.map(tag.relatedTo, (related) => {
      return { source: tag.label, target: related }
    });
  });
  console.log('toReduce', toReduce)
  const vertices = _.reduce(
    toReduce,
    (memo, tagLinks) => {
      return _.flatten([memo, tagLinks])
    },
    []
  );
  return { nodes: orderedTags, links: vertices }
}
