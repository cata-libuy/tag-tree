<template>
  <div class="hello">
    <svg :width="width" :height="height">
    </svg>
  </div>
</template>

<script>
import * as _ from 'underscore'
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: function () {
    return {
      width: 900,
      height: 600,
      circlesData: [],
      links: []
    }
  },
  computed: {
    tags () { // Obtiene los tags y sus relaciones
      const tags = _.uniq(_.flatten(_.pluck(this.links, 'tags')))
      const tagsData = _.map(tags, (tagName) => {
        return {
          label: tagName,
          relationScore: _.reduce(this.links, (memo, link) => {
            return memo + _.filter(link.tags, tag => tag === tagName).length
          }, 1),
          relatedTo: _.reduce(this.links, (memo, link) => {
            if (link.tags.indexOf(tagName) > -1) {
              return _.without(_.uniq(_.flatten([memo, link.tags])), tagName)
            }
            return memo
          }, []),
          position: this.getCanvasCenter()
        }
      })
      return _.sortBy(tagsData, (tag) => tag.relationScore).reverse()
    }
  },
  methods: {
    getCanvasCenter (tag) {
      return { x: parseInt(this.width / 2), y: parseInt(this.height / 2) }
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
    y las siguientes en puntos aleatorios equidistantes al centro de acuerdo a su importancia.
    TODO: generar distintos centros para tags no relacionadas */
    updateTagsPositions () {
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
        let thita = this.getTagAngle(tag)
        tag.position = {
          x: thita >= 0 && thita < Math.PI / 2 // estoy en cuadrante 1
            ? parseInt(center.x + Math.cos(thita) * distanceToCenter)
            : thita ===  Math.PI / 2 || thita === 3 * Math.PI / 2 // estoy en eje y, x no se mueve
              ? center.x
              : thita < 3 * Math.PI / 2 // estoy en cuadrantes 2 o 3
                ? parseInt(center.x + Math.cos(thita) * distanceToCenter)
                : parseInt(center.x + Math.cos(thita) * distanceToCenter),
          y: thita > 0 && thita < Math.PI // cuadrantes 1 o 2, resto altura
              ? parseInt(center.y - Math.sin(thita) * distanceToCenter)
              : thita == 0 || thita == Math.PI || thita == 2 * Math.PI
                ? parseInt(center.y)
                : parseInt(center.y - Math.sin(thita) * distanceToCenter) // cuadrantes 3 o 4, sumo altura
        }
        return
      })
    },
    renderTagsAligned () {
      const getRadius = data => 15 + 10 * data.relationScore
      const getY = index => 150
      const getX = index => 50 * 3 * (index + 1)
      const svg = this.$d3.select('svg')
      svg.selectAll("circle")
        .data(this.tags)
          .enter()
          .append("circle")
          .attr('cy', (data, index) => getY(index))
          .attr('cx', (data, index) => getX(index))
          .attr('r', (data) => getRadius(data))
      svg.selectAll("text")
        .data(this.tags)
          .enter()
          .append("text")
          .attr('y', (data, index) => getY(index))
          .attr('x', (data, index) => getX(index))
          .text((data) => data.label)
          .attr('font-family', 'sans-serif')
          .attr('font-size', '14px')
          .attr('fill', 'yellow')
    },
    renderTags () {
      this.updateTagsPositions()
      console.log(this.tags)
      const svg = this.$d3.select('svg')
      const getRadius = data => 15 + 10 * data.relationScore
      svg.selectAll("circle")
        .data(this.tags)
          .enter()
          .append("circle")
          .attr('cy', (data) => data.position.y)
          .attr('cx', (data) => data.position.x)
          .attr('r', (data) => getRadius(data))
      svg.selectAll("text")
        .data(this.tags)
          .enter()
          .append("text")
          .attr('y', (data) => data.position.y)
          .attr('x', (data) => data.position.x)
          .text((data) => data.label)
          .attr('font-family', 'sans-serif')
          .attr('font-size', '14px')
          .attr('fill', 'yellow')
    }
  },
  created: function () {
  this.$http.get('data/links.json')
    .then(
      (res) => {
        this.links = res.body ? res.body : []
        console.log('links', this.links, 'tags', this.tags)
        this.renderTags()
      },
      (err) => console.log(err)
    )
  },
  mounted () {
    this.$d3.selectAll('p').style('color', 'red')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
