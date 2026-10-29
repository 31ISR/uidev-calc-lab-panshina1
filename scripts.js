document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const button = document.querySelectorAll('.button');

    let currentExpression = '';

    function handleButton(event) {
        const button = event.target;
        const value = button.textContent;
        const id = button.id;

        if (id === 'clear') {
            currentExpression = '';
            display.textContent = '0';
            return;
        }

        if (value === '=') {
            try {
                const formattedExpression = currentExpression
                .replaceAll('×', '*')
                .replaceAll('÷', '/')
                .replaceAll('-', '-');

                const result = eval(formattedExpression);
                display.textContent = result;
                currentExpression = String(result); 
            } catch (error) {
                display.textContent = 'Ошибка';
                currentExpression = '';
            }
            return;
        }
        if (id === 'plus-minus') {
            try {
                const formattedExpression = currentExpression
                    .replaceAll('×', '*')
                    .replaceAll('÷', '/')
                    .replaceAll('-', '-');
                let res = eval (formattedExpression);
                res = res * -1;
                currentExpression = String(res);
                display.textContent = currentExpression;
            } catch (error) {
                if (currentExpression) {
                    currentExpression = String(parseFloat(currentExpression) * -1);
                    display.textContent = currentExpression;
                }
            }
            return;
    }
    if (id === 'percent') {
        try {
            if (currentExpression.includes('+') || currentExpression.includes('-') || currentExpression.includes('×') || currentExpression.includes('÷')) {
                const parts = currentExpression.split(/[\+\-\×\÷]/);
                if (parts.length === 2) {
                    const base = parseFloat(parts[0]);
                    const percentVal = parseFloat(parts[0]);
                    const calculatedPercent = (base / 100) * percentVal;
                    currentExpression = currentExpression.replace(parts[1], calculatedPercent);
                }
            } else {
                const res = parseFloat(currentExpression) / 100;
                currentExpression = String(res);
        }
        display.textContent = currentExpression;
    } catch (e) {
        display.textContent = 'Ошибка';
    }
    return;
}

if (currentExpression === '0' && !['+', '-', '×', '÷', '.'].includes(value)) {
    currentExpression = value;
} else {
    currentExpression += value; 
}

    display.textContent = currentExpression;
}

buttons.forEach(button => {
    button.addEventListener('click', handleButton);
});
});