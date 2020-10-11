import React from 'react';
import axios from 'axios';

//MUI
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    buttonYes: {
        color: 'white',
        backgroundColor: 'green',
        '&:hover': {
            color: 'black',
            backgroundColor: 'green'
        }
    },
    buttonNo: {
        color: 'white',
        backgroundColor: 'red',
        '&:hover': {
            color: 'black',
            backgroundColor: 'red',
        }
    },
    DialogContent: {
        display: 'grid',
        width: '500px'
    }
});

function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}


export default function BasicTable(props) {
    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState();
    const [nome, setNome] = React.useState();
    const [openEdit, setOpenEdit] = React.useState();
    const [values, setValues] = React.useState({})
    const classes = useStyles();
    const produtos = props.produtos

    const handleClickOpen = (id, nome) => {
        setOpen(true);
        setNome(nome)
        setId(id)
    };

    const handleClickOpenEdit = (produto) => {
        setOpenEdit(true);

        setValues({
            id: produto.id,
            nome: produto.nome,
            descricao: produto.descricao,
            tipo: produto.tipo,
            valor: produto.valor,
            quantidade: produto.quantidade,
            observacoes: produto.observacoes
        })

    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
        console.log(values.nome)
    }

    const handleClose = () => {
        setOpenEdit(false)
        setOpen(false);
    };

    const edita = () => {
        axios.patch('http://localhost:3030/produtos/' + values.id, values)
            .then(res => {
                alert('Alterado com sucesso')
                window.location.reload()
            })
            .catch(err => console.log(err))
            setOpenEdit(false)
    }

    const deleta = () => {
        axios.delete('http://localhost:3030/produtos/' + id)
            .then(res => {
                alert('Deletado com sucesso')
                window.location.reload()
            })
            .catch(err => console.log(err))
            setOpen(false);
    }

    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Produtos</TableCell>
                            <TableCell align="right">Descrição</TableCell>
                            <TableCell align="right">Tipo</TableCell>
                            <TableCell align="right">Valor</TableCell>
                            <TableCell align="right">Quantidade</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {produtos.map((row) => (
                            <TableRow key={row.nome}>
                                <TableCell component="th" scope="row">
                                    {row.nome}
                                </TableCell>
                                <TableCell align="right">{row.descricao}</TableCell>
                                <TableCell align="right">{row.tipo}</TableCell>
                                <TableCell align="right">{row.valor}</TableCell>
                                <TableCell align="right">{row.quantidade}</TableCell>
                                <IconButton aria-label="delete" onClick={(e) => handleClickOpen(row.id, row.nome)}>
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton aria-label="delete" onClick={(e) => handleClickOpenEdit(row)}>
                                    <EditIcon />
                                </IconButton>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title">
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Deletar
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {'Tem certeza que quer deletar: ' + nome}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className={classes.buttonNo} autoFocus onClick={handleClose} color="primary">Não</Button>
                    <Button className={classes.buttonYes} onClick={deleta} color="primary">Sim</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openEdit}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title">
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Editar
                </DialogTitle>
                <DialogContent >
                    <DialogContentText className={classes.DialogContent}>
                        <TextField
                            label='Nome'
                            value={values.nome}
                            name='nome'
                            onChange={handleChange('nome')} />
                        <TextField
                            label='Descrição'
                            value={values.descricao}
                            name='descricao'
                            onChange={handleChange('descricao')} />
                        <TextField
                            label='Tipo'
                            value={values.tipo}
                            name='tipo'
                            onChange={handleChange('tipo')} />
                        <TextField
                            label='Valor'
                            value={values.valor}
                            name='valor'
                            onChange={handleChange('valor')} />
                        <TextField
                            label='Quantidade'
                            value={values.quantidade}
                            name='quantidade'
                            onChange={handleChange('quantidade')} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className={classes.buttonNo} autoFocus onClick={handleClose} color="primary">Não</Button>
                    <Button className={classes.buttonYes} onClick={edita} color="primary">Sim</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}