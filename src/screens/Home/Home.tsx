import { useCallback, useState } from "react";
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Participant } from "../../components";
import { styles } from "./Home.styles";

export function Home () {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState('');

  const handleParticipantAdd = useCallback(() => {
    if (participants.includes(participantName)) {
      return Alert.alert('Participante existente!', 'Você já adicionou esse participante!');
    };

    setParticipants(prevState => [...prevState, participantName]);
    setParticipantName('');
  }, [participantName]);

  const handleParticipantRemove = useCallback((name: string) => {
    Alert.alert('Remover participante', `Deseja remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do Evento</Text>
      <Text style={styles.eventDate}>Sexta, 4 de Novembro de 2022.</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6b6b6b"
          onChangeText={setParticipantName}
          value={participantName}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={item => item}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Participant name={item} onRemove={() => handleParticipantRemove(item)} />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.listEmpty}>Sem conteúdo!</Text>
        )}
      />

      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        {/* {Children.toArray(participants.map(participant => (
          <Participant name={participant} onRemove={() => handleParticipantRemove(participant)} />
        )))} */}
      {/* </ScrollView> */}
    </View>
  )
}
