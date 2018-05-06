<template lang="html">
<g v-if="tag" :transform="transformGroup">
  <text v-bind:class="['tag-node', selected ? 'selected' : '', vanish ? 'vanish' : '']" v-on:click="onTagClick">{{ tag.label }}</text>
  <g v-if="selected" class="tag-link" v-for="link in tag.links" :key="link.title" :transform="getLinkPosition(link)">
      <rect :width="10 + link.title.length * 7" height="20" :x="-5" :y="-15" rx="4" ry="4"/>
      <text font-size="14" v-on:click="onLinkClick(link)">{{ link.title }}</text>
  </g>
</g>
</template>

<script>
import * as _ from 'underscore'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TagNode',
  props: ['tag'],
  watch: {
    selectedTag () {
      if (this.selectedTag && this.selectedTag.label !== this.tag.label) {
        return this.vanish = true
      }
      this.vanish = false
    }
  },
  computed: {
    ...mapGetters(['selectedTag']),
    transformGroup () {
      return `translate(${this.tag.x},${this.tag.y})`
    }
  },
  data: function () {
    return {
      selected: false,
      vanish: false
    }
  },
  methods: {
    ...mapActions(['selectTag']),
    onTagClick () {
      this.selected = !this.selected
      if (this.selected) {
        this.selectTag(this.tag)
      } else {
        this.selectTag(null)
      }
    },
    getLinkPosition (link) {
      const startAtY = this.tag.links.length * 35 * -1 / 2
      const index = _.findIndex(this.tag.links, (aLink) => aLink.url === link.url) + 1
      const startAtX = this.tag.label.length * 7 + 20
      return `translate(${startAtX},${startAtY + 25 * index})`
    },
    onLinkClick (link) {
      window.open(
        link.url,
        '_blank' // <- This is what makes it open in a new window.
      );
    }
  }
}
</script>

<style lang="scss">
.tag-node {
  fill: #222;
  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
  &.selected {
    font-weight: bold;
    fill: #000
  }
  &.vanish {
    font-weight: normal;
    opacity: 0.2;
  }
}
.tag-link {
  cursor: pointer;
  rect {
    fill: #bedcbf;
    opacity: 1;
  }
}
</style>
