<template lang="html">
  <div class="force">
    <svg id="force" :width="width" :height="height">
      <tag-node v-for="tag in simulatedNodes" :key="tag.label" :tag="tag"></tag-node>
    </svg>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TagNode from './TagNode'

export default {
  name: 'forceComponent',
  components: {
    TagNode
  },
  data () {
    return {
      width: document && document.documentElement ? document.documentElement.clientWidth : 900,
      height: document && document.documentElement ? document.documentElement.clientHeight : 500,
      tagData: {},
      simulatedNodes: []
    }
  },
  computed: {
    ...mapGetters(['tagsData'])
  },
  methods: {
    ...mapActions(['getLinks']),
    renderTags () {
      const self = this;
      const d3 = this.$d3;
      var svg = d3.select("svg");

      var nodes_data = this.tagsData.nodes;
      var links_data = this.tagsData.links;
      var simulation = this.$d3.forceSimulation().nodes(nodes_data);

      var forceCollide = d3.forceCollide()
        .radius(75)
        .iterations(1)
        .strength(0.2);

      var link_force =  d3.forceLink(links_data)
                        .id(function(d) { return d.label; });

      simulation.force("links", link_force);

      simulation
        .force("charge_force", d3.forceManyBody())
        .force("center_force", d3.forceCenter(this.width / 2, this.height / 2))
        .force("collide", forceCollide);

      //draw lines for the links
      svg.selectAll('.links').remove()
      var link = svg.append("g")
          .attr("class", "links")
          .selectAll("line")
          .data(links_data)
          .enter().append("line")
          .attr("stroke-width", 1)
          .attr("stroke", "#eaeaea");

      function tickActions() {
        self.simulatedNodes = simulation.nodes()
        link
          .attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; })
      }
      simulation.on("tick", tickActions);
    }
  },
  created () {
    this.getLinks()
  },
  watch: {
    tagsData: function () {
      this.renderTags()
    }
  },

}
</script>

<style lang="css">
</style>
