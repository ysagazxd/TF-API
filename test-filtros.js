const axios = require('axios');

const API_URL = 'http://localhost:3000/api';

// Função para criar clientes de teste
async function criarClientesTeste() {
  const clientes = [
    {
      nome: "João Silva",
      cpf: "111.222.333-45",
      cidade: "São Paulo",
      uf: "SP"
    },
    {
      nome: "Maria Oliveira",
      cpf: "222.333.444-56",
      cidade: "Rio de Janeiro",
      uf: "RJ"
    },
    {
      nome: "José Santos",
      cpf: "333.444.555-67",
      cidade: "São Paulo",
      uf: "SP"
    }
  ];

  console.log('Criando clientes de teste...');
  for (const cliente of clientes) {
    try {
      await axios.post(`${API_URL}/clientes`, cliente);
      console.log(`Cliente ${cliente.nome} criado com sucesso!`);
    } catch (error) {
      console.error(`Erro ao criar cliente ${cliente.nome}:`, error.response?.data || error.message);
    }
  }
}

// Função para testar filtros
async function testarFiltros() {
  try {
    // Criar clientes de teste
    await criarClientesTeste();

    console.log('\n1. Testando filtro por nome...');
    const resultadoNome = await axios.get(`${API_URL}/clientes`, { params: { nome: 'João' } });
    console.log(`Encontrados ${resultadoNome.data.clientes.length} clientes com nome contendo 'João'`);

    console.log('\n2. Testando filtro por cidade...');
    const resultadoCidade = await axios.get(`${API_URL}/clientes`, { params: { cidade: 'São Paulo' } });
    console.log(`Encontrados ${resultadoCidade.data.clientes.length} clientes de São Paulo`);

    console.log('\n3. Testando paginação...');
    const resultadoPaginado = await axios.get(`${API_URL}/clientes`, { params: { page: 1, limit: 2 } });
    console.log('Informações de paginação:', resultadoPaginado.data.paginacao);
    console.log(`Mostrando ${resultadoPaginado.data.clientes.length} de ${resultadoPaginado.data.paginacao.total} clientes`);

    console.log('\nTodos os testes de filtros concluídos!');
  } catch (error) {
    console.error('\nErro durante os testes de filtros:', error.message);
  }
}

testarFiltros();