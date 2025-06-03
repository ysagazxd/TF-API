@echo off
echo Testando API de Clientes

echo.
echo 1. Criando um novo cliente...
curl -X POST http://localhost:3000/api/clientes -H "Content-Type: application/json" -d "{\"nome\":\"Cliente Teste\",\"cpf\":\"123.456.789-09\",\"data_nascimento\":\"1990-01-01\",\"rg\":\"1234567\",\"telefone\":\"(11) 99999-9999\",\"endereco\":\"Rua Exemplo\",\"numero\":\"123\",\"cidade\":\"São Paulo\",\"uf\":\"SP\",\"cep\":\"01234-567\"}"

echo.
echo 2. Listando todos os clientes...
curl -X GET http://localhost:3000/api/clientes

echo.
echo 3. Buscando cliente por código (substitua 1 pelo código retornado na criação)...
set /p codigo="Digite o código do cliente criado: "
curl -X GET http://localhost:3000/api/clientes/%codigo%

echo.
echo 4. Atualizando cliente...
curl -X PUT http://localhost:3000/api/clientes/%codigo% -H "Content-Type: application/json" -d "{\"nome\":\"Cliente Atualizado\",\"telefone\":\"(11) 88888-8888\"}"

echo.
echo 5. Verificando cliente atualizado...
curl -X GET http://localhost:3000/api/clientes/%codigo%

echo.
echo 6. Buscando clientes com filtro por nome...
curl -X GET "http://localhost:3000/api/clientes?nome=Cliente"

echo.
echo 7. Excluindo cliente...
curl -X DELETE http://localhost:3000/api/clientes/%codigo%

echo.
echo 8. Verificando se cliente foi excluído...
curl -X GET http://localhost:3000/api/clientes/%codigo%

echo.
echo Testes concluídos!
pause