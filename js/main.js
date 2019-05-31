const fieldNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
const fieldChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const horseDirections = [[2, 1], [2, -1], [-2, 1], [-2, -1]];

/**
 * Получает все возможные ходы
 * @param {string} char
 * @param {number} number
 * @returns {Array}
 */
function getAvailableMoves(char, number) {
    const availableMoves = [];
    const currentNumberIndex = fieldNumbers.indexOf(number);
    const currentCharIndex = fieldChars.indexOf(char);

    horseDirections.forEach((direction) => {
        const horisontalChar = fieldChars[currentCharIndex + direction[0]];
        const verticalChar = fieldChars[currentCharIndex + direction[1]];
        const horisontalNumber = fieldNumbers[currentNumberIndex + direction[1]];
        const verticalNumber = fieldNumbers[currentNumberIndex + direction[0]];

        if (horisontalChar && horisontalNumber) {
            availableMoves.push(`${horisontalChar}${horisontalNumber}`);
        }

        if (verticalChar && verticalNumber) {
            availableMoves.push(`${verticalChar}${verticalNumber}`);
        }
    });

    return availableMoves;
}

/**
 * Проверяет корректность введённой позиции коня
 * @param {string} position
 * @returns {boolean}
 */
function isHorsePosition (position) {
    let result = false;

    if (position.length === 2) {
        if (!Number(position[0]) && Number(position[1])) {
            if (
                fieldNumbers.indexOf(Number(position[1])) !== -1 &&
                fieldChars.indexOf(position[0].toLowerCase()) !== -1
            ) {
                result = true;

            } else {
                alert (`Позиция коня должна быть в пределах букв ${fieldChars.join(', ')} и цифр ${fieldNumbers.join(', ')}`);
            }

        } else {
            alert('Позиция коня должны быть в формате букваЧисло')
        }

    } else {
        alert('Введите двухзначную позицию коня в формате букваЧисло');
    }

    return result;
}

/**
 * Биндит обработчик на нажатие по кнопке
 */
function bind () {
    const horsePosition = document.getElementById('horsePosition');

    document.querySelector('.__calculateButton').onclick = () => {
        if (isHorsePosition(horsePosition.value)) {
            const char = horsePosition.value[0].toLowerCase();
            const number = Number(horsePosition.value[1]);

            alert(`Возможные варианты хода:\n${getAvailableMoves(char, number).join(', ')}`);
        }
    };
}

window.onload = () => bind();