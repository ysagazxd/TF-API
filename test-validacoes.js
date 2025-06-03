const axios = require('axios');

const API_URL = 'http://localhost:3000/api';

// Testes de validação
async function testarValidacoes() {
  try {
    console.log('1. Testando criação sem nome (deve falhar)...');
    try {
      await axios.post(`${API_URL}/clientes`, {
        cpf: "111.222.333-44",
        telefone: "(11) 99999-9999"
      });
      console.error('ERRO: Criação sem nome deveria falhar!');
    } catch (error) {
      console.log('Validação OK: ' + error.response.data.erro);
    }

    console.log('\n2. Testando criação sem CPF (deve falhar)...');
    try {
      await axios.post(`${API_URL}/clientes`, {
        nome: "Cliente Teste",
        telefone: "(11) 99999-9999"
      });
      console.error('ERRO: Criação sem CPF deveria falhar!');
    } catch (error) {
      console.log('Validação OK: ' + error.response.data.erro);
    }

    console.log('\n3. Testando criação com CPF inválido (deve falhar)...');
    try {
      await axios.post(`${API_URL}/clientes`, {
        nome: "Cliente Teste",
        cpf: "111.111.111-11",
        telefone: "(11) 99999-9999"
      });
      console.error('ERRO: Criação com CPF inválido deveria falhar!');
    } catch (error) {
      console.log('Validação OK: ' + error.response.data.erro);
    }

    console.log('\n4. Testando criação com CPF válido...');
    const clienteValido = {
      nome: "Cliente Validação",
      cpf: "248.438.034-80",
      telefone: "(11) 99999-9999"
    };
    const response = await axios.post(`${API_URL}/clientes`, clienteValido);
    console.log('Cliente criado com sucesso:', response.data.codigo);
    const codigoCliente = response.data.codigo;

    console.log('\n5. Testando criação com CPF duplicado (deve falhar)...');
    try {
      await axios.post(`${API_URL}/clientes`, clienteValido);
      console.error('ERRO: Criação com CPF duplicado deveria falhar!');
    } catch (error) {
      console.log('Validação OK: ' + error.response.data.erro);
    }

    console.log('\n6. Testando busca de cliente inexistente (deve falhar)...');
    try {
      await axios.get(`${API_URL}/clientes/9999`);
      console.error('ERRO: Busca de cliente inexistente deveria falhar!');
    } catch (error) {
      console.log('Validação OK: ' + error.response.data.erro);
    }

    console.log('\n7. Testando exclusão de cliente...');
    await axios.delete(`${API_URL}/clientes/${codigoCliente}`);
    console.log('Cliente excluído com sucesso!');

    console.log('\nTodos os testes de validação concluídos!');
  } catch (error) {
    console.error('\nErro durante os testes de validação:', error.message);
  }
}

testarValidacoes();