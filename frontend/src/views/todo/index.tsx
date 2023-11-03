
// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { axiosInstance as api } from 'src/configs/axios'

import ListTodo  from './components/List'
import CreateTodo  from './components/Create'

type DefaultValues = {
  id?: number
  name: string
  description: string
  isDone?: number
}

const defaultValues: DefaultValues = {
  id: 0,
  name: '',
  description: '',
  isDone: 0
}

const labels ={
  create: {
    title: 'Cadastrar Tarefa',
    btnSubmit: 'Cadastrar',
    btnReset: 'Cancelar'
  },
  update: {
    title: 'Editar Tarefa',
    btnSubmit: 'Atualizar',
    btnReset: 'Cancelar'
  }
}

const schema = yup.object().shape({
  name: yup.string().required('Este campo é obrigatório'),
  description: yup.string().required('Este campo é obrigatório')
})

const Todo = () => {

  /** 
   * states
   * ---------------------------------------------
   */
 
  const [loading, setLoading] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
 
  const [ todos, setTodos ] = useState([
    {
      id: 1,
      name: "Task 1",
      description: 'Lorem Ipsum is simply dummy text',
      isDone: 0,
    },
    {
      id: 2,
      name: "Task 2",
      description: 'Lorem Ipsum is simply dummy text',
      isDone: 0,

    },
    {
      id: 3,
      name: "Task 3",
      description: 'Lorem Ipsum is simply dummy text',
      isDone: 0,
    }
  ]);

  /** 
   * hooks
   * ---------------------------------------------
   */

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  /** 
   * useCallback
   * ---------------------------------------------
   */

  const fetchData = useCallback(
    async () => {
      try {
        const {data} = await api.get('/v1/todos')
        setTodos(data)
      } catch (error: any) {
        toast.error(`Houve erro ao buscar lista de tarefas! \n ${error?.message}`)
      }
    },[]
  )

  const fetchCreate = useCallback(
    async (data: DefaultValues) => {
      try {
        await api.post('/v1/todos', data)
        toast.success('Cadastro realizado com sucesso!')
        fetchData()
      } catch (error: any) {
        toast.error(`Houve erro ao cadastrar! \n ${error?.message}`)
      }
    },[fetchData]
  )

  const fetchUpdate = useCallback(
    async (data: DefaultValues, id: number) => {
      try {
        await api.patch(`/v1/todos/${id}`, data)
        toast.success('Cadastro atualizado com sucesso!')
        fetchData()
      } catch (error: any) {
        toast.error(`Houve erro ao atualizar! \n ${error?.message}`)
      }
    },[fetchData]
  )

  const fetchDelete = useCallback(
    async (id: number) => {
      try {
        await api.delete(`/v1/todos/${id}`)
        toast.success('Tarefa foi deletada com sucesso!')
        fetchData()
        setIsEditing(false)
        reset()
      } catch (error: any) {
        toast.error(`Houve erro ao excluir a tarefa! \n ${error?.message}`)
      }
    },[fetchData, reset]
  )

  /** 
   * functions
   * ---------------------------------------------
   */

  const onSubmit = async (dataForm: DefaultValues) => {
    const  { id, name, description, isDone  } = dataForm
    setLoading(true)

    if(isEditing && id) {
      const isDoneNumber = isDone ? 1 : 0;
      await fetchUpdate({name, description, isDone: isDoneNumber}, id)
      setIsEditing(false)
    } else {
      await fetchCreate({name, description})
    }

    reset()
    setLoading(false)
  }

  const handleEdit = (data: DefaultValues) => {
    reset()
    setIsEditing(true)
    setValue('id', data.id)
    setValue('name', data.name)
    setValue('description', data.description)
    setValue('isDone', data.isDone)
  }

  const handleCancel = () => {
    setIsEditing(false)
    reset()
  }

  /** 
   * useEffects
   * ---------------------------------------------
   */
  
  useEffect(() => {
    fetchData()
  }, [fetchData])


  return (
    <Card>
      <CardHeader title={isEditing ? labels.update.title : labels.create.title}/>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} id='form-casdastro'>
          <Grid container spacing={5}>
            <CreateTodo 
              isEditing={isEditing}
              control={control}
              errors={errors}
              handleCancel={handleCancel}
              labels={labels}
              loading={loading}
            />

            <ListTodo 
              handleEdit={handleEdit}
              fetchDelete={fetchDelete}
              todos={todos}
            />
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default Todo
