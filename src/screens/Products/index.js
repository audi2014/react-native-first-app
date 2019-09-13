import React from "react";
import {
  Button,
} from 'react-native';
import {ProductsView} from "./View";
import {fetchProducts} from "../../api";


export const ProductsScreen = ({navigation}) => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  //onRefresh
  React.useEffect(() => {
    if (isLoading) fetchProducts()
      .then(setItems)
      .then(()=>setLoading(false))
  }, [isLoading]);
  return (
    <ProductsView
      refreshing={isLoading}
      onRefresh={() => setLoading(true)}
      items={items}
      goToProductInfo={product => navigation.navigate('ProductInfo', {product})}/>
  );
};
ProductsScreen.navigationOptions = {
  title: 'Products',
};