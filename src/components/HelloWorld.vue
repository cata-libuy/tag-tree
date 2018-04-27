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
      height: 400,
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
          linksCount: _.reduce(this.links, (memo, link) => {
            return memo + _.filter(link.tags, tag => tag === tagName).length
          }, 0),
          relatedTo: _.reduce(this.links, (memo, link) => {
            if (link.tags.indexOf(tagName) > -1) {
              return _.uniq(_.flatten([memo, link.tags]))
            }
            return memo
          }, [])
        }
      })
      return _.sortBy(tagsData, (tag) => tag.linksCount).reverse()
    }
  },
  methods: {
    getCanvasCenter (tag) {
      return { x: this.width / 2, y: this.height / 2 }
    },
    renderTags () {
      const getRadius = data => 30 * data.linksCount
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
