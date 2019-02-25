<template>
  <div id="app">
    <!--<transition :name="'vux-pop-' + (direction === 'right' ? 'in' : (direction === 'left'?'out':''))">-->
        <router-view></router-view>
    <!--</transition>-->
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
  name: 'app',
    computed: mapState({
      direction: state => state.user.direction,
    }),
}
</script>

<style>
  @import url(//at.alicdn.com/t/font_385880_l7508fvevnfry66r.css);

  .vux-pop-out-enter-active,
  .vux-pop-out-leave-active,
  .vux-pop-in-enter-active,
  .vux-pop-in-leave-active {
    will-change: transform;
    transition: all 250ms;
    height: 100%;
    top: 0;
    position: absolute;
    backface-visibility: hidden;
    perspective: 1000;
  }
  .vux-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .vux-pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  html{
    font-size: 40px;
  }
  html,body {
    width: 100%;
    height: 100%;
  }

  a, abbr, acronym, address, applet, article, aside, audio, b, big, blockquote, body, canvas, caption, center, cite, code, dd, del, details, dfn, div, dl, dt, em, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, html, i, iframe, img, ins, kbd, label, legend, li, mark, menu, nav, object, ol, p, pre, q, s, samp, section, small, span, strike, strong, sub, summary, sup, table, tbody, td, tfoot, th, thead, time, tr, tt, u, ul, var, video {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    line-height: 0;
    content: "";
  }
  body {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #000;
    font-size: 0.22rem;
    padding-bottom: constant(safe-area-inset-bottom);
  }
  ul,li{
    list-style: none;
  }
  html,body,#app{
    width: 100%;
    height: 100%;
  }
</style>
