# 📘 Consultas Séries MongoDB (Compass e mongosh)

Este repositório contém queries para MongoDB (show, use, drop, insertOne, insertMany, find, $gte, $lte, $in, updateOne, updateMany, replaceOne) Compass e mongosh utilizadas para consultar os documentos de séries.

## Inicialização e Navegação

```bash
# Iniciar o terminal do MongoDB
mongosh

# Mostrar bancos de dados disponíveis
show databases

# Acessar/criar um banco de dados
use Nome_do_Banco

# Visualizar coleções dentro de um banco
show collections
```

## Criação e Exclusão

```bash
# Criar uma nova coleção
db.createCollection("Nome_da_Colecao")

# Excluir uma coleção
db.Nome_da_Colecao.drop()

# Excluir o banco de dados atual
db.dropDatabase()
```
## Inserção de Documentos

```bash
# Inserir um único documento
db.Nome_da_Colecao.insertOne({
  "Série": "Upload",
  "Ano de lançamento": 2020,
  "Linguagem": "Inglês",
  "Gênero": "Comédia de ficção científica",
  "IMDb Avaliação": 8.1,
  "Classificação": "16+"
})

# Inserir múltiplos documentos
db.Nome_da_Colecao.insertMany([
  {
    "Série": "The Marvelous Mrs. Maisel",
    "Temporadas disponíveis": 3,
    "Linguagem": "Inglês",
    "Gênero": ["Drama", "Comédia"],
    "IMDb Avaliação": 8.7,
    "Classificação": "16+"
  },
  {
    "Série": "Four More Shots Please",
    "Ano de lançamento": 2019,
    "Temporadas disponíveis": 2,
    "Linguagem": "Hindi",
    "Gênero": ["Drama", "Comédia"]
  }
])

```

## Consultas (find)

```bash
# Listar todos os documentos
db.series.find()

# Filtrar por ano de lançamento
db.series.find({"Ano de lançamento": 2018})

# Projetar apenas alguns campos
db.series.find({}, {"Série": 1, "Ano de lançamento": 1, "_id": 0})

```

## Filtros

```bash
# OU (OR)
{$or: [{"Ano de lançamento": 2018}, {"Classificação": "18+"}]}

# E (AND)
{$and: [{"Ano de lançamento": 2018}, {"Classificação": "18+"}]}

# NÃO (NOR)
{$nor: [{"Ano de lançamento": 2018}, {"Classificação": "18+"}]}

# IN
{"Ano de lançamento": {$in: [2019, 2020]}}

# Maior ou igual
{"Temporadas disponíveis": {$gte: 2}}

# Maior que
{"Temporadas disponíveis": {$gt: 3}}

# Menor que
{"Temporadas disponíveis": {$lt: 3}}

# Menor ou igual
{"Temporadas disponíveis": {$lte: 5}}

```

## Projeções, Ordenações e Limites

```bash
# Selecionar com filtro, projeção e ordenação
db.series.find(
  {"Temporadas disponíveis": {$gte: 7}},
  {"Série": 1, "Temporadas disponíveis": 1, "_id": 0}
).sort({"Temporadas disponíveis": 1})

# Limitar resultados e ordenar por temporadas decrescentes
db.series.find().limit(10).sort({"Temporadas disponíveis": -1})

# Combinar múltiplos filtros, projeção e limite
db.series.find(
  {
    $and: [
      {"Ano de lançamento": {$in: [2019, 2020]}},
      {"Temporadas disponíveis": {$gte: 2}}
    ]
  },
  {"Série": 1, "Ano de lançamento": 1, "Temporadas disponíveis": 1, "_id": 0}
).limit(5)

```

## Atualizações

```bash
# Atualizar campo de temporadas
db.series.updateOne({"Série": "Grimm"}, {$set: {"Temporadas disponíveis": 6}})

# Criar campo de classificação
db.series.updateOne({"Série": "Grimm"}, {$set: {"Classificação": "16+"}})

# Atualizar múltiplos documentos
db.series.updateMany(
  {"Série": {$in: ["Four More Shots Please", "Fleabag"]}},
  {$set: {"Classificação": "18+"}}
)

```

## Substituição e Exclusão de Documentos

```bash
# Substituir completamente um documento
db.series.replaceOne(
  { _id: ObjectId("68267ce9fc3a3471256c4bd4") },
  {
    _id: ObjectId("68267ce9fc3a3471256c4bd4"),
    "Série": "Four More Shots",
    "Ano de lançamento": 2020,
    "Temporadas disponíveis": 4,
    "Linguagem": "Inglês",
    "Gênero": ["Drama", "Romance"],
    "Classificação": "16+"
  }
)

# Deletar um documento
db.series.deleteOne({"Série": "The Boys"})

# Deletar vários documentos
db.series.deleteMany({"Temporadas disponíveis": 1})

```

## Análise de Consultas

```bash
# Analisar performance da consulta
db.series.find({"Genero": {$all: ["Ação", "Comédia"]}}).explain("executionStats")

```

## Filtros com Arrays

```bash
# Todos os gêneros: ação **e** comédia
db.series.find({"Genero": {$all: ["Ação", "Comédia"]}})

# Um dos gêneros: ação **ou** comédia
db.series.find({"Genero": {$in: ["Ação", "Comédia"]}})
```
