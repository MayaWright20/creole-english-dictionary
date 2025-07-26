import {
  BORDER_RADIUS,
  COLORS,
  FONT_SIZE,
  FONT_WEIGHT,
  MARGIN,
  PADDING,
} from '@/constants/styles';
import { usePersistStore } from '@/store/store';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Switch() {
  const setOrderByEnglish = usePersistStore(
    (state: any) => state.setOrderByEnglish
  );
  const orderByEnglish = usePersistStore((state: any) => state.orderByEnglish);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order by:</Text>
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => setOrderByEnglish(true)}
          style={styles.item}
        >
          <Text
            style={[
              styles.itemTitle,
              { color: orderByEnglish ? COLORS.BLUE : COLORS.GREY },
            ]}
          >
            English
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setOrderByEnglish(false)}
          style={styles.item}
        >
          <Text
            style={[
              styles.itemTitle,
              { color: orderByEnglish ? COLORS.GREY : COLORS.BLUE },
            ]}
          >
            Creole
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.LIGHT_GREY,
    width: '95%',
    margin: MARGIN.SMALL,
    paddingVertical: PADDING.XLARGE,
    borderRadius: BORDER_RADIUS.LARGE,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 12,
    paddingHorizontal: PADDING.XLARGE,
  },
  title: {
    fontSize: FONT_SIZE.XLARGE,
    fontWeight: FONT_WEIGHT.MEDIUM,
    color: COLORS.BLUE,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  item: {
    backgroundColor: COLORS.LIGHT_GREY,
    margin: MARGIN.SMALL,
    paddingVertical: PADDING.XLARGE,
    borderRadius: BORDER_RADIUS.LARGE,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 12,
    paddingHorizontal: PADDING.XLARGE,
  },
  itemTitle: {
    fontSize: FONT_SIZE.XLARGE,
    fontWeight: FONT_WEIGHT.MEDIUM,
  },
});
