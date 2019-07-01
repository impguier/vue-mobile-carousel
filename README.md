### Vue-mobile-carousel

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

#### Installation
    npm i vue-mobile-carousel

#### Usage
    import { Carousel } from 'vue-mobile-carousel'

    export default {
      ...
      components:{
        Carousel
      }
      ...
    }
#### Config
| key               | value                     |   description   |
| --------          | ---------                 | -----------     |
| initPage          | Number                    | init page for show     |
| speed             | Number (ms)               | per active's time     |
| expect_height     | Number (px)               |  image's actually height     |
| imgArray          | Array                     | for example:[{src:'x.png',href:'x.html'}]    |
| autoplay          | Boolean (default:false)   | autoplay    |
| navigator_pos     | String: inner | outer     | inner: pageniation is in banner, outer: pageniation is not
| normalClass       | Object  (css)             | pageniation-element's style
| navigator_pos     | Object  (css)             | actived pageniation-element's style
#### Example
    <Carousel
      :initPage = 0
      :speed = 3000
      :expect_height = 280
      :imgArray = imgArray
      :autoplay = true
      :navigator_pos='inner'
      :normalClass={background:#f4f5f6}
      :activeClass={background:#fff}
      ></Carousel>

#### Run in local
    npm i install
    npm run dev

#### PS
width of image bases on standard screen width(750)
if image's height 750 * 280 ,when screen width is 375, the height is 140
