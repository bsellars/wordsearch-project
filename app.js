const wordsForWordSearch = [
    'Operator, BigInt, Number, Boolean, Events, StrictMode, Modules, Classes,'
]

const randomizedLetters = 'operatorbigintnumberbooleaneventsstrictmodemodulesclasses'.split('')

const getRandomLetter = () => {
    const randomIndex = Math.floor(Math.random() * randomizedLetters.length)

    return randomizedLetters[randomIndex]
}

class Board {
    constructor(boardSizeX, boardSizeY) {

        this.grid = Array(boardSizeY).fill(0).map(
            (_, row) => Array(boardSizeX).fill(0).map(
                (__, column) => ({
                    x: column,
                    y: row,
                    letter: getRandomLetter(),
                    isInMatch: false,
                })
            )
        )
    }

    getRow(index) {
        return this.grid[index]
    }

    toString() {
        return this.grid.map(
            (row) => row.map(
                ({ letter }) => letter
            ).join(', ')
        ).join('\n')
    }

    forEach(callBack) {
        this.grid.forEach(
            (row) => {
                row.forEach(
                    (cell) => {
                        callBack(cell)
                    }
                )
            }
        )
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const board = new Board(10, 10)

    const gridRoot = document.querySelector("#grid")

    gridRoot.addEventListener('click', (e) => {
        console.log({ target: e.target.textContent })
    })

    if (document.createElement("template")) {
        const template = document.querySelector('#cell');

        if (!template) {
            throw new Error('template not found')
        }
        board.forEach(
            ({ letter }) => {
                const cell = template.content.cloneNode(true);

                const cellText = cell.querySelector("#cell-text")

                if (!cellText) {
                    throw new Error('not Found')
                }

                cellText.textContent = letter

                gridRoot.appendChild(cellText)


            }
        )
    }
})

