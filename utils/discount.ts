import { Products } from 'src/schemas/products.schema';
// import { unitPrice } from './types';

export const discountCalculate = (amount: number, percentage: number) => {
  const beforeDiscount = amount;
  const discountAmount = parseFloat(
    ((beforeDiscount * percentage) / 100).toFixed(2),
  );
  const afterDiscount = beforeDiscount - discountAmount;
  return { afterDiscount, discountAmount };
};

export function discountPriceCalculation(product: Products, priceUnit: number) {
  if (product?.is_discountable) {
    const { afterDiscount } = discountCalculate(priceUnit, 10);
    return afterDiscount;
  } else {
    if (product?.discount_type === 'Percentage') {
      const { afterDiscount } = discountCalculate(
        priceUnit,
        product?.discount_value,
      );
      return afterDiscount;
    } else {
      return priceUnit - product?.discount_value;
    }
  }
}
