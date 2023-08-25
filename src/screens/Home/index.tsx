import { useState } from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import { RecognizedItem } from '../../modules/interfaces';
import BottomContent from './components/BottomContent/BottomContent.native'
import { ImageBase64 } from '../../modules/interfaces';
import SelectedImage from './components/SelectedImage/SelectedImage.native';




export function Home() {
  const [selectedImageUri, setSelectedImageUri] = useState<ImageBase64>('');
  const [tipMessage, setTipMessage] = useState<string>('');
  const [recognizedItems, setRecognizedItem] = useState<RecognizedItem[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  
  return (
    <View style={styles.container}>
      <SelectedImage 
        isLoading={isLoading} 
        selectedImageUri={selectedImageUri} 
        setLoading={setLoading} 
        setSelectedImageUri={setSelectedImageUri}
        setRecognizedItem={setRecognizedItem}
        setTipMessage={setTipMessage}
      />
      <BottomContent
        isLoading={isLoading}
        tipMessage={tipMessage}
        recognizedItems={recognizedItems} 
      />
    </View>
  );
}

