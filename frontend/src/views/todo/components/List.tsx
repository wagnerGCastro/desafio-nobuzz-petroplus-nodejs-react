// ** MUI Imports
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'
import makeStyles from '@mui/styles/makeStyles'

type TodosType = {
  id: number
  name: string
  description: string
  isDone: number
}

type ListTodoType = {
  handleEdit: (val: TodosType) => void
  fetchDelete: (val: number) => void
  todos: Array<TodosType>
}

const useStyles = makeStyles(() => ({
  root: {
      width: '100%',
      backgroundColor: '#f5f5f5',
      padding: 0,

  },
  li: {
    borderBottom: '1px dashed black !important',
  }
}));


const ListTodo = (props: ListTodoType) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} mt={5}>
      <List className={classes.root}>
          {props.todos.map((todo) => {
          const labelId = `list-todo-${todo}`;

          return (
            <ListItem
              key={todo.id}
              role={undefined}
              dense
              button
              className={classes.li}
            >
              <ListItemIcon>
                <Checkbox
                  color="primary"
                  checked={Number(todo.isDone) === 1}
                  edge="start"
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
          
              <ListItemText
                id={labelId}
                primary={`(${todo?.id}) - ${todo?.name}`}
                secondary={todo?.description}
                style={{textDecoration: todo?.isDone ? "line-through" : ""}}
              />
              <ListItemIcon>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => props.handleEdit(todo)}
                >
                  <Icon icon='ic:sharp-edit' /> 
                </IconButton>
              </ListItemIcon>
                      
              <ListItemSecondaryAction>
                  <IconButton size='small' onClick={() => props.fetchDelete(todo?.id)} edge="end" aria-label="delete">
                    <Icon icon='mdi:delete' />
                  </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
          })}
      </List>
    </Grid>
  )
}

export default ListTodo
