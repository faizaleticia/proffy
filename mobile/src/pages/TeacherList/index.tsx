import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import api from '../../services/api';

import styles from './styles';

function TeacherList () {
  const [ isFilterVisible, setIsFilterVisible ] = useState(false);

  const [ subject, setSubject ] = useState('');
  const [ weekDay, setWeekDay ] = useState('');
  const [ time, setTime ] = useState('');

  const [ teachers, setTeachers ] = useState([]);
  const[ favorites, setFavorites ] = useState<number[]>([]);

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favortiedTeachersIds = favoritedTeachers.map((teacher: Teacher) => teacher.id);
        setFavorites(favortiedTeachersIds);
      }
    });
  }

  function handleToggleFilterVisible () {
    setIsFilterVisible(!isFilterVisible);
  }

  async function handleFilterSubmit () {
    loadFavorites();

    const response = await api.get('classes', {
      params: {
        subject,
        week_day: weekDay,
        time,
      }
    });

    setIsFilterVisible(false);
    setTeachers(response.data);
  }

  return (
    <View style={ styles.container }>
      <PageHeader 
        title="Proffys disponíveis"
        headerRight={(
          <BorderlessButton onPress={ handleToggleFilterVisible } >
            <Feather name="filter" size={ 20 } color="#FFF" />
          </BorderlessButton>
        )}
      >
        {isFilterVisible && (
          <View style={ styles.searchForm }>
            <Text style={ styles.label }>Disciplina</Text>
            <TextInput 
              style={ styles.input } 
              value={ subject }
              onChangeText={ text => setSubject(text) }
              placeholder="Qual a disciplina?"
              placeholderTextColor="#C1BCCC"
            />

            <View style={ styles.inputGroup }>
              <View style={ styles.inputBlock }>
                <Text style={ styles.label }>Dia da semana</Text>
                <TextInput 
                  style={ styles.input } 
                  value={ weekDay }
                  onChangeText={ text => setWeekDay(text) }
                  placeholder="Qual o dia?"
                  placeholderTextColor="#C1BCCC"
                />
              </View>

              <View style={ styles.inputBlock }>
                <Text style={ styles.label }>Horário</Text>
                <TextInput 
                  style={ styles.input }
                  value={ time }
                  onChangeText={ text => setTime(text) } 
                  placeholder="Qual horário?"
                  placeholderTextColor="#C1BCCC"
                />
              </View>
            </View>

            <RectButton 
              style={ styles.submitButton } 
              onPress={ handleFilterSubmit }
            >
              <Text style={ styles.submitButtonText }>Filtrar</Text>
            </RectButton>

          </View>
        )}
      </PageHeader>

      <ScrollView
        style={ styles.teacherList }
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        { teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem 
              key={ teacher.id } 
              teacher={ teacher }
              favorited={ favorites.includes(teacher.id) }
            />
          )
        })}
      </ScrollView>
    </View>
  );
}

export default TeacherList;