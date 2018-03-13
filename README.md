# Protocolo Fitts WeTech

## Log de tarefas:

- [x] 1: Verificar se o clique foi um acerto, erro (erro circulo errado, erro clique fora dos circulos).

- [x] 2: Log de acertos e erros com seus repectivos tempos.
(deve contar o numero de acerto, erro, o tempo de cada erro e acerto.)

- [x] 3: Implementar a sequencia 'extremo-oposto' para quando o números de círculos for par, ver função controleAlvos(indice) do script.js.

- [x] 4: Configuração do diamtro do alvo (A) e diametro da área (D), ver imagem 1.

- [ ] 5: Som de feedback do erro e acerto.

- [ ] 6: Processar o Log de Acertos e Erros para gerar os resultados.
<br/> Na primeira versão pode gerar o resultado no formato JSON em um input, o qual vai ser copiado e colado em um  [conversor de JSON para excel](http://www.convertcsv.com/json-to-csv.htm). Olhar as "Configurações sugeridas".

- [ ] 7: Estilização:
- [ ] 7.1: Ao chamar o menu escoder o teste.
- [ ] 7.2: Centralizar a janela do teste.
- [ ] 7.3: Estilizar o menu de configuração.

<img src="readme/protocolo-medidas.png"  width="450"/>

(imagem 1)

## Configurações sugeridas
D = 100, 300
<br/>A = 30, 60, 100
<br/>Q = 13

Quantidade de fases do teste: nD * nA

Formato do resultado (resultados exemplos)

Legendas:
<br/>TM = Tempo Médio

| Fase            | Acertos | Acertos % | TM Acertos | Erros | Erros % | TM Erros | TM |
| --------------- | ------- | --------- | ------------------- | ----- | ------- | ----------------- | ----------- |
| A=30, D=100     | 10      | 90%       | 1300ms              | 3     | 10%     | 1400ms            | 3400ms |
| A=30, D=300     | 10      | 90%       | 1600ms              | 3     | 10%     | 1200ms            | 2420ms |
| A=60, D=100     | 9       | 87%       | 2300ms              | 4     | 13%     | 1300ms            | 5400ms |
| A=60, D=300     | 11      | 93%       | 1530ms              | 2     | 7%      | 1600ms            | 2400ms |
| A=100, D=100    | 12      | 98%       | 2900ms              | 1     | 2%      | 2400ms            | 3400ms |
| A=100, D=300    | 8       | 70%       | 5600ms              | 5     | 30%     | 3400ms            | 3200ms |
