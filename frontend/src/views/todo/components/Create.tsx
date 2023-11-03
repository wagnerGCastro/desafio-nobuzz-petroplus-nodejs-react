// ** MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import CircularProgress from '@mui/material/CircularProgress'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
import {  Controller } from 'react-hook-form'

type CreateTodoType = {
  isEditing: boolean
  control: any
  errors: any
  loading: boolean
  handleCancel: () => void
  labels: {
    create: {
      title: string
      btnSubmit: string
      btnReset: string
    }
    update: {
      title: string
      btnSubmit: string
      btnReset: string
    }
  }
}

const CreateTodo = (props: CreateTodoType) => {
  return (
    <>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <Controller
            name='name'
            control={props.control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                value={value}
                label='Título'
                onChange={onChange}
                placeholder='Título da Tarefa'
                error={Boolean(props.errors.name)}
                aria-describedby='validation-schema-name'
                size="small"
              />
            )}
          />
          {props.errors.name && (
            <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-name'>
              {props.errors.name.message}
            </FormHelperText>
          )}
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth>
          <Controller
            name='description'
            control={props.control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                value={value}
                label='Descrição'
                onChange={onChange}
                placeholder='Descrição da tarefa'
                error={Boolean(props.errors.description)}
                aria-describedby='validation-schema-description'
                size="small"
              />
            )}
          />
          {props.errors.description && (
            <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-description'>
              {props.errors.description.message}
            </FormHelperText>
          )}
        </FormControl>
      </Grid>

      {props.isEditing && <Grid item xs={12}>
          <FormControl>
            <Controller
              name='isDone'
              control={props.control}
              rules={{ required: false }}
              render={({ field: { value, onChange } }) => (
                <FormControlLabel
                  label='Concluída'
                  sx={props.errors.isDone ? { color: 'error.main' } : null}
                  control={
                    <Checkbox
                      onChange={onChange}
                      value={value}
                      checked={Number(value) === 1}
                      name='validation-basic-isDone'
                      sx={props.errors.isDone ? { color: 'error.main' } : null}
                    />
                  }
                />
              )}
            />
          </FormControl>
        </Grid>
      }

      <Grid item xs={12} mt={5}   style={{display: 'flex'}} justifyContent="center">
        <Button size='small' type='submit' variant='contained' sx={{ mr: 10}}>
          {props.loading ? (
              <CircularProgress
                sx={{
                  color: 'common.white',
                  width: '20px !important',
                  height: '20px !important',
                  mr: theme => theme.spacing(2)
                }}
              />
            ) : null}
          {props.isEditing ? props.labels.update.btnSubmit : props.labels.create.btnSubmit}
        </Button>

        <Button type='reset' size='small' onClick={props.handleCancel} color='secondary' variant='outlined'>
          {props.isEditing ? props.labels.update.btnReset : props.labels.create.btnReset}
        </Button>
      </Grid>

    </>
  )
}

export default CreateTodo
