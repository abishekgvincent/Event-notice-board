import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator, TouchableOpacity, StatusBar, RefreshControl, Modal, Linking, ScrollView} from 'react-native';
import { firestore } from './firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ThemeContext } from './ThemeContext';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [expandedEventId, setExpandedEventId] = useState(null);
  const { isDarkMode } = useContext(ThemeContext);
  const [filteredEvents, setFilteredEvents] = useState([]); // For filtering events
  const [viewing, setViewing] = useState('upcoming'); // State to manage viewing upcoming/previous events
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);


  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    setLoading(true);
    const eventsCollection = collection(firestore, 'circulars');
    const unsubscribe = onSnapshot(
      eventsCollection,
      (snapshot) => {
        const eventsData = snapshot.docs.map((doc) => {
          const event = doc.data();
          return {
            ...event,
            id: doc.id,
            formattedDate: event.startDate && event.endDate
              ? `${event.startDate} to ${event.endDate}`
              : event.startDate || 'Date not available',
          };
        });

        const today = new Date();
        const todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // Midnight today
        const tomorrow = new Date(todayWithoutTime);
        tomorrow.setDate(tomorrow.getDate() + 1); // Midnight of the next day

        const sortedEvents = eventsData.sort((a, b) => {
          const dateA = parseDate(a.startDate) || parseDate(a.endDate) || new Date('9999-12-31');
          const dateB = parseDate(b.startDate) || parseDate(b.endDate) || new Date('9999-12-31');
          return dateA - dateB;
        });

        // Keep events in "Upcoming" until the FULL day of endDate has passed
        const upcomingEvents = sortedEvents.filter((event) => {
          const endDate = parseDate(event.endDate);
          return !endDate || endDate >= todayWithoutTime; // Keep until the day is over
        });

        // Move to "Previous" only when the FULL day has passed
        const previousEvents = sortedEvents.filter((event) => {
          const endDate = parseDate(event.endDate);
          return endDate && endDate < todayWithoutTime; // Move if the day has already ended
        });

        setEvents(sortedEvents);
        setFilteredEvents(viewing === 'upcoming' ? upcomingEvents : previousEvents);
        setLoading(false);
        setRefreshing(false);
      },
      (err) => {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please check your connection.');
        setLoading(false);
        setRefreshing(false);
      }
    );

    return unsubscribe;
  };

  const parseDate = (dateStr) => {
    if (!dateStr) return null;

    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  const toggleViewing = (type) => {
    setViewing(type);
  };
    // Filter events based on the status
    useEffect(() => {
        const today = new Date();
        const todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // Midnight today

        if (viewing === 'upcoming') {
          const upcoming = events.filter((event) => {
            const eventEndDate = parseDate(event.endDate);
            const eventStartDate = parseDate(event.startDate);


            const relevantDate = eventEndDate || eventStartDate;

            return relevantDate && relevantDate >= todayWithoutTime; // Keep until the full day is over
          });
          setFilteredEvents(upcoming);
        } else {
          const previous = events.filter((event) => {
            const eventEndDate = parseDate(event.endDate);
            const eventStartDate = parseDate(event.startDate);


            const relevantDate = eventEndDate || eventStartDate;

            return relevantDate && relevantDate < todayWithoutTime; // Move only if the day has fully passed
          });
          setFilteredEvents(previous);
        }
      }, [events, viewing]);


  const openEventModal = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };
   const handleImagePress = (url) => {
      if (url) {
        Linking.openURL(url);
      }
    };

  const handlelink = () => {
    const url = selectedEvent?.link;
    if (url && typeof url === 'string') {
      Linking.openURL(url).catch((err) => console.error('Failed to open URL', err));
    } else {
      console.log('Invalid or missing URL');
    }
  };


  const themeStyles = isDarkMode ? styles.dark : styles.light;

  useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');
    StatusBar.setBackgroundColor(isDarkMode ? 'black' : 'white');
  }, [isDarkMode]);

  if (events.length === 0 && !loading) {
    return (
      <View style={styles.noEventsContainer}>
        <Text style={styles.noEventsText}>No Circulars available.</Text>
      </View>
    );
  }


  if (loading) {
    return (
      <View style={[styles.centeredContainer, themeStyles]}>
        <ActivityIndicator size="large" color='white' />
        <Text style={{ color: 'white' }}>Loading circulars...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.centeredContainer, themeStyles]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, themeStyles]}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => toggleViewing('upcoming')} style={[styles.button, viewing === 'upcoming' && styles.activeButton]}>
          <Text style={styles.buttonText}>Current Circulars</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleViewing('previous')} style={[styles.button, viewing === 'previous' && styles.activeButton]}>
          <Text style={styles.buttonText}>Past Circulars</Text>
        </TouchableOpacity>
      </View>

      <FlatList
  data={filteredEvents}
  keyExtractor={(item) => item.id}
  ListEmptyComponent={
    <View style={styles.noEventsContainer}>
      <Text style={[styles.noEventsText, themeStyles]}>
        {viewing === 'upcoming' ? 'No current circulars.' : 'No past circulars.'}
      </Text>
    </View>
  }
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={() => {
        setRefreshing(true);
        fetchEvents();
      }}
    />
  }
  renderItem={({ item }) => {
    const descriptionText = item.description || ''; // Fallback to an empty string if undefined
    const descriptionThreshold = 100; // Set character threshold
    const isDescriptionLong = descriptionText.length > descriptionThreshold;

    return (
      <TouchableOpacity
      style={styles.eventCard}
      onPress={() => openEventModal(item)}
    >
         {item.image && (
                <TouchableOpacity onPress={() => handleImagePress(item.image)}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.eventImage}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              )}
        <Text style={styles.eventTitle}>{item.title}</Text>
        <View style={styles.dateContainer}>
          <Icon style={styles.calendericon} name="calendar" size={15} color="#666" />
          <Text style={styles.eventDate}>{item.formattedDate}</Text>
        </View>

        <Text
          style={styles.eventDescription}
          numberOfLines={expandedEventId === item.id ? 0 : 4}
        >
          {descriptionText}
        </Text>

        {isDescriptionLong && (
          <Text style={styles.toggleText}>
            {expandedEventId === item.id ? 'Show Less' : 'Read More'}
          </Text>
        )}
      </TouchableOpacity>
    );
  }}
