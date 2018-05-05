<template lang="html">
  <div class="force">
    <svg id="force" :width="width" :height="height">

    </svg>

  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'forceComponent',
  data () {
    return {
      width: 900,
      height: 500,
      tagData: {}
    }
  },
  computed: {
    ...mapGetters(['tagsData'])
  },
  methods: {
    ...mapActions(['getLinks']),
    renderTags () {
      const d3 = this.$d3;
      var svg = d3.select("svg");

      var nodes_data = this.tagsData.nodes;
      var links_data = this.tagsData.links;
      var simulation = this.$d3.forceSimulation().nodes(nodes_data);

      var forceCollide = d3.forceCollide()
        .radius(function  (d){return 75;})
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
      var link = svg.append("g")
          .attr("class", "links")
          .selectAll("line")
          .data(links_data)
          .enter().append("line")
          .attr("stroke-width", 1)
          .attr("stroke", "#eaeaea");

      //draw circles for the nodes
      var node = svg.append("g")
          .attr("class", "nodes")
          .selectAll("text")
          .data(nodes_data)
          .enter()
          .append("text")
          .text((d) => d.label)
          .attr("fill", "#222")
          .attr("text-anchor", "middle");

      function tickActions() {
        //update circle positions to reflect node updates on each tick of the simulation
        link
          .attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });
        node
          .attr("x", function(d) { return d.x; })
          .attr("y", function(d) { return d.y; });
      }
      simulation.on("tick", tickActions);
    }
  },
  created () {
    this.getLinks()
  },
  watch: {
    tagsData: function (val) {
      console.log('tagData changed', val);
      this.renderTags()
    }
  }
}
</script>

<style lang="css">
</style>
