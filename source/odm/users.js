import mongoose from 'mongoose';

function makePasswordRegExp(patterns, min, max) {
    const miN = min || '';
    const maX = max || '';
    let regex_string = '';
    const rules = [];
    const range = "{" + miN + "," + maX + "}"; // Разрешённый диапазон для длины строки
    for (let rule in patterns) { // Обрабатываем входящий массив из ВСЕХ правил для строки
        if (patterns.hasOwnProperty(rule)) {
            rules.push(patterns[rule]); // Запоминаем правила
            // Формируем последовательность из шаблонов `(?=.*[%s])`
            // Она проверит обязательное присутствие всех символов из входящего набора
            regex_string += "(?=.*[" + patterns[rule] + "])";
        }
    }
    // Добавляем в хвост набор из ВСЕХ разрешённых символов и разрешённую длину строки
    regex_string += "[" + rules.join('') + "]" + range;
    // Собираем всё в одно регулярное выражение
    return new RegExp(regex_string, 'g');
}

// Набор правил
const patterns = {
    'numeric':     '0-9',
    'special':     '!@#$%^&*',
    'latin_lower': 'a-z',
    'latin_upper': 'A-Z'
};
// Длина пароля
const min = 8;

const regexpPassword = makePasswordRegExp(patterns, min);

// Document shape
const schema = new mongoose.Schema(
    {
        email: {
            type:     String,
            match:    /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/,
            required: true,
            unique:   true,
        },
        password: {
            type:     String,
            match:    regexpPassword,
            select:   false,
            required: true,
        },
    },
    {
        timestamps: {
            createdAt: 'created',
            updatedAt: 'modified',
        },
    },
);

// Collection
export const users = mongoose.model('users', schema);
