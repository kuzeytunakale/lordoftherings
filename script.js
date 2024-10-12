document.addEventListener('DOMContentLoaded', (event) => {
    const inputText = document.getElementById('inputText');
    inputText.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            fetchData();
        }
    });
});

async function fetchData() {
    const inputText = document.getElementById('inputText').value.toLowerCase();
    const response = await fetch('https://kuzeytunakale.github.io/k1.json');
    const data = await response.json();

    let closestMatch = '';
    let closestDistance = Infinity;

    for (const key in data) {
        const distance = levenshteinDistance(inputText, key.toLowerCase());
        if (distance < closestDistance) {
            closestDistance = distance;
            closestMatch = key;
        }
    }

    const result = data[closestMatch];
    document.getElementById('result').innerText = result;
}

function levenshteinDistance(a, b) {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
                );
            }
        }
    }

    return matrix[b.length][a.length];
}
