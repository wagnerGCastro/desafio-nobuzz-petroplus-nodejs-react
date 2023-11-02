// ** React Imports
import { useState, useEffect } from 'react'

import { axiosInstance as axios } from 'src/configs/axios'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

type DefaultValues = {
  brand: string
  model: string
  color: string
  plate: string
  type: string
  companyId: string
}

const defaultValues: DefaultValues = {
  brand: '',
  model: '',
  color: '',
  plate: '',
  type: '',
  companyId: ''
}

const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} campo é obrigatório`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} deve ser pelo menos ${min} characteres`
  } else {
    return ''
  }
}

const schema = yup.object().shape({
  brand: yup.string().required('marca é um campo obrigatório'),
  model: yup
    .string()
    .min(3, obj => showErrors('modelo', obj.value.length, obj.min))
    .required('modelo é um campo obrigatório'),
  color: yup
    .string()
    .min(3, obj => showErrors('cor', obj.value.length, obj.min))
    .required('cor é um campo obrigatório'),
  plate: yup
    .string()
    .min(7, obj => showErrors('placa', obj.value.length, obj.min))
    .required('placa é um campo obrigatório'),
  type: yup
    .string()
    .min(4, obj => showErrors('tipo', obj.value.length, obj.min))
    .required(),
  companyId: yup
    .string()
    .min(1, obj => showErrors('empresa', obj.value.length, obj.min))
    .required('empresa é um campo obrigatório')
})

const FormValidationSchema = () => {
  // ** States
  const [companys, setCompanys] = useState([{ id: -1, name: '' }])

  // ** Hook
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    async function handleCompany() {
      const response = await axios.get(`/company`)
      const result = response.data

      const resultMap = result.map((item: { id: number; name: string }) => ({
        id: item.id,
        name: item.name
      }))

      setCompanys(resultMap)
    }

    handleCompany()
  }, [])

  const onSubmit = async (data: DefaultValues) => {
    try {
      await axios.post('/parking/register', data)
      toast.success('Cadastro realizado com sucesso')
      reset()
    } catch (error: any) {
      toast.error(`Houve, erro ao cadastrar! \n ${error?.message}`)
    }
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} id='form-casdastro-company'>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='brand'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Marca do veículo'
                      onChange={onChange}
                      placeholder='Marca do veículo'
                      error={Boolean(errors.brand)}
                      aria-describedby='validation-schema-brand'
                    />
                  )}
                />
                {errors.brand && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-brand'>
                    {errors.brand.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='model'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Modelo do veículo'
                      onChange={onChange}
                      placeholder='Modelo do veículo'
                      error={Boolean(errors.model)}
                      aria-describedby='validation-schema-model'
                    />
                  )}
                />
                {errors.model && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-model'>
                    {errors.model.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='color'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Cor do veículo'
                      onChange={onChange}
                      placeholder='Cor do veículo'
                      error={Boolean(errors.color)}
                      aria-describedby='validation-schema-color'
                    />
                  )}
                />
                {errors.color && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-color'>
                    {errors.color.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='plate'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Placa do veículo'
                      onChange={onChange}
                      placeholder='Placa do veículo'
                      error={Boolean(errors.plate)}
                      aria-describedby='validation-schema-plate'
                    />
                  )}
                />
                {errors.plate && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-plate'>
                    {errors.plate.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel
                  id='validation-basic-select'
                  error={Boolean(errors.companyId)}
                  htmlFor='validation-basic-select'
                >
                  Tipo de veículo
                </InputLabel>
                <Controller
                  name='type'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      label='Tipo veículo'
                      onChange={onChange}
                      id='companyId'
                      error={Boolean(errors.companyId)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-type'
                    >
                      {[
                        { id: 1, name: 'MOTO' },
                        { id: 2, name: 'CARRO' }
                      ].map(item => (
                        <MenuItem key={item.id} id={item.name} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.companyId && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-type'>
                    tipo é um campo obrigatório
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel
                  id='validation-basic-select'
                  error={Boolean(errors.companyId)}
                  htmlFor='validation-basic-select'
                >
                  Empresa
                </InputLabel>
                <Controller
                  name='companyId'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      label='Empresa'
                      onChange={onChange}
                      id='companyId'
                      error={Boolean(errors.companyId)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-companyId'
                    >
                      {companys.map(item => (
                        <MenuItem key={item.id} id={item.name} value={item.id} dense>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.companyId && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-companyId'>
                    empresa é um campo obrigatório
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button size='large' type='submit' variant='contained'>
                Cadastrar
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormValidationSchema
