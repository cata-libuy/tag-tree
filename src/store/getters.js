import * as _ from 'underscore'

export const links = state => state.links

export const tags = (state) => { // Obtiene los tags y sus relaciones
  const tags = _.uniq(_.flatten(_.pluck(state.links, 'tags')))
  const tagsData = _.map(tags, (tagName) => {
    return {
      label: tagName,
      links: _.filter(state.links, (link) => link.tags.indexOf(tagName) > -1),
      relationScore: _.reduce(state.links, (memo, link) => {
        return memo + _.filter(link.tags, tag => tag === tagName).length
      }, 1),
      relatedTo: _.reduce(state.links, (memo, link) => {
        if (link.tags.indexOf(tagName) > -1) {
          return _.without(_.uniq(_.flatten([memo, link.tags])), tagName)
        }
        return memo
      }, []),
      position: { x: 0, y: 0 }
    }
  })
  const orderedTags = _.sortBy(tagsData, (tag) => tag.relationScore).reverse()
  console.log('tags', orderedTags)
  return orderedTags
}

export const clusteresTags = (state) => {
  let clusters = [] 
}
