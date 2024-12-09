document.getElementById('calcular').addEventListener('click', () => {
    const sexoSelecionado = document.querySelector('input[name="sexo"]:checked').value;
    const sexo = (sexoSelecionado === "Homem") ? 1.0 : 0.9;

    const peso = parseInt(document.getElementById('peso').value);
    const altura = parseInt(document.getElementById('altura').value);
    const idade = parseInt(document.getElementById('idade').value);
    const atividade = parseInt(document.getElementById('atividade').value);

    if (isNaN(peso) || isNaN(altura) || isNaN(idade)) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    function calcKcal(sexo, peso, altura, idade) {
        if (sexo === 1.0) {
            return (13.75 * peso) + (5 * altura) - (6.76 * idade) + 66.5;
        } else {
            return (9.56 * peso) + (1.85 * altura) - (4.68 * idade) + 665;
        }
    }

    const tmb = calcKcal(sexo, peso, altura, idade);
    const fatorAtividade = [1.2, 1.375, 1.55, 1.725, 1.9][atividade - 1];
    const kcal = tmb * fatorAtividade;

    const proteina = peso * fatorAtividade;
    const carboidrato = kcal * 0.6 / 4;
    const gordura = kcal * 0.3 / 9;

    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
        <p>Quantia calorias recomendadas: ${kcal.toFixed(2)}</p>
        <p>Quantia proteinas recomendadas: ${proteina.toFixed(2)}</p>
        <p>Quantia carboidratos recomendadas: ${carboidrato.toFixed(2)}</p>
        <p>Quantia gordura recomendadas: ${gordura.toFixed(2)}</p>
    `;
});