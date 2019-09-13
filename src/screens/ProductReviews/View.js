import {Button, Card, Icon, ListItem, Text} from "react-native-elements";
import React from "react";
import {FlatList} from "react-native";

export const View = ({product, reviews, ...props}) => {
  return <FlatList
    {...props}
    keyExtractor={item => item.id + ''}
    data={reviews}
    renderItem={({item}) => <ListItem
      // title={JSON.stringify(item)}
      title={`${item.created_by.username} (${item.rate})`}
      subtitle={`${item.text} ${item.created_by.email} ${item.created_by.first_name} ${item.created_by.last_name}`}
      bottomDivider
    />
    }
  />
    ;
};