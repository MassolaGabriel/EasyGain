document.getElementById('calcular').addEventListener('click', () => {
    const peso = parseFloat(document.getElementById('peso').value);
    const series = parseInt(document.getElementById('series').value);

    if (isNaN(peso) || isNaN(series) || peso <= 0 || series <= 0) {
        alert("Por favor, insira valores válidos para peso e repetições.");
        return;
    }

    // Fórmula de Epley: 1RM = Peso * (1 + (Repetições / 30))
    const rm = peso * (1 + (series / 30));

    // Atualiza o resultado na tela
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.textContent = `Seu 1RM estimado é: ${rm.toFixed(2)} kg`;
});