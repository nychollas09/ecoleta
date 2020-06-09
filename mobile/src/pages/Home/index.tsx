import React, { useEffect, useState } from 'react';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import { View, Text, Image, ImageBackground } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import { Uf } from '../../shared/domain/interface/uf';
import { Municipio } from '../../shared/domain/interface/municipio';
import { ibgeApi } from '../../services/api';

export const Home = () => {
  const navigation = useNavigation();

  const [ufs, setUfs] = useState<Uf[]>([]);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);

  const [selectedUf, setSelectedUf] = useState<Uf>();
  const [selectedCity, setSelectedCity] = useState<Municipio>();

  useEffect(() => {
    ibgeApi.get<Uf[]>('').then((response) => setUfs(response.data));
  }, []);

  useEffect(() => {
    if (!selectedUf) {
      return;
    }

    ibgeApi
      .get<Municipio[]>(`${selectedUf.sigla}/municipios`)
      .then((response) => setMunicipios(response.data));
  }, [selectedUf]);

  function handleSelectedUf(uf: Uf) {
    setSelectedUf(uf);
    setSelectedCity(undefined);
  }

  function handleSelectedCity(municipio: Municipio) {
    setSelectedCity(municipio);
  }

  function handleValueSelectedCity() {
    if (!(selectedCity || selectedCity?.nome)) {
      return { label: 'Selecione uma cidade...', value: null };
    }
  }

  function handleNavigateToPoint() {
    navigation.navigate('Points', {
      uf: selectedUf.sigla,
      city: selectedCity.nome,
    });
  }

  return (
    <ImageBackground
      source={require('../../assets/home-background.png')}
      style={styles.container}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')}></Image>
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>
          Ajudamos pessoas a encontrarem ponto de coleta de forma eficiente.
        </Text>
      </View>

      <View style={styles.footer}>
        <RNPickerSelect
          style={{ inputIOS: styles.input, inputAndroid: styles.input }}
          placeholder={{ label: 'Selecione uma UF...', value: null }}
          onValueChange={handleSelectedUf}
          items={ufs.map((uf) => {
            return { label: uf.nome, value: uf, key: uf.id };
          })}
        />

        <RNPickerSelect
          style={{ inputIOS: styles.input, inputAndroid: styles.input }}
          placeholder={{ label: 'Selecione uma cidade...', value: null }}
          onValueChange={handleSelectedCity}
          value={handleValueSelectedCity()}
          items={municipios.map((municipio) => {
            return {
              label: municipio.nome,
              value: municipio,
              key: municipio.id,
            };
          })}
        />

        <RectButton style={styles.button} onPress={handleNavigateToPoint}>
          <View style={styles.buttonIcon}>
            <Feather name="arrow-right" color="#FFF" size={24} />
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
};
