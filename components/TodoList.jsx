import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput, Pressable } from "react-native";
import tw from "twrnc";
import Ionicons from "react-native-vector-icons/Ionicons";

// Estrutura inicial de dados
const tarefasIniciais = [
  { id: 1, título: "Tarefa 1", descrição: "Descrição da Tarefa 1", concluída: false },
  { id: 2, título: "Tarefa 2", descrição: "Descrição da Tarefa 2", concluída: true },
  { id: 3, título: "Tarefa 3", descrição: "Descrição da Tarefa 3", concluída: false },
  { id: 4, título: "Tarefa 4", descrição: "Descrição da Tarefa 4", concluída: false },
];

function Adionado(){
    if(adicionarTarefa === true){
        
    }
}

const ListaDeTarefas = () => {
  const [tarefas, setTarefas] = useState(tarefasIniciais);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [novoTítulo, setNovoTítulo] = useState("");
  const [novaDescrição, setNovaDescrição] = useState("");

  const alternarConclusao = (id) => {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluída: !tarefa.concluída } : tarefa
      )
    );
  };

  const adicionarTarefa = () => {
    if (novoTítulo.trim() === "" || novaDescrição.trim() === "") {
      alert("Preencha o título e a descrição da tarefa.");
      return;
    }
    
    const novaTarefa = {
      id: tarefas.length + 1,
      título: novoTítulo,
      descrição: novaDescrição,
      concluída: false,
    };

    setTarefas([ novaTarefa ,...tarefas]);
    setNovoTítulo("");
    setNovaDescrição("");
    setModalVisivel(false);
  };

  return (
    <View style={tw`flex-1 bg-gray-100 p-4`}>
      <Text style={tw`text-2xl font-bold text-gray-800 mb-4 mt-16`}>Minhas Tarefas</Text>
      <View style={tw`space-y-3`}>
        {tarefas.map((tarefa) => (
          <TouchableOpacity
            key={tarefa.id}
            onPress={() => alternarConclusao(tarefa.id)}
            style={tw.style(
              `flex-row items-start rounded-lg border border-gray-200`,
              tarefa.concluída
                ? "bg-gray-50 opacity-70 p-3" 
                : "bg-white p-4" 
            )}
          >
            <View style={tw`mr-3 mt-1`}>
              <Ionicons
                name={tarefa.concluída ? "checkmark-circle" : "ellipse-outline"}
                size={tarefa.concluída ? 16 : 20} 
                color={tarefa.concluída ? "#10b981" : "#9ca3af"}
              />
            </View>
            <View style={tw`flex-1`}>
              <Text
                style={tw.style(
                  `font-medium`,
                  tarefa.concluída
                    ? "text-sm text-gray-500 line-through" 
                    : "text-lg text-gray-800" 
                )}
              >
                {tarefa.título}
              </Text>
              <Text
                style={tw.style(
                  ``,
                  tarefa.concluída
                    ? "text-xs text-gray-400 line-through" 
                    : "text-sm text-gray-600" 
                )}
              >
                {tarefa.descrição}
                
              </Text>
              
            </View>{
              tarefa.concluída === false && (<Ionicons onPress={() => setTarefas(tarefas.filter((t) => t.id !== tarefa.id))} name='trash' size={20} color="#ef4444" style={tw`absolute right-6 justify-center items-center top-8`} />)
            }
            
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={() => setModalVisivel(true)}
        style={tw`absolute bottom-10 right-6`}
      >
        <Ionicons name="add-circle" size={60} color="#black" /> 
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          <View style={tw`bg-white p-6 rounded-lg w-5/6 max-w-md shadow-lg`}>
            <Text style={tw`text-xl font-bold text-gray-800 mb-4`}>Adicionar Nova Tarefa</Text>

            <TextInput
              style={tw`border border-gray-300 rounded-lg p-3 mb-4 text-gray-800`}
              placeholder="Título da tarefa"
              placeholderTextColor="#9ca3af"
              value={novoTítulo}
              onChangeText={setNovoTítulo}
            />

            <TextInput
              style={tw`border border-gray-300 rounded-lg p-3 mb-4 text-gray-800`}
              placeholder="Descrição da tarefa"
              placeholderTextColor="#9ca3af"
              value={novaDescrição}
              onChangeText={setNovaDescrição}
              multiline
            />

            <View style={tw`flex-row justify-end space-x-3 gap-3`}>
              <Pressable
                onPress={() => {
                  setNovoTítulo("");
                  setNovaDescrição("");
                  setModalVisivel(false);
                }}
                style={tw`px-4 py-2 rounded-lg border border-gray-300`}
              >
                <Text style={tw`text-gray-600 font-medium`}>Cancelar</Text>
              </Pressable>
              <Pressable
                onPress={adicionarTarefa}
                style={tw`px-4 py-2 rounded-lg bg-black`}
              >
                <Text style={tw`text-white font-medium`}>Adicionar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ListaDeTarefas;