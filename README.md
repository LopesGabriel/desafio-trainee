# Desafio Trainee
## Endpoint
/endereco/[Nome]<br>
Onde contem "[Nome]", deve conter o nome do usuário.<br>
Retorna um JSON contendo endereço, latitude e longitude do objeto caso não tenha erros.<br>
Caso não seja possível recuperar os dados da unidade pelo Wialon, será enviado um JSON redirecionando para outro bloco no Chatfuel.
## Como funciona?
1. Usuário realiza a pergunta "Onde está meu carro" ao bot
2. Bot Realiza uma requisição do tipo POST para o endpoint https://us-central1-desafio-trainee.cloudfunctions.net/test/endereco/[Nome]
3. Salva os dados da posição do veículo como atributo do usuário
4. Por fim o bot envia o endereço do veículo e oferece uma opção de ver no mapa.
## Links úteis
[Host da função no firebase](https://us-central1-desafio-trainee.cloudfunctions.net/test)
