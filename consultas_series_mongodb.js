// inicializar mongosh no prompt de comando
mongosh

// mostrar bancos de dados
show databases

// criar banco de dados
use Nome_do_Banco

// criar coleção no banco de dados
db.createCollection('Nome_da_Colecao')
db.createCollection("Nome_da_Colecao")

// visualizar coleções dentro de um banco de dados
show collections

// excluir coleção de um banco de dados
db.Nome_da_Colecao.drop()

// excluir banco de dados (esteja dentro do DB)
db.dropDatabase()

// inserir um documento em uma coleção (id é inserido automaticamente)
db.Nome_da_Colecao.insertOne(
{
 "Série": "Upload",
 "Ano de lançamento": 2020,
 "Linguagem": "Inglês",
 "Gênero": "Comédia de ficção científica",
 "IMDb Avaliação": 8.1,
 "Classificação": "16+"
}
)

// inserir vários documentos ao mesmo tempo em uma coleção
insertMany
db.Nome_da_Colecao.insertMany(
[{ 
"Série": "The Marvelous Mrs. Maisel",
"Temporadas disponíveis": 3,
"Linguagem": "Inglês",
"Gênero": ["Drama", "Comédia"],
"IMDb Avaliação": 8.7,
"Classificação": "16+"
}
,
{ 
"Série": "Four More Shots Please",
"Ano de lançamento": 2019,
"Temporadas disponíveis": 2,
"Linguagem": "Hindi",
"Gênero": ["Drama", "Comédia"]
}])

// ordenar por ordem crescente
{Série: 1}

// ordenar por ordem decrescente
{Série: -1}

// filtrar quando o Ano de lançamento = 18 ou a classificação = 18+
{$or: [{"Ano de lançamento": 2018} , {"Classificação": "18+"}]}

// filtrar quando o Ano de lançamento = 18 e a classificação = 18+
{$and: [{"Ano de lançamento": 2018} , {"Classificação": "18+"}]}

// filtrar os conteúdos que não foram lançados em 2018 e que não são classificados como 18+
{$nor: [{"Ano de lançamento": 2018} , {"Classificação": "18+"}]}

// filtrar os conteúdos que foram lançados em 2019 ou 2020
{"Ano de lançamento": {$in: [2018 , 2019]}}

// filtrar os conteúdos com 2 ou mais temporadas
{"Temporadas disponíveis": {$gte: 2}}

// filtrar os conteúdos com 3 ou mais temporadas
{"Temporadas disponíveis": {$gt: 3}}

// filtrar os conteúdos com menos de 3 temporadas
{"Temporadas disponíveis": {$lt: 3}}

// filtrar os conteúdos com 5 ou menos temporadas
{"Temporadas disponíveis": {$lte: 5}}

// selecionar as chaves Série e Temporada disponíveis, filtrar os conteúdos com 7 ou mais temporadas e ordenar por ordem crescente
filter: {"Temporadas disponíveis": {$gte: 7}}
project: {"Série": 1 , "Temporadas disponíveis": 1, "_id": 0}
sort: {"Temporadas disponíveis": 1}

// selecionar todos os dados por meio da linha de comando, utilizando o método find (db.collection.find(query, projection, options))
db.series.find()

// filtrar ano de lançamento igual a 2018 na linha de comando
db.series.find({"Ano de lançamento": 2018})

// selecionar somente as colunas "Série" e "Ano de lançamento"
db.series.find({}, {"Série": 1, "Ano de lançamento": 1, "_id": 0})

// filtrar anos 2019 e 2020 e com temporadas >= 2, mostrar somente as colunas "Série", "Ano de lançamento" e "Temporadas disponíveis", retornar somente 5 resultados
db.series.find({$and: [{"Ano de lançamento": {$in: [2019, 2020]}}, {"Temporadas disponíveis": {$gte: 2}}]}, {"Série": 1, "Ano de lançamento": 1, "Temporadas disponíveis": 1, "_id": 0}).limit(5)

// selecionar somente 10 documentos e ordenar pela ordem decrescente de "Temporadas disponíveis"
db.series.find().limit(10).sort({"Temporadas disponíveis": -1})

// filtrar conteúdos cuja classificação não seja 18+
db.series.find({"Classificação": {$ne: "18+"}})

// filtrar conteúdos cujo gênero é ação e comédia
db.series.find({"Genero": {$all: ["Ação", "Comédia"]}})

// filtrar conteúdos cujo gênero é ação ou comédia
db.series.find({"Genero": {$in: ["Ação", "Comédia"]}})

// use explain para entender como a consulta está sendo interpretada corretamente
db.series.find({"Genero": {$all: ["Ação", "Comédia"]}}).explain("executionStats")

// atualizar a quantidade de temporadas disponíveis da série Grimm (db.collection.updateOne(filter, update, options))
db.series.updateOne({"Série": "Grimm"}, {$set: {"Temporadas disponíveis": 6}})

// criar o campo de classificação para a série Grimm
db.series.updateOne({"Série": "Grimm"}, {$set: {"Classificação": "16+"}})

// atualizar/criar o campo de classificação para as séries "Four More Shots Please" e "Fleabag" ao mesmo tempo (db.collection.updateMany(filter, update, options))
db.series.updateMany({"Série": {$in: ["Four More Shots Please", "Fleabag"]}}, {$set: {"Classificação": "18+"}})

// substitua um documento com outras informações utilizando o raplaceOne
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

// deletar a série The Boys
db.series.deleteOne({"Série": "The Boys"})

// deletar todas as séries com apenas uma temporada disponível
db.series.deleteMany({"Temporadas disponíveis": 1})
