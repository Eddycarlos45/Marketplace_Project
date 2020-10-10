import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


export default function BasicTable(props) {
    const classes = useStyles();
    const produtos = props.produtos
    console.log(produtos)
    

    return (
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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}