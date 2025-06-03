const axios = require('axios');

const API_URL = 'http://localhost:3000/api';

// Cliente de teste
const novoCliente = {
  nome: "Cliente Teste",
  cpf: "123.456.789-09",
  data_nascimento: "1990-01-01",
  rg: "1234567",
  telefone: "(11) 99999-9999",
  endereco: "Rua Exemplo",
  numero: "123",
  cidade: "São Paulo",
  uf: "SP",
  cep: "01234-567"
};

// Cliente para atualização
const clienteAtualizado = {
  nome: "Cliente Atualizado",
  telefone: "(11) 88888-8888"
};

// Função para testar a criação de cliente
async function testarCriacaoCliente() {
  try {
    console.log('Testando criação de cliente...');
    const response = await axios.post(`${API_URL}/clientes`, novoCliente);
    console.log('Cliente criado com sucesso!');
    console.log('Resposta:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar cliente:', error.response?.data || error.message);
    throw error;
  }
}

// Função para testar a listagem de clientes
async function testarListagemClientes() {
  try {
    console.log('\nTestando listagem de clientes...');
    const response = await axios.get(`${API_URL}/clientes`);
    console.log('Clientes listados com sucesso!');
    console.log('Total de clientes:', response.data.clientes.length);
    return response.data;
  } catch (error) {
    console.error('Erro ao listar clientes:', error.response?.data || error.message);
    throw error;
  }
}

// Função para testar a busca de cliente por código
async function testarBuscaClientePorCodigo(codigo) {
  try {
    console.log(`\nTestando busca de cliente por código ${codigo}...`);
    const response = await axios.get(`${API_URL}/clientes/${codigo}`);
    console.log('Cliente encontrado com sucesso!');
    console.log('Dados do cliente:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar cliente:', error.response?.data || error.message);
    throw error;
  }
}

// Função para testar a atualização de cliente
async function testarAtualizacaoCliente(codigo) {
  try {
    console.log(`\nTestando atualização de cliente ${codigo}...`);
    const response = await axios.put(`${API_URL}/clientes/${codigo}`, clienteAtualizado);
    console.log('Cliente atualizado com sucesso!');
    console.log('Dados atualizados:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error.response?.data || error.message);
    throw error;
  }
}

// Função para testar a exclusão de cliente
async function testarExclusaoCliente(codigo) {
  try {
    console.log(`\nTestando exclusão de cliente ${codigo}...`);
    const response = await axios.delete(`${API_URL}/clientes/${codigo}`);
    console.log('Cliente excluído com sucesso!');
    return true;
  } catch (error) {
    console.error('Erro ao excluir cliente:', error.response?.data || error.message);
    throw error;
  }
}

// Função para testar a busca com filtros
async function testarBuscaComFiltros(filtro) {
  try {
    console.log(`\nTestando busca de clientes com filtro ${JSON.stringify(filtro)}...`);
    const response = await axios.get(`${API_URL}/clientes`, { params: filtro });
    console.log('Busca com filtro realizada com sucesso!');
    console.log('Total de resultados:', response.data.clientes.length);
    return response.data;
  } catch (error) {
    console.error('Erro na busca com filtro:', error.response?.data || error.message);
    throw error;
  }
}

// Função principal para executar todos os testes
async function executarTestes() {
  try {
    // Criar um cliente
    const clienteCriado = await testarCriacaoCliente();
    const codigoCliente = clienteCriado.codigo;
    
    // Listar todos os clientes
    await testarListagemClientes();
    
    // Buscar cliente por código
    await testarBuscaClientePorCodigo(codigoCliente);
    
    // Buscar com filtro por nome
    await testarBuscaComFiltros({ nome: 'Cliente' });
    
    // Atualizar cliente
    await testarAtualizacaoCliente(codigoCliente);
    
    // Verificar cliente atualizado
    await testarBuscaClientePorCodigo(codigoCliente);
    
    // Excluir cliente
    await testarExclusaoCliente(codigoCliente);
    
    // Verificar se cliente foi excluído
    try {
      await testarBuscaClientePorCodigo(codigoCliente);
    } catch (error) {
      console.log('Cliente excluído com sucesso, não foi encontrado na busca!');
    }
    
    console.log('\nTodos os testes foram concluídos com sucesso!');
  } catch (error) {
    console.error('\nErro durante a execução dos testes:', error.message);
  }
}

// Executar os testes
executarTestes();