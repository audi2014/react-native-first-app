
import React from "react";
import {View} from "./View";
import {fetchProducts, fetchReviewsByProductId} from "../../api";
import {ProductsView} from "../Products/View";

export const ProductReviewsScreen = ({navigation}) => {
  const product = navigation.state.params.product;
  const [reviews, setReviews] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (isLoading)
      fetchReviewsByProductId(product.id)
        .then(r=>setReviews(r.reverse()))
        .then(() => setLoading(false))
  }, [isLoading]);
  return <View
    refreshing={isLoading}
    onRefresh={() => setLoading(true)}
    reviews={reviews}
    product={product}
  />
};