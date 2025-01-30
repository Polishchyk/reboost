<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "MainOffer"
})
</script>

<template>
  <div class="sect-main-offer">
    <div class="wrap">
      <div class="content">
        <h1>Phone & Computer Repair <strong>#1 in Ticino</strong></h1>
        <div class="info">
          <div class="col">Tariffs with fixed prices and no surprises</div>
          <div class="col">Free diagnostics even if <br>you decide not to do the service with us</div>
        </div>
        <div class="selection">
          <div class="label">Select your device below to get started</div>
          <form>
            <div class="select-1">
              <select>
                <option selected disabled>Select your brand</option>
                <option>Apple</option>
                <option>Samsung</option>
                <option>Xiaomi</option>
                <option>Microsoft</option>
                <option>Dell</option>
                <option>HP</option>
              </select>
            </div>
            <div class="select-2">
              <select>
                <option selected disabled>Select your product</option>
                <option>Macbook</option>
                <option>iPhone</option>
                <option>iPad</option>
                <option>AppleWatch</option>
              </select>
            </div>
            <div class="select-3">
              <select>
                <option selected disabled>Select your device</option>
                <option>iPhone 15</option>
                <option>iPhone 15 Pro Max</option>
                <option>iPhone Pro</option>
                <option>iPhone Plus</option>
                <option>iPhone 14</option>
              </select>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>