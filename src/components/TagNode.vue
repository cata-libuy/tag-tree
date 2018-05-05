<template lang="html">
<g v-if="tag" :transform="transformGroup">
  <text v-bind:class="['tag-node', selected ? 'selected' : '']" v-on:click="onTagClick">{{ tag.label }}</text>
  <g v-if="selected" class="tag-link" v-for="link in tag.links" :key="link.title" :transform="getLinkPosition(link)">
    <rect :width="10 + link.title.length * 7" height="20" :x="-5" :y="-15" rx="4" ry="4"/>
    <text font-size="14">{{ link.title }}</text>
  </g>
</g>
</template>

<script>
import * as _ from 'underscore'

export default {
  name: 'TagNode',
  props: ['tag'],
  watch: {
    tag: function (val) {
      console.log('tag changed!', this.tag);
    }
  },
  computed: {
    transformGroup () {
      return `translate(${this.tag.x},${this.tag.y})`
    }
  },
  data: function () {
    return {
      selected: false
    }
  },
  methods: {
    onTagClick () {
      console.log('click')
      this.selected = !this.selected
    },
    getLinkPosition (link) {
      const startAtY = this.tag.links.length * 35 * -1 / 2
      const index = _.findIndex(this.tag.links, (aLink) => aLink.url === link.url) + 1
      const startAtX = this.tag.label.length * 7 + 20
      console.log('index', index, link, this.tag.links)
      return `translate(${startAtX},${startAtY + 25 * index})`
    }
  },
  created () {
    console.log('tag created', this.tag);
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
}
.tag-link {
  rect {
    fill: #eaeaea;
    opacity: 0.8;
  }
}
</style>
