import React, { Component } from 'react'
import axios from 'axios';

//MUI
import TextField from '@material-ui/core/TextField';
import { Container } from '@material-ui/core';
import { Grid } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

import AppBar from '../../components/AppBar'

const styles = {
    text: {
        width: '80%'
    },
    btn: {
        marginLeft: '26%',
        marginTop: '10%'
    }
}

export class form extends Component {

    constructor() {
        super();
        this.state = {
            nome: '',
            descricao: '',
            tipo: '',
            valor: '',
            quantidade: '',
            errors: {}
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const produto = {
            nome: this.state.nome,
            descricao: this.state.descricao,
            tipo: this.state.tipo,
            valor: this.state.valor,
            quantidade: this.state.quantidade,
            observacoes: '',
        }

        axios.post('http://localhost:3030/produtos', produto)
            .then(res => {
                alert('Produto cadastrado com sucesso')
                window.location.replace("http://localhost:3000/produtos/")
            })
            .catch(err => {
                this.setState({
                    errors: err.response.data,
                })
            })
    }

    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;

        return (
            <div>
                <AppBar />
                <Container>
                    <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                        <Grid container>
                            <Grid item sm>
                                <TextField
                                    required
                                    label='Nome'
                                    value={this.state.nome}
                                    name='nome'
                                    className={classes.text}
                                    onChange={this.handleChange}
                                    helperText={errors.nome}
                                    error={errors.nome ? true : false}>
                                </TextField>
                                <TextField
                                    required
                                    label='Descricao'
                                    value={this.state.descricao}
                                    name='descricao'
                                    className={classes.text}
                                    onChange={this.handleChange}
                                    helperText={errors.descricao}
                                    error={errors.descricao ? true : false}>
                                </TextField>
                            </Grid>
                            <Grid item sm>
                                <TextField
                                    required
                                    label='Tipo'
                                    value={this.state.tipo}
                                    name='tipo'
                                    className={classes.text}
                                    onChange={this.handleChange}
                                    helperText={errors.tipo}
                                    error={errors.tipo ? true : false}>
                                </TextField>
                                <TextField
                                    required
                                    label='Quantidade'
                                    value={this.state.quantidade}
                                    name='quantidade'
                                    className={classes.text}
                                    onChange={this.handleChange}
                                    helperText={errors.quantidade}
                                    error={errors.quantidade ? true : false}>
                                </TextField>
                                <Button
                                    className={classes.btn}
                                    type="submit"
                                    variant="contained"
                                    color="primary">
                                    Adicionar
                        </Button>
                            </Grid>
                            <Grid item sm>
                                <TextField
                                    required
                                    label='Valor'
                                    value={this.state.valor}
                                    name='valor'
                                    className={classes.text}
                                    onChange={this.handleChange}
                                    helperText={errors.valor}
                                    error={errors.valor ? true : false}>
                                </TextField>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </div>
        )
    }
}

export default withStyles(styles)(form)
