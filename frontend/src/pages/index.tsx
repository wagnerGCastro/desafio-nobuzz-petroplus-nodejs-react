// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import Todo from 'src/views/todo'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const Home = () => {
  return (
    <DatePickerWrapper>
      <Grid container spacing={6} className='match-height'>
        <PageHeader
          title={
            <Typography variant='h5'>
              TodoList
            </Typography>
          }
          subtitle={<Typography variant='body2'>Lista de tarefas</Typography>}
        />
        <Grid item xs={12}>
          <Todo />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default Home
