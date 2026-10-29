document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');

    let currentExpression = '';

    function handleButton(event) {
        const btn = event.currentTarget;
        const value = btn.textContent;
        const id = btn.id;

        if (id === 'clear') {
            currentExpression = '';
            display.textContent = '0';
            return;
        }

        if (value === '=') {
            try {
                const formatted = currentExpression
                    .replaceAll('×', '*')
                    .replaceAll('÷', '/')
                    .replaceAll('−', '-');

                const result = Function('"use strict"; return (' + formatted + ')')();
                if (!Number.isFinite(result)) throw new Error('Invalid');
                display.textContent = result;
                currentExpression = String(result);
            } catch {
                display.textContent = 'Ошибка';
                currentExpression = '';
            }
            return;
        }

        if (id === 'plus-minus') {
            const match = currentExpression.match(/(.*?)(-?\d*\.?\d+)$/);
            if (match) {
                const prefix = match[1];
                const lastNum = match[2];
                const toggled = lastNum.startsWith('-')
                    ? lastNum.slice(1)
                    : '-' + lastNum;
                currentExpression = prefix + toggled;
                display.textContent = currentExpression || '0';
            }
            return;
        }

        if (id === 'percent') {
            try {
                const opMatch = currentExpression.match(/^(.*?)([+\-×÷])(\d*\.?\d+)$/);
                if (opMatch) {
                    const base = parseFloat(opMatch[1]);
                    const percentVal = parseFloat(opMatch[3]);
                    const calculated = (base / 100) * percentVal;
                    currentExpression = opMatch[1] + opMatch[2] + calculated;
                } else {
                    const res = parseFloat(currentExpression) / 100;
                    currentExpression = String(res);
                }
                display.textContent = currentExpression || '0';
            } catch {
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

    buttons.forEach(b => b.addEventListener('click', handleButton));
});