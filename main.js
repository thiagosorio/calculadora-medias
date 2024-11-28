const form = document.getElementById('form-atividade')
const imgAprovado = '<img src="images/aprovado.png" alt="Emoji festejando">'
const imgReprovado = '<img src="images/reprovado.png" alt="Emoji decepcionado">'
const atividades = []
const notas = []
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>'
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>'
const notaMinima = parseFloat(prompt("Digite a nota mínima:"))

let linhas = ''
// A variável linhas precisa ser global, senão ela será resetada toda vez que ocorrer "submit"

form.addEventListener('submit', function(e) {
    e.preventDefault()

    adicionaLinha()
    atualizaTabela()
    atualizaMediaFinal()
    // O evento chamará as funções acima
})

function adicionaLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade')
    const inputNotaAtividade = document.getElementById('nota-atividade')

    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade: ${inputNomeAtividade.value} já foi inserida`)
    } else {
        atividades.push(inputNomeAtividade.value)
        notas.push(parseFloat(inputNotaAtividade.value))
    

        let linha = '<tr>'
        linha += `<td>${inputNomeAtividade.value}</td>`
        linha += `<td>${inputNotaAtividade.value}</td>`
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`
        linha += '</tr>'
        // Depois que terminar de escrever a variável "linha", vai concatená-la à variável "linhas"

        linhas += linha
        // Depois da concatenação, é preciso inserir esse conteúdo (linhas) dentro do corpo da tabela, o que é feito na function atualizaTabela
    }

    inputNomeAtividade.value = ''
    inputNotaAtividade.value = ''
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody')
    corpoTabela.innerHTML = linhas
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal()

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2)
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado
}

function calculaMediaFinal() {
    let somaDasNotas = 0

    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i]
    }

    return somaDasNotas / notas.length
}