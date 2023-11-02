// ** React Imports
import { useEffect, useState, useCallback, ChangeEvent } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

import { DataGrid, GridColDef, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'

// ** ThirdParty Components
import { axiosInstance as axios } from 'src/configs/axios'

// ** Custom Components

import ServerSideToolbar from 'src/views/table/paking/create/ServerSideToolbar'

// ** Types Imports
import { DataGridRowType } from 'src/@fake-db/types'

// ** Utils Import

type SortType = 'asc' | 'desc' | undefined | null

// ** renders client column

const columns: GridColDef[] = [
  {
    flex: 0.25,
    minWidth: 40,
    field: 'id',
    headerName: 'Id',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.id}
      </Typography>
    )
  },
  {
    flex: 0.25,
    minWidth: 240,
    field: 'company',
    headerName: 'Empresa',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.company}
      </Typography>
    )
  },
  {
    flex: 0.25,
    minWidth: 140,
    field: 'brand',
    headerName: 'Marca',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.brand}
      </Typography>
    )
  },
  {
    flex: 0.175,
    minWidth: 140,
    headerName: 'Modelo',
    field: 'model',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.model}
      </Typography>
    )
  },
  {
    flex: 0.175,
    minWidth: 110,
    field: 'color',
    headerName: 'Cor',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.color}
      </Typography>
    )
  },
  {
    flex: 0.125,
    field: 'plate',
    minWidth: 140,
    headerName: 'Placa',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.plate}
      </Typography>
    )
  },
  {
    flex: 0.175,
    minWidth: 140,
    field: 'type',
    headerName: 'Tipo',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.type}
      </Typography>
    )
  },
  {
    flex: 0.175,
    minWidth: 200,
    type: 'date',
    field: 'entry',
    headerName: 'Entrada',
    valueGetter: params => new Date(params.value),
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.entry}
      </Typography>
    )
  },
  {
    flex: 0.175,
    minWidth: 200,
    type: 'date',
    field: 'exit',
    headerName: 'Saída',
    valueGetter: params => new Date(params.value),
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.exit}
      </Typography>
    )
  },
  {
    flex: 0.175,
    minWidth: 140,
    field: 'vacancyOccupied',
    headerName: 'Vaga Ocupada',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.vacancyOccupied == 1 ? 'Sim' : 'Não'}
      </Typography>
    )
  },
  {
    flex: 0.175,
    minWidth: 180,
    field: 'amountVacanciesMotorcycles',
    headerName: 'Total Vaga Moto',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.amountVacanciesMotorcycles}
      </Typography>
    )
  },
  {
    flex: 0.175,
    minWidth: 180,
    field: 'amountVacanciesCars',
    headerName: 'Total Vaga Carro',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.amountVacanciesCars}
      </Typography>
    )
  },
  {
    flex: 0.175,
    minWidth: 180,
    field: 'remainingVacanciesMotorcycles',
    headerName: 'Restante Vaga Moto',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.remainingVacanciesMotorcycles}
      </Typography>
    )
  },
  {
    flex: 0.175,
    minWidth: 210,
    field: 'v',
    headerName: 'Restante Vaga Carro',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.remainingVacanciesCars}
      </Typography>
    )
  }
]

const TableServerSide = () => {
  // ** States
  const [total, setTotal] = useState<number>(0)
  const [sort, setSort] = useState<SortType>('asc')
  const [rows, setRows] = useState<DataGridRowType[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [sortColumn, setSortColumn] = useState<string>('full_name')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  function loadServerRows(currentPage: number, data: DataGridRowType[]) {
    return data.slice(currentPage * paginationModel.pageSize, (currentPage + 1) * paginationModel.pageSize)
  }

  const fetchTableData = useCallback(
    async (sort: SortType, q: string, column: string) => {
      await axios
        .get('/parking/table/data', {
          params: {
            q,
            sort,
            column
          }
        })
        .then(res => {
          setTotal(res.data.total)
          setRows(loadServerRows(paginationModel.page, res.data.data))
        })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paginationModel]
  )

  useEffect(() => {
    fetchTableData(sort, searchValue, sortColumn)
  }, [fetchTableData, searchValue, sort, sortColumn])

  const handleSortModel = (newModel: GridSortModel) => {
    if (newModel.length) {
      setSort(newModel[0].sort)
      setSortColumn(newModel[0].field)
      fetchTableData(newModel[0].sort, searchValue, newModel[0].field)
    } else {
      setSort('asc')
      setSortColumn('full_name')
    }
  }

  const handleSearch = (value: string) => {
    setSearchValue(value)
    fetchTableData(sort, value, sortColumn)
  }

  return (
    <Card>
      <DataGrid
        autoHeight
        pagination
        rows={rows}
        rowCount={total}
        columns={columns}
        checkboxSelection
        sortingMode='server'
        paginationMode='server'
        pageSizeOptions={[7, 10, 25, 50]}
        paginationModel={paginationModel}
        onSortModelChange={handleSortModel}
        slots={{ toolbar: ServerSideToolbar }}
        onPaginationModelChange={setPaginationModel}
        slotProps={{
          baseButton: {
            variant: 'outlined'
          },
          toolbar: {
            value: searchValue,
            clearSearch: () => handleSearch(''),
            onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
          }
        }}
      />
    </Card>
  )
}

export default TableServerSide
