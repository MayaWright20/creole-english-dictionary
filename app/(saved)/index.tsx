import DictionaryCard from '@/components/cards/dictionary-card';
import { usePersistStore } from '@/store/store';
import { WORD } from '@/types';
import { StyleSheet, View } from 'react-native';

export default function Saved() {
  const favourites = usePersistStore((state: any) => state.favourites);
  const toggleFavourite = usePersistStore(
    (state: any) => state.toggleFavourite
  );

  return (
    <View style={styles.container}>
      {favourites.map((item: WORD, index: number) => (
        <DictionaryCard
          key={index}
          title={item.english}
          description={item.creole}
          isFavourited={true}
          onPressIsFavourite={() => toggleFavourite(item)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
