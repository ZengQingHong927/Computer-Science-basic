# Syntax
## Array reducer
reducer 第一個參數爲fucntion，第二個爲起始值;function第一個參數爲累加變數，第二個參數爲數組迭代的數據。
此函數在計算構成一個新對象
```js
const exercises = [
        {
                id: 'overhead-press',
                title: 'Overhead Press',
                description: 'Delts exercise...',
                muscles: 'shoulders'
        },
        {
                id: 'dips',
                title: 'Dips',
                description: 'Triceps exercise...',
                muscles: 'arms'
        },
        {
                id: 'barbell-curls',
                title: 'Barbell curls',
                description: 'Biceps exercise...',
                muscles: 'arms'
        },
        {
                id: 'bench-press',
                title: 'Bench Press',
                description: 'Chest exercise...',
                muscles: 'chest'
        },
        {
                id: 'pull-ups',
                title: 'Pull ups',
                description: 'Back and biceps exercise...',
                muscles: 'back'
        },
        {
                id: 'deadlifts',
                title: 'Deadlifts',
                description: 'Back and leg exercise...',
                muscles: 'back'
        },
        {
                id: 'squats',
                title: 'Squats',
                description: 'Leg and leg exercise...',
                muscles: 'legs'
        }

];

var list = exercises.reduce((exercises, exercise) => {
        const { muscles } = exercise;

        exercises[muscles] = exercises[muscles] ? [...exercises[muscles], exercise] : [exercise];
        return exercises;
}, {});

console.log (Object.entries (list));
```
