import AddWord from '@/components/inputs/add-word';
import { View } from 'react-native';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}
    >
      <AddWord />
    </View>
  );
}
