import Carousel from './components/Carousel'

const install = (Vue, opts = {}) => {
  Vue.component('Carousel', Carousel)
}
export default {
  install
}
export { Carousel }
