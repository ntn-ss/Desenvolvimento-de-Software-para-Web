import { Paper, Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Typography, Box } from '@mui/material'

import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';

import axios from "axios"

const ListarProfessor = () => {

    // function deleteProfessorById(id){
    //     if(window.confirm("Deseja excluir?")){
    //         alert(`Professor ${id} excluído.`)
    //     }
    // }

    /* const professores = [
        {id: 0, nome: "Zictor Zarias", curso: "SI", titulacao: "DOUT"},
        {id: 1, nome: "Voão Jilnei", curso: "DD", titulacao: "DOUT"},
        {id: 2, nome: "Pânia Tinheiro", curso: "ES", titulacao: "DOUT"},
        {id: 3, nome: "Loão Javor", curso: "DD", titulacao: "DOUT"},
        {id: 4, nome: "Savid Dena", curso: "SI", titulacao: "DOUT"},
    ] */

    const [professores, setProfessores] = useState([])

    const navigate = useNavigate()

    useEffect(
        ()=>{
            axios.get('http://localhost:3001/professores/listar')
            .then(
                (response)=>{
                    setProfessores(response.data)
                })
            .catch(error=>console.log(error))
        }, []
    )

    function apagarProfessor(id) {
        if (window.confirm(`Deseja excluir o professor de ID ${id}?`)) {
            axios.delete(`http://localhost:3001/professores/apagar/${id}`)
            .then(
                (response)=>{
                    console.log(response);
                    const resultado = professores.filter(professor=>professor._id!=id)
                    setProfessores(resultado)
                }
            )
            .catch(error=>console.log(error))
        }
    }

    return (
        <>
            <Typography variant="h5" fontWeight="bold">
                Listar Professores
            </Typography>
            <TableContainer component={Paper} sx={{my: 4}}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell>NOME</StyledTableCell>
                            <StyledTableCell>CURSO</StyledTableCell>
                            <StyledTableCell>TITULAÇÃO</StyledTableCell>
                            <StyledTableCell>AÇÕES</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>                 
                    <TableBody>
                        {
                            professores.map(
                                (professor)=>{
                                    return (
                                        <StyledTableRow key={professor._id}>
                                            <StyledTableCell>{professor._id}</StyledTableCell>
                                            <StyledTableCell>{professor.nome}</StyledTableCell>
                                            <StyledTableCell>{professor.curso}</StyledTableCell>
                                            <StyledTableCell>{professor.titulacao}</StyledTableCell>
                                            <StyledTableCell>
                                                <Box>
                                                    <IconButton aria-label="edit" color="primary" component={Link} to={`/editarProfessor/${professor._id}`}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton aria-label="delete" color="error" onClick={()=>apagarProfessor(professor._id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Box>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    )
                                }
                            )
                        }
                    </TableBody>    
                </Table>
            </TableContainer>
        </>
    )
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

export default ListarProfessor