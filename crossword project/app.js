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
}

document.addEventListener('DOMContentLoaded', () => {
    // function wordSearch(wordsForWordSearch, randomizedLetters) {

    // }

    const board = new Board(10, 8)

    console.log(board.toString())
})