import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import api from '../../services/api';

import './styles.css';

function TeacherList() {
  const [ subject, setSubject ] = useState('');
  const [ weekDay, setWeekDay ] = useState('');
  const [ time, setTime ] = useState('');

  const [ teachers, setTeachers ] = useState([]);

  async function handleSearchTeachers(event: FormEvent) {
    event.preventDefault();

    const response = await api.get('classes', {
      params: {
        subject,
        week_day: weekDay,
        time,
      }
    });

    setTeachers(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={ handleSearchTeachers }>
        <Select 
            name="subject" 
            label="Disciplina"
            value={ subject }
            onChange={ (event) => setSubject(event.target.value) }
            options={[
              { 
                value: 'Programação para dispositivos móveis',
                label: 'Programação para dispositivos móveis',   
              },
              { 
                value: 'Arquitetura de Software',
                label: 'Arquitetura de Software',   
              },
              { 
                value: 'Qualidade de Software',
                label: 'Qualidade de Software',   
              },
            ]} 
          />
          <Select 
            name="week_day" 
            label="Dia da semana"
            value={ weekDay }
            onChange={ (event) => setWeekDay(event.target.value) }
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' },
            ]} 
          />

          <Input 
            name="time" 
            label="Hora" 
            type="time"
            value={ time }
            onChange={ (event) => setTime(event.target.value) } 
          />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        { teachers.map((teacher: Teacher)=> {
          return <TeacherItem key={ teacher.id } teacher={ teacher }/>
        }) }
      </main>
    </div>
  );
}

export default TeacherList;