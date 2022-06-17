import React, {useRef, useState, useEffect} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
  Animated,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

function Button({
  label,
  style,
  disabled = false,
  backgroundColor = 'rgb(204, 141, 248)',
  backgroundColorDisabled = 'rgb(221, 221, 221)',
  ...props
}) {
  const disabledValueRef = useRef(new Animated.Value(disabled ? 1 : 0));
  useEffect(() => {
    Animated.timing(disabledValueRef.current, {
      toValue: disabled ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [disabled]);

  const interpolatedBackgroundColor = disabledValueRef.current.interpolate({
    inputRange: [0, 1],
    outputRange: [backgroundColor, backgroundColorDisabled],
  });
  return (
    <TouchableOpacity>
      <Animated.View
        style={[{backgroundColor: interpolatedBackgroundColor}, style]}
        {...props}>
        <Text>{label}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setDisabled(value => !value);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Button label="Button" disabled={disabled} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
