interface Props {
  params: { slug: string[] }
  searchParams: { sortOrder: string }
}

// [[...slug]] it optional catch all,
// if we not have id still `/products` route access
// [...slug] with single bracket catch all rout give error when we only want to access `/products` roue.
// By this [[...slug]] you can access id one by one or all id at same time.
// searchParams: {sortOrder: string} this means accessing query string parameter
// sortOrder it think type inside ural like `products?sortOrder=name`
const ProductPage = ({ params: { slug }, searchParams: { sortOrder } }: Props) => {
  return (
    <div>
      ProductPage: {slug} {sortOrder}
    </div>
  )
}

export default ProductPage
