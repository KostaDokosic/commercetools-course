import { Product, ProductProjection } from "@commercetools/platform-sdk";
import { Autocomplete, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "../services/search.service";
import { formatLocalizedString } from "../utils/helper";
import { ROUTES } from "../utils/static";

let debounce: number;
export default function ProductSearch() {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const navigate = useNavigate();
  const [text, setText] = useState<string>('');

  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        onInputChange={(event, newInputValue) => {
          clearTimeout(debounce);
          debounce = window.setTimeout(async () => {
            const searched = await searchProducts(newInputValue);
            if(typeof searched === 'string') return;
            setProducts(searched);   
          }, 200);
          setText(newInputValue);
        }}
        options={products.map((product) => formatLocalizedString(product.name))}
        renderInput={(params) => <TextField {...params} label="Find product" onSelect={() => {
          const product = products.find(i => formatLocalizedString(i.name) === text);
          if(product) navigate(`${ROUTES.PRODUCTS}/${product.id}`, {replace: true})
        }} />}
      />

    </Stack>
  )
}