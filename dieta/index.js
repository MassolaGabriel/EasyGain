document.addEventListener("DOMContentLoaded", () => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    // Recupera dados existentes do localStorage
    const existingData = JSON.parse(localStorage.getItem("mealData")) || {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
    };

    // Inicializa os totais com os dados existentes
    totalCalories = existingData.calories;
    totalProtein = existingData.protein;
    totalCarbs = existingData.carbs;
    totalFat = existingData.fat;

    // Atualizar os valores na interface
    const updateTotalsUI = () => {
        const caloriesElement = document.getElementById("total-calories");
        const proteinElement = document.getElementById("total-protein");
        const carbsElement = document.getElementById("total-carbs");
        const fatElement = document.getElementById("total-fat");
    
        if (caloriesElement) caloriesElement.textContent = totalCalories;
        if (proteinElement) proteinElement.textContent = totalProtein.toFixed(1);
        if (carbsElement) carbsElement.textContent = totalCarbs.toFixed(1);
        if (fatElement) fatElement.textContent = totalFat.toFixed(1);
    };
    
    const backButton = document.getElementById("back-to-easygain");
    if (backButton) {
        backButton.addEventListener("click", () => {
            window.location.href = "easygain.html";  // Redireciona para easygain.html
        });
    }

    updateTotalsUI();

    // Atualizar totais ao clicar nos alimentos
    const items = document.querySelectorAll(".clickable");
    items.forEach((item) => {
        item.addEventListener("click", () => {
            const calories = parseInt(item.getAttribute("data-calories"), 10);
            const protein = parseFloat(item.getAttribute("data-protein"));
            const carbs = parseFloat(item.getAttribute("data-carbs"));
            const fat = parseFloat(item.getAttribute("data-fat"));

            // Soma os valores da nova refeição
            totalCalories += calories;
            totalProtein += protein;
            totalCarbs += carbs;
            totalFat += fat;

            updateTotalsUI();
        });
    });

    // Salvar nova refeição ao clicar no botão
    const saveButton = document.querySelector(".btn-outline-warning");
    saveButton.addEventListener("click", () => {
        // Atualiza os dados no localStorage
        localStorage.setItem("mealData", JSON.stringify({
            calories: totalCalories,
            protein: totalProtein,
            carbs: totalCarbs,
            fat: totalFat,
        }));

        // Redireciona para a tela dieta.html
        window.location.href = "dieta.html";
    });

    // Tela 2: Atualização das barras de progresso
    const mealData = JSON.parse(localStorage.getItem("mealData"));
    if (mealData) {
        const { protein, carbs, fat } = mealData;
        const proteinCalories = protein * 4;
        const carbsCalories = carbs * 4;
        const fatCalories = fat * 9;
        const totalCalories = proteinCalories + carbsCalories + fatCalories;

        const proteinPercent = (proteinCalories / totalCalories) * 100;
        const carbsPercent = (carbsCalories / totalCalories) * 100;
        const fatPercent = (fatCalories / totalCalories) * 100;

        const progressBars = document.querySelectorAll(".progress-bar");
        progressBars[0].style.width = `${carbsPercent.toFixed(1)}%`;
        progressBars[1].style.width = `${proteinPercent.toFixed(1)}%`;
        progressBars[2].style.width = `${fatPercent.toFixed(1)}%`;

        const listItems = document.querySelectorAll(".custom-list li");
        listItems[0].textContent = `Carboidrato (${carbs.toFixed(1)}g - ${carbsPercent.toFixed(1)}%)`;
        listItems[1].textContent = `Proteína (${protein.toFixed(1)}g - ${proteinPercent.toFixed(1)}%)`;
        listItems[2].textContent = `Gordura (${fat.toFixed(1)}g - ${fatPercent.toFixed(1)}%)`;
    }

    // Reseta os dados das refeições sem confirmação
    const resetButton = document.getElementById("reset-meals");
    if (resetButton) {
        resetButton.addEventListener("click", () => {
            // Limpa os dados no localStorage
            localStorage.removeItem("mealData");

            // Zera os valores
            totalCalories = 0;
            totalProtein = 0;
            totalCarbs = 0;
            totalFat = 0;

            // Atualiza a interface
            updateTotalsUI();

            // Reseta barras de progresso
            const progressBars = document.querySelectorAll(".progress-bar");
            progressBars.forEach((bar) => (bar.style.width = "0%"));

            // Reseta os itens da lista de macronutrientes
            const listItems = document.querySelectorAll(".custom-list li");
            listItems[0].textContent = "Carboidrato (0g - 0%)";
            listItems[1].textContent = "Proteína (0g - 0%)";
            listItems[2].textContent = "Gordura (0g - 0%)";

            alert("Refeições reiniciadas com sucesso!");
        });
    }

    
});

