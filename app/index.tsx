import AddWord from '@/components/inputs/add-word/add-word';
import Switch from '@/components/inputs/switch/switch';
import { ScrollView, StyleSheet } from 'react-native';

export default function Index() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AddWord />
      <Switch />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '50%',
  },
});
