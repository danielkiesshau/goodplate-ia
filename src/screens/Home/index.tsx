import { useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { styles } from './styles';

import { Tip } from '../../components/Tip';
import { Item } from '../../components/Item';
import { Button } from '../../components/Button';
import { api } from '../../modules/api';

const {
  EXPO_PUBLIC_MODEL_ID: MODEL_ID ,
  EXPO_PUBLIC_API_MODEL_VERSION_ID: MODEL_VERSION_ID ,
  EXPO_PUBLIC_API_USER_ID: API_USER_ID,
  EXPO_PUBLIC_API_APP_ID: API_APP_ID,
} = process.env;

type ImageBase64 = string | undefined | null;

export function Home() {
  const [selectedImageUri, setSelectedImageUri] = useState<ImageBase64>('');
  

  async function handleSelectImage(): Promise<void> {
   try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    const isPermissionGranted = status === ImagePicker.PermissionStatus.GRANTED;

    if (!isPermissionGranted) {
      return Alert.alert("É necessário conceder permissão para acessar seu álbum")
    }

    const imageResponse = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,  
      allowsEditing: true,
      aspect: [4,4],
      quality: 1,
      base64: true
    })

    if (imageResponse.canceled) {
      return Alert.alert("Selecione uma imagem")
    }

    const {
      assets: selectedImages
    } = imageResponse;

    const { base64, uri } = selectedImages[0];
    setSelectedImageUri(uri)

    detectImage(base64)
   } catch (error) {
    console.log('ERROR:', error)
   } 
  }

  async function detectImage(imageBase64: ImageBase64): Promise<void> {
    try {
      const body = {
          "user_app_id": {
              "user_id": API_USER_ID,
              "app_id": API_APP_ID
          },
          "inputs": [
              {
                "data": {
                    "image": {
                        "base64": imageBase64
                    }
                }
              }
          ]
      }

      const url = `v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`;
      
      console.log('INFO: url', url);
      console.log('INFO: body', JSON.stringify(body))

      const response = await api.post(
        url,
        body,
      )

      console.log('INFO: response', response)

    } catch (error: any) {
      console.log('ERROR: ', JSON.stringify(error));
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Button onPress={handleSelectImage} />
      <View style={styles.imageContainer}>
      {
        selectedImageUri ?
          <Image
            source={{ uri: selectedImageUri }}
            style={styles.image}
            resizeMode="cover"
          />
          :
          <Text style={styles.description}>
            Selecione a foto do seu prato para analizar.
          </Text>
      }
      </View>
      <View style={styles.bottom}>
        <Tip message="Aqui vai uma dica" />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 24 }}>
          <View style={styles.items}>
            <Item data={{ name: 'Vegetal', percentage: '95%' }} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}