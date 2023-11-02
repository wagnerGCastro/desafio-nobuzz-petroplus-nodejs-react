// ** React Imports
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
  name: string
  cnpj: string
  address: string
  telephone: string
  amountVacanciesMotorcycles: string
  amountVacanciesCars: string
}

const defaultValues: DefaultValues = {
  name: '',
  cnpj: '',
  address: '',
  telephone: '',
  amountVacanciesMotorcycles: '',
  amountVacanciesCars: ''
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

const digitsOnly: any = (value: string) => /^\d*[\.{1}\d*]\d*$/.test(value) || value.length === 0

const schema = yup.object().shape({
  name: yup.string().required('nome da empresa é obrigatório'),
  cnpj: yup
    .string()
    .test('cnpj', 'O campo deve ter apenas dígitos', digitsOnly)
    .min(14, obj => showErrors('cnpj', obj.value.length, obj.min))
    .max(14, obj => showErrors('cnpj', obj.value.length, obj.max))
    .required('cnpj é um campo obrigatório'),
  address: yup
    .string()
    .min(3, obj => showErrors('endereço', obj.value.length, obj.min))
    .required('endereço é um campo obrigatório'),
  telephone: yup
    .string()
    .test('telefone', 'O campo deve ter apenas dígitos', digitsOnly)
    .min(8, obj => showErrors('telefone', obj.value.length, obj.min))
    .max(12, obj => showErrors('cnpj', obj.value.length, obj.max))

    .required('telefone é um campo obrigatório'),
  amountVacanciesMotorcycles: yup
    .string()
    .min(1, obj => showErrors('qtd vagas moto', obj.value.length, obj.min))
    .required('este campo obrigatório'),
  amountVacanciesCars: yup
    .string()
    .min(1, obj => showErrors('qtd vagas carro', obj.value.length, obj.min))
    .required('este campo obrigatório')
})

const FormValidationSchema = () => {
  // ** States

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

  const onSubmit = async (data: DefaultValues) => {
    try {
      await axios.post('/company', data)
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
                  name='name'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Nome da empresa'
                      onChange={onChange}
                      placeholder='Nome da empresa'
                      error={Boolean(errors.name)}
                      aria-describedby='validation-schema-name'
                    />
                  )}
                />
                {errors.name && (
                  <FormHelperText sx={{ address: 'error.main' }} id='validation-schema-name'>
                    {errors.name.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='cnpj'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='CNPJ'
                      onChange={onChange}
                      placeholder='CNPJ'
                      error={Boolean(errors.cnpj)}
                      aria-describedby='validation-schema-cnpj'
                    />
                  )}
                />
                {errors.cnpj && (
                  <FormHelperText sx={{ address: 'error.main' }} id='validation-schema-cnpj'>
                    {errors.cnpj.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='address'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Endereço'
                      onChange={onChange}
                      placeholder='Endereço'
                      error={Boolean(errors.address)}
                      aria-describedby='validation-schema-address'
                    />
                  )}
                />
                {errors.address && (
                  <FormHelperText sx={{ address: 'error.main' }} id='validation-schema-address'>
                    {errors.address.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='telephone'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Telefone'
                      onChange={onChange}
                      placeholder='Telefone'
                      error={Boolean(errors.telephone)}
                      aria-describedby='validation-schema-telephone'
                    />
                  )}
                />
                {errors.telephone && (
                  <FormHelperText sx={{ address: 'error.main' }} id='validation-schema-telephone'>
                    {errors.telephone.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel
                  id='validation-basic-select'
                  error={Boolean(errors.amountVacanciesCars)}
                  htmlFor='validation-basic-select'
                >
                  Quantidade de vagas moto
                </InputLabel>
                <Controller
                  name='amountVacanciesMotorcycles'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      label='Quantidade de vagas moto'
                      onChange={onChange}
                      id='amountVacanciesCars'
                      error={Boolean(errors.amountVacanciesCars)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-amountVacanciesMotorcycles'
                    >
                      {[
                        { id: 1, name: '0' },
                        { id: 2, name: '20' },
                        { id: 3, name: '30' },
                        { id: 4, name: '40' }
                      ].map(item => (
                        <MenuItem key={item.id} id={item.name} value={Number(item.name)}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.amountVacanciesCars && (
                  <FormHelperText sx={{ address: 'error.main' }} id='validation-basic-amountVacanciesMotorcycles'>
                    este campo é obrigatório
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel
                  id='validation-basic-select'
                  error={Boolean(errors.amountVacanciesCars)}
                  htmlFor='validation-basic-select'
                >
                  Quantidade de vagas carro
                </InputLabel>
                <Controller
                  name='amountVacanciesCars'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      label='Quantidade de vagas carro'
                      onChange={onChange}
                      id='amountVacanciesCars'
                      error={Boolean(errors.amountVacanciesCars)}
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-amountVacanciesCars'
                    >
                      {[
                        { id: 1, name: '0' },
                        { id: 2, name: '20' },
                        { id: 3, name: '30' },
                        { id: 4, name: '40' }
                      ].map(item => (
                        <MenuItem key={item.id} id={item.name} value={item.id} dense>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.amountVacanciesCars && (
                  <FormHelperText sx={{ address: 'error.main' }} id='validation-basic-amountVacanciesCars'>
                    este campo obrigatório
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
