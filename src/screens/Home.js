import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const Home = ({ navigation }) => {
  // Datos de ejemplo
  const sections = [
    {
      title: 'Frigorífico',
      items: [
        { name: 'Leche', date: '05/04/25' },
        { name: 'Yogures', date: '10/04/25' },
        { name: 'Queso', date: '15/04/25' }
      ]
    },
    {
      title: 'Despensa',
      items: [
        { name: 'Arroz', date: '01/05/25' },
        { name: 'Lentejas', date: '30/04/25' },
        { name: 'Aceite', date: '01/06/25' }
      ]
    },
    {
      title: 'Congelador',
      items: [
        { name: 'Pescado', date: '01/05/25' },
        { name: 'Verduras', date: '20/04/25' },
        { name: 'Helado', date: '10/05/25' }
      ]
    }
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity 
                key={itemIndex} 
                style={styles.item}
                onPress={() => navigation.navigate('FoodDetails', { item })}
              >
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDate}>{item.date}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* Botón flotante + */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('AddItem')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    paddingBottom: 80, // Espacio para el botón flotante
  },
  section: {
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 8,
    padding: 15,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  itemName: {
    fontSize: 16,
    color: '#34495e',
  },
  itemDate: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  addButton: {
    position: 'absolute',
    bottom: 25,
    right: 20,
    backgroundColor: '#3498db',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 30,
    marginBottom: 4,
  },
});

export default Home;