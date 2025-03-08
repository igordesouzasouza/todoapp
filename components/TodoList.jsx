import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import Ionicons from "react-native-vector-icons/Ionicons";
import '../app/global.css'

const tarefasIniciais = [
  { id: 1, título: "Tomar banho", descrição: "Descrição da Tarefa 1", concluída: false },
  { id: 2, título: "Jogar lixo fora", descrição: "Descrição da Tarefa 2", concluída: false },
  { id: 3, título: "Testar carregador", descrição: "Descrição da Tarefa 3", concluída: false },
  { id: 4, título: "Faculdade", descrição: "Descrição da Tarefa 4", concluída: true },
];

const ListaDeTarefas = () => {
  const [tarefas, setTarefas] = useState(tarefasIniciais);

  const alternarConclusao = (id) => {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluída: !tarefa.concluída } : tarefa
      )
    );
  };

  return (
    <View style={tw`flex-1 bg-gray-100 p-4`}>
      <Text style={tw`text-2xl font-bold text-gray-800 mb-4 mt-14`}>Minhas Tarefas</Text>
      <View style={tw`space-y-3`}>
        {tarefas.map((tarefa) => (
          <TouchableOpacity
            key={tarefa.id}
            onPress={() => alternarConclusao(tarefa.id)}
            style={tw.style(
              `flex-row items-start p-4 rounded-lg border border-gray-200`,
              tarefa.concluída ? "bg-gray-50 opacity-70" : "bg-white"
            )}
          >
            <View style={tw`mr-3 mt-1`}>
              <Ionicons
                name={tarefa.concluída ? "checkmark-circle" : "ellipse-outline"}
                size={20}
                color={tarefa.concluída ? "#10b981" : "#9ca3af"}
              />
            </View>

            <View style={tw`flex-1`}>
              <Text
                style={tw.style(
                  `text-lg font-medium`,
                  tarefa.concluída ? "text-gray-500 line-through" : "text-gray-800"
                )}
              >
                {tarefa.título}
              </Text>
              <Text
                style={tw.style(
                  `text-sm`,
                  tarefa.concluída ? "text-gray-400 line-through" : "text-gray-600"
                )}
              >
                {tarefa.descrição}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ListaDeTarefas;