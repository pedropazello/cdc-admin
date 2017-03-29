import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado.js';

class App extends Component {
  constructor() {
    super();
    this.state = { lista: [], nome: '', email: '', password: '' };
    this.enviaForm = this.enviaForm.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
  }

  componentDidMount() {
    $.ajax({
        url:"http://localhost:3001/api/autores",
        dataType: 'json',
        success:function(resposta){
          this.setState({ lista:resposta });
        }.bind(this)
      }
    );
  }

  enviaForm(evento) {
    evento.preventDefault();
    console.log("dados sendo enviados");
    $.ajax({
        url:"http://localhost:3001/api/autores",
        contentType: 'application/json',
        dataType:'json',
        type:'post',
        data: JSON.stringify({
          autor: {
            nome: this.state.nome,
            email: this.state.email,
            password: this.state.password
          }
        }),
        success: function(resposta) {
            console.log("enviado com sucesso");
            let listaAtual = this.state.lista;
            listaAtual.push(resposta);
            this.setState({ lista: listaAtual });
        }.bind(this),
        error: function(resposta) {
            console.log("erro");
        }
      });
  }

  setNome(evento){
    this.setState({nome: evento.target.value});
  }

  setEmail(evento){
    this.setState({email: evento.target.value});
  }

  setPassword(evento){
    this.setState({password: evento.target.value});
  }

  render() {
    return (
<div id="layout">

    <a href="#menu" id="menuLink" className="menu-link">
        <span></span>
    </a>

    <div id="menu">
        <div className="pure-menu">
            <a className="pure-menu-heading" href="#">Company</a>

            <ul className="pure-menu-list">
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livro</a></li>
          </ul>
        </div>
    </div>

        <div id="main">
            <div className="header">
              <h1>Cadastro de Autores</h1>
            </div>
            <div className="content" id="content">
              <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                  <InputCustomizado id="nome" type="text" name="nome"
                    value={this.state.nome} onChange={this.setNome} labelFor="nome" label="Nome"  />
                  <InputCustomizado id="email" type="email" name="email"
                    value={this.state.email} onChange={this.setEmail} labelFor="email" label="Email"  />
                  <InputCustomizado id="password" type="password" name="password"
                      value={this.state.password} onChange={this.setPassword} labelFor="password" label="Senha" />
                  <div className="pure-control-group">
                    <label></label>
                    <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                  </div>
                </form>

              </div>
              <div>
                <table className="pure-table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.lista.map(item =>
                        <tr key={item.id}>
                          <td>{item.nome}</td>
                          <td>{item.email}</td>
                        </tr>
                      )
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
