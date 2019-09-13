import React from "react";
// import {ListItem} from "./ListItem";
import {FlatList} from "react-native";
import {View} from "../../components";
import {ListItem} from "react-native-elements";
import {makeImageUrl} from "../../api";

export const ProductsView = ({items = [], goToProductInfo, ...props}) => {
  return <FlatList
    {...props}
    keyExtractor={item => item.id + ''}
    data={items}
    renderItem={({item}) => <ListItem
      onPress={() => goToProductInfo(item)}
      title={item.title}
      subtitle={item.text}
      leftAvatar={{source: {uri: makeImageUrl(item.img)}}}
      bottomDivider
      chevron
    />}
  />;
};