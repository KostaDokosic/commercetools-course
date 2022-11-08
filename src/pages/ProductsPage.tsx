import { Product } from "@commercetools/platform-sdk";
import { Grid } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PaginationComponent from "../components/Pagination";
import ProductCart from "../components/ProductCart";
import { LoadingContext } from "../context/LoadingContext";
import { useGetProductsQuery } from "../queries/product.query"

export default function ProductsPage() {
  const location = useLocation();
  const getPage = useCallback(() => {
    return Number(location.search.replace('?page=', '')) || 1;
  }, [location.search]);
  const [currentPage, setCurrentPage] = useState<number>(getPage());

  const { data: paginatedProducts, isLoading, error, refetch: reloadProducts } = useGetProductsQuery(currentPage);
  const { setLoading, setLoadingError } = useContext(LoadingContext)

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading])

  useEffect(() => {
    setLoadingError(error)

  }, [error, setLoadingError]);

  useEffect(() => {
    setCurrentPage(getPage());
  }, [getPage, location, reloadProducts]);

  useEffect(() => {
    reloadProducts();
  }, [currentPage, reloadProducts])

  const products = () => paginatedProducts?.results || [] as Product[];

  return !isLoading && paginatedProducts ? (
    <>
      <Grid container spacing={4}>
        {products().map((product: Product) => {
          return (
            <Grid item sm={4} key={product.key || product.id}>
              <ProductCart product={product} />
            </Grid>
          )
        })}
      </Grid>
      <PaginationComponent count={Math.ceil((paginatedProducts.total || paginatedProducts.limit) / paginatedProducts.limit)} />
    </>
  ) : <></>
}
