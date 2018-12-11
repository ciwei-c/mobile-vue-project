const Map = () =>
  import(/* webpackChunkName: "group-map" */ '@/views/map/Map')

export default [
  {
    path: '/map',
    name: 'map',
    component: Map,
    meta: {}
  }
]
