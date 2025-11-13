import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image } from 'react-native';
import { ThemeContext } from './ThemeContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const EntryPage = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);

  const themeStyles = isDarkMode
    ? styles.darkContainer
    : styles.lightContainer;

  useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');
    StatusBar.setBackgroundColor(isDarkMode ? '#0d0d0d' : 'white');
  }, [isDarkMode]);

  return (
    <View style={[styles.container, themeStyles]}>
      <View style={styles.buttonBox}>
        <Image source={require('./assets/srm-logo.png')} style={styles.logo} resizeMode="contain" />

        <Text style={styles.title}>WELCOME TO</Text>
        <Text style={[styles.title, { fontWeight: 'bold' },styles.glowText]}>IT NOTICEBOARD</Text>
        <Text style={[styles.subtitle, { marginBottom: 20 }]}>from Department of IT</Text>

        <Text style={styles.description}>
          Your one-stop destination for staying updated with the latest happenings from the
          Department of Information Technology.
        </Text>

        <Text style={styles.features}>
          🔹 <Text style={styles.bold}>Events</Text>: Stay informed about upcoming Events.
        </Text>
        <Text style={styles.features}>
          🔹 <Text style={styles.bold}>Circulars</Text>: Access important Circulars.
        </Text>
        <Text style={[styles.description, { marginTop:10,marginBottom: 30 }]}>
          Stay tuned. Stay ahead. 🚀
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('EventsPage')}
        >
          <Icon name="calendar" size={20} color="#fff" />
          <Text style={styles.buttonText}>Explore Events</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CircularsPage')}
        >
            <Icon name="bullhorn" size={20} color="#fff" />
          <Text style={styles.buttonText}>View Circulars</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 30,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  features: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 5,
    marginTop: 5
  },
  bold: {
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBox: {
    backgroundColor: '#0c477f',
    borderWidth: 2,
    borderColor: '#007BFF',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  darkContainer: {
    backgroundColor: 'black',
  },
  lightContainer: {
    backgroundColor: 'white',
  },
  button: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#007BFF',
    borderRadius: 25,
    width: 200,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#007BFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logo: {
    marginTop: -20,
    width: 100,
    height: 100,
  },
  glowText: {
    color: '#fff',
    textShadowColor: '#fff', // Glow color
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6.5, // Increases the glow intensity
  },
});

export default EntryPage;
