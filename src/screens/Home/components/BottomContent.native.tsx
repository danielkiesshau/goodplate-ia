import { FlatList, ListRenderItem, View } from "react-native";

import { RecognizedItem } from "../../../modules/interfaces";
import { Item } from "../../../components/Item";
import { Tip } from "../../../components/Tip";
import { Loading } from "../../../components/Loading";
import { styles } from "./BottomContent.styles";

interface BottomContentProps {
  isLoading: boolean;
  recognizedItems: RecognizedItem[];
  tipMessage: string;
}

const BottomContent = ({
  recognizedItems,
  isLoading,
}: BottomContentProps) => { 
  const renderItem: ListRenderItem<RecognizedItem> = ({ item }) => {
    return (
      <Item 
        data={{ 
          name: item.name, 
          percentage: `${item.value}%` 
        }}
      />
    )
  }
  const keyExtractor = (item: RecognizedItem): string => item.name;

  return (
    <View style={styles.bottom}>
        <Tip message="Tip of the day" />
          <View style={styles.items}>
            {isLoading ? 
              <Loading /> : (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={recognizedItems}
                extraData={isLoading}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                contentContainerStyle={styles.listContent}
              />
            )}
        </View>
      </View>
  )
};

export default BottomContent