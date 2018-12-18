### Vue-mobile-carousel

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

#### Installation
    npm i vue-mobile-carousel

#### Usage
    import Carousel from 'vue-mobile-carousel'

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
| speed             | Number (sec)              | per active's time     |
| expect_height     | Number (px)               |  image's actually height     |
| imgArray          | Array                     | for example:[{src:'x.png',href:'x.html'}]    |
| autoplay          | Boolean (default:false)   | autoplay    |

#### Example
    <Carousel
      :initPage = 0
      :speed = 3000
      :expect_height = 280
      :imgArray = imgArray
      :autoplay = true
      ></Carousel>
#### Run in local
    npm i install
    npm run dev
