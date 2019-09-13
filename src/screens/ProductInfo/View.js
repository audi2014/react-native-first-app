import {Button, Card, Icon, Input, AirbnbRating, Text, withTheme} from "react-native-elements";
import React from "react";
import {makeImageUrl} from "../../api";
import {ActivityIndicator, ScrollView,} from "react-native";
import {IfTokenAsync} from "../../storage/profile";

const RateForm = ({product, onSubmitRating, token}) => {
  const [rate, setRate,] = React.useState(1);
  const [text, setText,] = React.useState('');
  const handleSubmit = () => onSubmitRating({id: product.id, rate, text, token});

  return <React.Fragment>
    <AirbnbRating
      reviews={['Zero', 'Terrible', 'Bad', 'Okay', 'Good', 'Great']}
      count={6}
      defaultRating={rate}
      showRating
      onFinishRating={setRate}
      style={{paddingVertical: 10}}
    />
    <Input
      inputContainerStyle={{margin: 10}}
      onChangeText={setText}
      value={text}
      placeholder='text'
    />

    <Button
      onPress={handleSubmit}
      icon={<Icon name='rate-review' color='white'/>}
      buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0}}
      title='Submit'/>

  </React.Fragment>
};

export const View = withTheme(({product, reviews, goToReviews, onSubmitRating, goToLogin, theme}) => {
  const handleGoToReviews = () => goToReviews(product);
  return <ScrollView>
    <Card
      title={product.title}
      imageProps={{
        PlaceholderContent: <ActivityIndicator/>,
        resizeMode: 'contain',
      }}
      image={{uri: makeImageUrl(product.img)}}>
      <Text style={{marginBottom: 10}}>
        {product.text}
      </Text>

    </Card>
    <Card
      title={'Submit Rate'}
    >
      {IfTokenAsync(
        (token) => <RateForm
          onSubmitRating={onSubmitRating}
          product={product}
          token={token}
        />,
        () => <Button
          onPress={goToLogin}
          type="outline"
          buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='Login to Submit Rate'/>,
        () => <ActivityIndicator/>
      )}
      <Button
        type="outline"
        onPress={handleGoToReviews}
        icon={<Icon name='list' color={theme.colors.primary}/>}
        buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 5}}
        title='Show Rates'/>
    </Card>
  </ScrollView>;
});