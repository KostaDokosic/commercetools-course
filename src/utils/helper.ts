import { Cart, LineItem, LocalizedString, Product } from "@commercetools/platform-sdk";

export const formatLocalizedString = (
  str: LocalizedString | undefined
): string => {
  return str ? str["en-US"] : "undefined";
};

export const getProductMainImage = (product: Product): string => {
  const master = product.masterData.current.masterVariant;
  return master && master.images?.length ? master.images[0].url : "undefined";
};

export const getProductVariationImages = (product: Product): string[] => {
  const master = product.masterData.current;
  return master.masterVariant.images
    ? master.masterVariant.images.map((img) => img.url)
    : [];
};

export const getProductSizes = (product: Product): number[] => {
  const master = product.masterData.current;
  const sizes: number[] = [];
  if (master.masterVariant.attributes) {
    master.masterVariant.attributes.forEach((attribute) => {
      sizes.push(attribute.name === "size" && attribute.value);
    });
  }
  return sizes;
};

export const getProductColor = (product: Product): string | undefined => {
  const master = product.masterData.current;
  let color: string = "";
  if (master.masterVariant.attributes) {
    master.masterVariant.attributes.forEach((attribute) => {
      if (attribute.name === "color") color = attribute.value.label;
    });
  }
  return color;
};
export const getProductPrice = (product: Product) => {
  const master = product.masterData.current;
  return master.masterVariant.prices?.at(0);
};

export const getFormatedPrice = (product: Product) => {
  return `${Number(getProductPrice(product)?.value.centAmount) / 100} ${
    getProductPrice(product)?.value.currencyCode
  }`;
};

export const getLineItemSize = (item: LineItem): string => {
 return item.custom?.fields['size'];
};

export const getLineItemColor = (item: LineItem): string => {
  return item.custom?.fields['color'];
 };

export const formatLineItemPrice = (item: LineItem): string => {
  return `${item.price.value.centAmount / 100}${item.price.value.currencyCode}`;
 };

 export const getLineItemPrice = (item: LineItem): number => {
  return item.price.value.centAmount / 100 * item.quantity;
 };

 export const getTotalPriceOfCart = (cart: Cart) => {
  let price = 0;
  cart.lineItems.forEach(i => price += getLineItemPrice(i))
  return price;
 }