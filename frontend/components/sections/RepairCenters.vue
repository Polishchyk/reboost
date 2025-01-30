<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "RepairCenters"
})
</script>

<template>
  <div class="sect-repair-centers">
    <div class="wrap">
      <h2>Our repair centers</h2>
      <div class="repair-centers">
        <div class="item">
          <h3>Lugano, Ticino</h3>
          <div class="desc">via Giosuè Carducci 4, 6900</div>
          <div class="tel"><a href="tel:+41912101188">+ 41 91 210 11 88</a></div>
          <div class="links">
            <a href=""><div class="but small map">View Map</div></a>
            <a href=""><div class="but small whatsapp"></div></a>
          </div>
        </div>
        <div class="item">
          <h3>Chiasso, Ticino</h3>
          <div class="desc">Train station</div>
          <div class="tel"><a href="tel:+41912101188">+ 41 91 210 11 88</a></div>
          <div class="links">
            <a href=""><div class="but small map">View Map</div></a>
            <a href=""><div class="but small whatsapp"></div></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>