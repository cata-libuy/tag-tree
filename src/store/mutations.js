export const mutations = {
  ['SET_LINKS'] (state, { links }) {
    state.links = links
  },
  ['SET_SELECTED_TAG'] (state, { tag }) {
    state.selectedTag = tag
  }
}
