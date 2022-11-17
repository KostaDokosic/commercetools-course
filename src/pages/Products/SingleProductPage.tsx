import { AddShoppingCart } from '@mui/icons-material';
import { Button, Grid, ImageList, ImageListItem } from '@mui/material';
import { Box } from '@mui/system';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingContext } from '../../context/LoadingContext';
import { useGetProductByIdQuery } from '../../queries/product.query';
import { formatLocalizedString, getFormatedPrice, getProductColor, getProductMainImage, getProductSizes, getProductVariationImages } from '../../utils/helper';

export default function SingleProductPage() {
  const { productId } = useParams();
  const { data: product, isLoading, error, refetch } = useGetProductByIdQuery(productId || '-1')
  const { setLoading, setLoadingError } = useContext(LoadingContext)

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading])

  useEffect(() => {
    setLoadingError(error)
  }, [error, setLoadingError]);

  useEffect(() => {
    refetch()
  }, [productId]);

  return !isLoading && product ? (
    <Grid container spacing={4} gridRow={2}>
      <Grid item sm={8}>
        <Box sx={{ border: '1px solid #6363631c', padding: '1rem' }}>
          <img src={getProductMainImage(product)} alt="PImage" width='100%' />
        </Box>
        <ImageList cols={3} rowHeight={250} gap={8}>
          {getProductVariationImages(product).map(url => {
            return (<ImageListItem key={url}>
              <img
                src={`${url}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${url}`}
                alt='variantimg'
                loading="lazy"
              />
            </ImageListItem>)
          })}
        </ImageList>
      </Grid>
      <Grid item sm={4}>
        <Box>
          <h1>{formatLocalizedString(product.masterData.current.name)}</h1>
          <h3>Available sizes: {getProductSizes(product)}</h3>
          <h4>Available color: {getProductColor(product)}</h4>
          <p>Description: {formatLocalizedString(product.masterData.current.description)}</p>
          <Button variant="contained" endIcon={<AddShoppingCart />}>
            Add to Cart {getFormatedPrice(product)}
          </Button>
        </Box>
      </Grid>
    </Grid>
  ) : <></>
}
