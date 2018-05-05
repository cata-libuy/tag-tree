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
      var links = this.tagsData.links;
      var simulation = this.$d3.forceSimulation().nodes(nodes_data);

      simulation
      .force("charge_force", d3.forceManyBody())
      .force("center_force", d3.forceCenter(this.width / 2, this.height / 2));

      //draw circles for the nodes
      var node = svg.append("g")
          .attr("class", "nodes")
          .selectAll("text")
          .data(nodes_data)
          .enter()
          .append("text")
          .text((d) => d.label)
          .attr("fill", "red");

      function tickActions() {
        //update circle positions to reflect node updates on each tick of the simulation
        node
          .attr("x", function(d) { return d.x; })
          .attr("y", function(d) { return d.y; })
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
