const ProductLib = () =>
  import(/* webpackChunkName: "group-product" */ '@/views/product/ProductLib')

export default [
  {
    path: '/productLib',
    name: 'productLib',
    component: ProductLib,
    meta: {}
  }
]
