import React from "react";
import {View} from "./View";
import {fetchReviewsByProductId, postReview} from "../../api";
import {NavigationActions} from 'react-navigation';

export const ProductInfoScreen = ({navigation}) => {
    const product = navigation.state.params.product;
    const [reviews, setReviews] = React.useState([]);
    const [isLoading, setLoading] = React.useState(true);


    const handleSubmitRating = ({id, text, rate,token}) => {
      postReview({id, text, rate, token})
        .then(r => {
          if(r.success) {
            handleGoToReviews(product)
          } else {
            alert(JSON.stringify(r))
          }
        })
    };
    const handleGoToReviews = (product) => navigation.navigate(
      'ProductReviews', {product});
    const handleGoToLogin = (product) => {
      navigation.navigate(
        'loginFlow',
        {},
        NavigationActions.navigate({
          routeName: 'Login', params: {
            onSuccess: (nextNav) => {
              nextNav.dismiss();
              nextNav.replace(navigation.state.routeName, navigation.state.params);
            }
          }
        }));
    };
    React.useEffect(() => {
      if (isLoading)
        fetchReviewsByProductId(product.id)
          .then(setReviews)
          .then(() => setLoading(false))
    }, [isLoading]);
    return <View
      onSubmitRating={handleSubmitRating}
      goToLogin={handleGoToLogin}
      goToReviews={handleGoToReviews}
      refreshing={isLoading}
      onRefresh={() => setLoading(true)}
      reviews={reviews}
      product={product}
    />
  }
;