# Proz-processo-seletivo
Processo seletivo de desenvolvimento back-end da Proz

### Para rodar o projeto é necessario:
- Instalar as dependências -> (`npm i`)
- Criar um container docker -> (`Docker compose up -d`)
- Para iniciar o servidor -> (`npm run start`)
- Para rodar os testes -> (`npm run test`)

## Endpoints:
#### `/students`:
Retorna os alunos que temos no banco, não requer dados.
<br>
<br>



#### `/upload`:
Salva os alunos da planilha no banco, requer o upload da planilha por meio de form-data multipart, e a planilha deve seguir o padrão de preenchimento (manter dados de referencia na mesma cordenada).
Planilha deve conter os seguintes dados:

Nome: `string`

Email: `string`

Cpf: `string`

Rg: `string`

Data de aniversário: `string (Formato "dd/MM/aaaa")`

Estado civil: `SOLTEIRO(A), CASADO(A), SEPARADO(A), DIVORCIADO(A), VIÚVO(A)`

Sexo: `Masculino, Feminino, Não binário`
<br>
<br>


#### `/update-student/:studentId`:
Atualiza os dados do aluno, requer o Id do aluno como `Path Variable` e o dado a ser atualizado no `body` possíveis dados: 

Nome: `string`

Email: `string`

Cpf: `string`

Rg: `string`

Data de aniversário: `string (Formato "dd/MM/aaaa")`

Estado civil: `SOLTEIRO(A), CASADO(A), SEPARADO(A), DIVORCIADO(A), VIÚVO(A)`

Sexo: `Masculino, Feminino, Não binário`
<br>
<br>


#### `/delete-student/:studentId`:
Deleta o aluno da base de dados, requer o Id do aluno como `Path Variable`. 
<br>
<br>
<br>



🚀
