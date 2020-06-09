import React, { useEffect, useState } from 'react';
import styles from './styles';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Linking,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { ecoletaApi } from '../../services/api';
import { Point } from '../../shared/domain/model/point';
import * as MailComposer from 'expo-mail-composer';

interface RouteParams {
  idPoint: number;
}

export const Detail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { idPoint } = route.params as RouteParams;

  const [point, setPoint] = useState<Point>({} as Point);

  useEffect(() => {
    ecoletaApi
      .get<Point>(`point/${idPoint}`)
      .then((response) => setPoint(new Point(response.data)));
  }, []);

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=${point.whatsapp}&text=Tenho interesse sobre coleta de resíduos.`,
    );
  }

  function handleComposeMail() {
    MailComposer.composeAsync({
      subject: 'Interesse na coleta de resíduos',
      recipients: [point.email],
    });
  }

  if (!point || !point.id) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Feather name="arrow-left" size={20} color="#34cb79"></Feather>
        </TouchableOpacity>

        <Image
          style={styles.pointImage}
          source={{
            uri: point.image,
          }}
        />

        <Text style={styles.pointName}>{point.name}</Text>
        <Text style={styles.pointItems}>
          {point.items.map((item) => item.title).join(', ')}
        </Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>
            {point.city}, {point.uf}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleWhatsapp}>
          <FontAwesome name="whatsapp" size={20} color="#FFF" />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={handleComposeMail}>
          <Feather name="mail" size={20} color="#FFF" />
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
};
