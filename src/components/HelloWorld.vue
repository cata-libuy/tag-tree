<template>
  <div class="hello">
    <svg :width="width" :height="height">
      <tag-node v-for="tag in tags" :tag="tag"></tag-node>
    </svg>
  </div>
</template>

<script>
import * as _ from 'underscore'
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'

import TagNode from './TagNode'

export default {
  name: 'HelloWorld',
  components: {
    TagNode
  },
  data: function () {
    return {
      width: 900,
      height: 600,
      circlesData: []
    }
  },
  computed: {
    ...mapGetters([ 'links', 'tags' ])
  },
  methods: {
    ...mapActions(['getLinks']),
    getCanvasCenter (tag) {
      return { x: parseInt((this.width / 2) - 200), y: parseInt(this.height / 2) }
    },
    getTagAngle (tag) {
      const min = 0
      const max = 2 * Math.PI
      const siblingTags = _.sortBy(_.filter(this.tags, (sibTag) => sibTag.relationScore === tag.relationScore), tag => tag.label)
      const stepAngle = max / siblingTags.length
      const tagIndex = _.findIndex(siblingTags, (sibTag) => sibTag.label === tag.label) + 1
      return stepAngle * tagIndex
    },
    /* De acuerdo a importancia, posiciona la primera al centro
    y las siguientes en puntos aleatorios equidistantes al centro
    TODO: generar distintos centros para tags no relacionadas */
    updateTagsPositions () {
      if (this.tags && this.tags.length > 0) {
        const center = this.getCanvasCenter()
        let lastWeight = this.tags[0].relationScore
        let distanceToCenter = 0
        const growStep = 150
        _.each(this.tags, (tag, index) => {
          if (index === 0) {
            return tag.position = center
          }
          if (tag.relationScore < lastWeight) {
            distanceToCenter = distanceToCenter + growStep
          }
          lastWeight = tag.relationScore
          const thita = this.getTagAngle(tag)
          return tag.position = {
            x: parseInt(center.x + Math.cos(thita) * distanceToCenter),
            y: parseInt(center.y - Math.sin(thita) * distanceToCenter)
          }
        })
      }
    },
    renderTags () {
      this.updateTagsPositions()
    }
  },
  created: function () {
    this.getLinks()
  },
  watch: {
    links: function () {
      this.renderTags()
    }
  },
  mounted () {
    this.$d3.selectAll('p').style('color', 'red')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