/>
<Modal
  animationType="fade"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
    <ScrollView contentContainerStyle={styles.modalScrollContent}>
      {selectedEvent?.image && (
        <Image
          source={{ uri: selectedEvent.image }}
          style={styles.modalImage}
        />
      )}
      <Text style={styles.modalTitle}>{selectedEvent?.title}</Text>
      <Text style={styles.modalDate}>Date: {selectedEvent?.formattedDate}</Text>
      <Text style={styles.modalDescription}>{selectedEvent?.description}</Text>
       <Text onPress={handlelink} style={styles.modalLink}>{selectedEvent?.link} </Text>
      </ScrollView>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setModalVisible(false)}
      >
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>



    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30,
  },
  eventCard: {
    padding: 15,
    marginBottom: 14,
    backgroundColor: '#0c477f',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  eventImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  eventDate: {
    color: '#b3b3b3',
    marginVertical: 5,
    fontSize: 14,
  },
  eventDescription: {
    color: 'white',
  },
  toggleText: {
    color: '#007BFF',
    marginTop: 10,
    fontSize: 14,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  themeButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    margin: 10,
    padding: 5,
    borderRadius: 2,
  },
  light: {
    backgroundColor: '#fff',
    color: '#000',
  },
  dark: {
    backgroundColor: '#0d0d0d',
    color: 'white',
  },
  dateContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  modalTime: {
    fontSize: 16,
    color: '#b3b3b3',
    marginBottom: 5,
    alignSelf: 'flex-start', // Align to the left
  },

  modalVenue: {
    fontSize: 16,
    color: '#b3b3b3',
    marginBottom: 15,
    alignSelf: 'flex-start', // Align to the left
  },

  calendericon: {
    padding: 6,
  },
  noEventsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noEventsText: {
    fontSize: 20,
    color: 'black',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 20,
    opacity: 0.7
  },
  activeButton: {
    backgroundColor: '#0c477f',
    opacity: 1
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '90%',  // Adjust to fit within 90% of screen width
  maxHeight: '80%',  // Limit to 80% of screen height
  padding: 18,
  backgroundColor: '#0c477f',
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'center',
  },
  modalScrollContent: {
    paddingBottom: 30, // Add padding at the bottom to make space for close button
  },
  modalTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDate: {
    fontSize: 16,
    color: '#b3b3b3',
    marginBottom: 5,
    alignSelf: 'flex-start'
  },
  modalDescription: {
    fontSize: 17,
    color: 'white',
    marginBottom: 5,
    alignSelf:'flex-start',
    textAlign: 'auto'
  },
  closeButton: {
    padding: 5,
    backgroundColor: '#007BFF',
    borderRadius: 10,
    marginBlockStart:10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalImage: {
    width: '100%',
    height: 350,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: 'contain',
    minHeight: 350,
    minWidth: '100%',
  },
  modalLink:
  {
    color: '#0398fc',
    fontSize: 16
  }

});

export default EventsPage;
