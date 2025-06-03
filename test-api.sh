#!/bin/bash

API_URL="http://localhost:3000/api"

echo "Testando API de Clientes"

echo -e "\n1. Criando um novo cliente..."
RESPONSE=$(curl -s -X POST $API_URL/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Cliente Teste",
    "cpf": "123.456.789-09",
    "data_nascimento": "1990-01-01",
    "rg": "1234567",
    "telefone": "(11) 99999-9999",
    "endereco": "Rua Exemplo",
    "numero": "123",
    "cidade": "São Paulo",
    "uf": "SP",
    "cep": "01234-567"
  }')

echo $RESPONSE
CODIGO=$(echo $RESPONSE | grep -o '"codigo":[0-9]*' | grep -o '[0-9]*')
echo "Código do cliente criado: $CODIGO"

echo -e "\n2. Listando todos os clientes..."
curl -s -X GET $API_URL/clientes | json_pp

echo -e "\n3. Buscando cliente por código..."
curl -s -X GET $API_URL/clientes/$CODIGO | json_pp

echo -e "\n4. Atualizando cliente..."
curl -s -X PUT $API_URL/clientes/$CODIGO \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Cliente Atualizado",
    "telefone": "(11) 88888-8888"
  }' | json_pp

echo -e "\n5. Verificando cliente atualizado..."
curl -s -X GET $API_URL/clientes/$CODIGO | json_pp

echo -e "\n6. Buscando clientes com filtro por nome..."
curl -s -X GET "$API_URL/clientes?nome=Cliente" | json_pp

echo -e "\n7. Excluindo cliente..."
curl -s -X DELETE $API_URL/clientes/$CODIGO -v

echo -e "\n8. Verificando se cliente foi excluído..."
curl -s -X GET $API_URL/clientes/$CODIGO -v

echo -e "\nTestes concluídos!"