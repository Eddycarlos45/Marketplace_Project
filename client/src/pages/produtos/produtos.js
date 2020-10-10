import React, { Component } from 'react'
import axios from 'axios';

//MUI
import Container from '@material-ui/core/Container';

//components
import Table from '../../components/Table'
import AppBar from '../../components/AppBar'

export class produtos extends Component {
    constructor() {
        super();
        this.state = {
            produtos: [''],
            api: 'http://localhost:3030'
        }
    }

    componentDidMount() {
        axios.get(this.state.api + '/produtos')
            .then(res => {
                this.setState({
                    produtos: res.data
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <AppBar title={'Produtos'}></AppBar>
                <Container maxWidth="md">
                    <Table produtos={this.state.produtos}></Table>
                </Container>
            </div>
        )
    }
}

export default  produtos
