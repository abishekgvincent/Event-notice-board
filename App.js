import React, { useState} from 'react';
import 'react-native-gesture-handler';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ThemeContext } from './ThemeContext';
import EntryPage from './EntryPage';
import EventsPage from './EventsPage';
import CircularsPage from './CircularsPage';

const Stack = createStackNavigator();

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="EntryPage"
          screenOptions={{
            headerStyle: {
              backgroundColor: isDarkMode ? '#0c477f' : '#0c477f',
            },
            headerTintColor: isDarkMode ? 'white' : 'white',
          }}
        >
          <Stack.Screen
            name="EntryPage"
            component={EntryPage}
            options={{
              title: 'Home',
              headerRight: () => <ThemeToggleButton />,
            }}
          />
          <Stack.Screen
            name="EventsPage"
            component={EventsPage}
            options={{ title: 'Events' }}
          />
          <Stack.Screen
            name="CircularsPage"
            component={CircularsPage}
            options={{ title: 'Circulars' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
};

const ThemeToggleButton = () => {
  const { toggleTheme, isDarkMode } = React.useContext(ThemeContext);
  return (
    <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
      <Icon
        name={isDarkMode ? 'sun-o' : 'moon-o'}
        size={24}
        color={isDarkMode ? '#fff' : '#fff'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  themeButton: {
    position: 'absolute',
    right: 20,
    margin: 10,
    padding: 5,
    borderRadius: 2,
  },
});

export default App;
