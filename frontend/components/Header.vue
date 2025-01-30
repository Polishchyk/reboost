<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Header"
})
</script>

<template>
  <header>
    <div class="wrap">
      <div class="box">
        <div class="logo"><a href="index.html"><img src="/img/logo.svg" alt="reboost - logo"></a></div>
        <div class="menu">
          <ul>
            <li>
              <a href="macbook-air-13-repair.html">Computer Repair</a>
              <div class="submenu">
                <ul>
                  <li class="title">Apple</li>
                  <li><a href="">Macbook Pro</a></li>
                  <li><a href="macbook-air-13-repair.html">Macbook Air</a></li>
                  <li><a href="">iMac</a></li>
                </ul>
                <ul>
                  <li class="title">PC</li>
                  <li><a href="">Microsoft</a></li>
                  <li><a href="">Dell</a></li>
                  <li><a href="">Lenovo</a></li>
                  <li><a href="">HP</a></li>
                </ul>
              </div>
            </li>
            <li>
              <a href="iphone-repairs.html">Phone Repair</a>
              <div class="submenu">
                <ul>
                  <li><a href="iphone-repairs.html">iPhone</a></li>
                  <li><a href="">Samsung Galaxy</a></li>
                  <li><a href="">Xiaomi</a></li>
                </ul>
              </div>
            </li>
            <li>
              <a href="">Sell</a>
              <div class="submenu">
                <ul>
                  <li><a href="">iPhone</a></li>
                  <li><a href="">Macbook</a></li>
                  <li><a href="">iPad</a></li>
                  <li><a href="">Laptop</a></li>
                </ul>
              </div>
            </li>
            <li><a href="services.html">Business IT</a></li>
            <li>
              <a href="">Other</a>
              <div class="submenu">
                <ul>
                  <li><a href="phone-protection-service.html">Phone Protection</a></li>
                </ul>
              </div>
            </li>
            <li><a href="">Contact Us</a></li>
          </ul>
        </div>
        <div class="number"><a href="tel:+380912101188">091 210 11 88</a></div>
        <div class="lang">
          <div class="selected">EN</div>
          <div class="dropdown">
            <ul>
              <li><a href="">English</a></li>
              <li><a href="">Deutsch</a></li>
              <li><a href="">Italiano</a></li>
              <li><a href="">Français</a></li>
            </ul>
          </div>
        </div>
        <div class="mmenu"></div>
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>