import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import styles from './styles';
import { ecoletaApi } from '../../services/api';
import { Item } from '../../shared/domain/model/item';
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';
import { Point } from '../../shared/domain/model/point';

interface PointsParams {
  uf: string;
  city: string;
}

export const Points = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as PointsParams;

  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    ecoletaApi.get<Item[]>('item').then((response) => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    ecoletaApi
      .get<Point[]>('point', {
        params: {
          city: routeParams.city,
          uf: routeParams.uf,
          items: selectedItems,
        },
      })
      .then((response) => setPoints(response.data));
  }, [selectedItems]);

  useEffect(() => {
    async function loadPosition() {
      const { status } = await requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Oooopps...',
          'Precisamos de sua permisão para obter a localização.',
        );
        return;
      }
      const { coords } = await getCurrentPositionAsync();
      const { latitude, longitude } = coords;
      setInitialPosition([latitude, longitude]);
    }

    loadPosition();
  }, []);

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleNavigateToDetail(idPoint: number) {
    navigation.navigate('Detail', { idPoint });
  }

  function handleSelectedItem(idItem: number) {
    if (selectedItems.includes(idItem)) {
      setSelectedItems(selectedItems.filter((item) => item !== idItem));
    } else {
      setSelectedItems([...selectedItems, idItem]);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Feather name="arrow-left" size={20} color="#34cb79"></Feather>
        </TouchableOpacity>

        <Text style={styles.title}>Bem vindo.</Text>
        <Text style={styles.description}>
          Encontre no mapa um ponto de coleta.
        </Text>

        <View style={styles.mapContainer}>
          {initialPosition[0] !== 0 && (
            <MapView
              style={styles.map}
              loadingEnabled={initialPosition[0] === 0}
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}
            >
              {points.map((point) => (
                <Marker
                  key={point.id}
                  style={styles.mapMarker}
                  onPress={() => {
                    handleNavigateToDetail(point.id);
                  }}
                  coordinate={{
                    latitude: point.latitude,
                    longitude: point.longitude,
                  }}
                >
                  <View style={styles.mapMarkerContainer}>
                    <Image
                      style={styles.mapMarkerImage}
                      source={{
                        uri: point.image,
                      }}
                    ></Image>
                    <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                  </View>
                </Marker>
              ))}
            </MapView>
          )}
        </View>
      </View>

      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 30 }}
        >
          {items.map((item: Item) => {
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.item,
                  selectedItems.includes(item.id) ? styles.selectedItem : {},
                ]}
                activeOpacity={0.6}
                onPress={() => {
                  handleSelectedItem(item.id);
                }}
              >
                <SvgUri uri={item.imageUrl} width={42} height={42} />
                <Text style={styles.itemTitle}>{item.title}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </>
  );
};
