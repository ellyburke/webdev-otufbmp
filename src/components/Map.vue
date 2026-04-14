<script setup>
import { onMounted, ref } from 'vue'
import * as d3 from 'd3'

const props = defineProps({
  data: Array
})

const map = ref(null)
const viewWidth = 300
const viewHeight = 140
const viewSize = 225
const translateX = 300
const translateY = 210

onMounted(async () => {
  const svg = d3.select(map.value)
    .attr("viewBox", `0 0 ${viewWidth} ${viewHeight}`)

  const colorScale = d3.scaleThreshold()
    .domain([1, 5, 10, 20, 50])
    .range(d3.schemeBlues[6])

  const projection = d3.geoNaturalEarth1()
    .scale(viewSize / 1.5 / Math.PI)
    .translate([translateX / 2.175, translateY / 3])

  const geo = await d3.json('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
  const sales = await d3.csv('../data/sales.csv')

  const counts = {}
  sales.forEach(sale => {
    const country = sale.Country 
    counts[country] = (counts[country] || 0) + 1
  })

  svg.append("g")
    .selectAll("path")
    .data(geo.features)
    .enter()
    .append("path")
      .attr("d", d3.geoPath().projection(projection))
      .attr("fill", d => {
        const countryName = d.properties.name 
        return colorScale(counts[countryName] || 0)
      })
      .style("stroke", "black")
      .style("stroke-width", 0.5)
})
</script>

<template>
  <div>
    <svg ref="map"></svg>
  </div>
</template>
