import { Text, Image,Alert, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { FOOD_TYPES, ImageBase64, RecognizedItem } from "../../../../modules/interfaces";
import { api } from '../../../../modules/api';
import RecognizedItemDTO from '../../../../modules/RecognizedItemDTO';
import { byFoodType } from '../../../../modules/utils/byFoodType';
import { Button } from '../../../../components/Button';
import { styles } from './SelectedImage.styles';

interface SelectedImageProps {
  isLoading: boolean,
  selectedImageUri: ImageBase64,
  setLoading: (flag: boolean) => void;
  setSelectedImageUri: (image: ImageBase64) => void;
  setRecognizedItem: (items: RecognizedItem[]) => void;
  setTipMessage: (message: string) => void;
}

const {
  EXPO_PUBLIC_MODEL_ID: MODEL_ID ,
  EXPO_PUBLIC_API_MODEL_VERSION_ID: MODEL_VERSION_ID ,
  EXPO_PUBLIC_API_USER_ID: API_USER_ID,
  EXPO_PUBLIC_API_APP_ID: API_APP_ID,
  EXPO_PUBLIC_SHOW_ALL_RECOGNITIONS: SHOW_ALL_RECOGNITIONS,
} = process.env;

const SelectedImage = ({
  isLoading,
  selectedImageUri,
  setLoading,
  setSelectedImageUri,
  setRecognizedItem,
  setTipMessage,
}: SelectedImageProps) => {


  async function handleSelectImage(): Promise<void> {
    try {
      setRecognizedItem([]);
    
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
       return Alert.alert("Select an Image")
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
      // console.log('INFO: body', JSON.stringify(body));

      setLoading(true);

      const response = await api.post(
        url,
        body,
      );

      console.log('INFO: response', response);

      let recognizedItems: RecognizedItem[] = []

      const acceptedFoods = [
        FOOD_TYPES.VEGETABLES,
        FOOD_TYPES.MEAT,
        FOOD_TYPES.LEGUMES,
        FOOD_TYPES.CHICKEN,
        FOOD_TYPES.RICE,
        FOOD_TYPES.EGG,
        FOOD_TYPES.TOMATO,
        FOOD_TYPES.SAUSAGE,
        FOOD_TYPES.HAM,
        FOOD_TYPES.BACON,
        FOOD_TYPES.PORK,
      ]

      response.data.outputs[0]
      .data
      .concepts
      .forEach((item: RecognizedItem) => {
        const isAcceptedFoodType = acceptedFoods.includes(item.name as FOOD_TYPES);
        const shouldShowAllRecognitions = SHOW_ALL_RECOGNITIONS === 'true'

        if (isAcceptedFoodType || shouldShowAllRecognitions) {
          recognizedItems.push(new RecognizedItemDTO(item).parse());
        }
      });

      const hasVegetable = recognizedItems.find((
        item
      ) => byFoodType(FOOD_TYPES.VEGETABLES, item));

      if (!!hasVegetable) {
        setTipMessage("Add some healthy vegetable! :)")
      }

      recognizedItems.sort((
        itemA: RecognizedItem, 
        itemB: RecognizedItem
      ) => itemB.value - itemA.value)
      
      console.log('INFO: recognizedItems', recognizedItems);

      setRecognizedItem(recognizedItems);

    } catch (error: any) {
      console.log('ERROR: ', JSON.stringify(error));
    }

    setLoading(false)
  }

   
  return (
    <>
      <Button onPress={handleSelectImage} disabled={isLoading} />
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
            Select a photo of a meal to be analysed
          </Text>
      }
      </View>
    </>
  )
};


export default SelectedImage