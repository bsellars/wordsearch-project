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

    let state = {
        selectedCells: []
    }

    const makeSelection = (selection)=>{
        state.selectedCells.push(selection)

        const selectedWord = state.selectedCells.map(
            (elem)=> elem.textContent

        ).join('')

        document.querySelector('#selection').textContent = selectedWord
    }

    const isNewSelection = (target) => {
        if (state.selectedCells.length === 0) {
            return true
        }
        // the last item in the stack is the most recent selection
        const mostRecentSelection = state.selectedCells[state.selectedCells.length - 1]

        if (target === mostRecentSelection) {
            // the previous selection was repeated
            return false
        }

        const distance = Math.abs(target.dataSet.x - mostRecentSelection.dataSet.x + target.dataSet.y - mostRecentSelection.dataSet.y)

        if(distance !== 1){
            return true
        }

        if(state.selectedCells.length === 1){
            return false
        }

        // now we know that there is already a direction
        const secondMostRecentSelection = state.selectedCells[state.selectedCells.length - 2]

        // this selection is vertical if adjacent cells have the same x value
        const isVertical = secondMostRecentSelection.dataSet.x === mostRecentSelection.dataSet.x

        if(isVertical){
            return Math.abs(target.dataSet.y - mostRecentSelection.dataSet.y) !== 1
        }

         // this selection is horizontal if adjacent cells have the same y value
         const isHorizontal = secondMostRecentSelection.dataSet.y === mostRecentSelection.dataSet.y

         if(isHorizontal){
             return Math.abs(target.dataSet.x - mostRecentSelection.dataSet.x) !== 1
        }

        //  we dont allow diagnal selections
        return true

    }

    const handleNewSelection = (selectedElement) => {
        state.selectedCells.forEach(
            (cell) => {
                cell.classList.remove('selected')
            }
        )
        state.selectedCells = []
        makeSelection(selectedElement)
        selectedElement.classList.add('selected')
    }

    const extendSelectionWith = (nextElement) => {
        makeSelection(nextElement)
        nextElement.classList.add('selected')
    }

    gridRoot.addEventListener('click', (e) => {
        console.log({ target: e.target.textContent, x: e.target.dataSet.x, y: e.target.dataSet.y })

        if (isNewSelection(e.target)) {
            console.log('handle new selecion')
            // clear existing selections
            handleNewSelection(e.target)
            return
        }

        if (e.target !== state.selectedCells[state.selectedCells.length - 1]) {
            extendSelectionWith(e.target)
        }
    })

    if (document.createElement("template")) {
        const template = document.querySelector('#cell');

        if (!template) {
            throw new Error('template not found')
        }

        board.forEach(
            ({ letter, x, y }) => {
                const cell = template.content.cloneNode(true);

                const cellText = cell.querySelector("#cell-text")

                if (!cellText) {
                    throw new Error('not Found')
                }

                cellText.textContent = letter

                cellText.dataSet = {}

                cellText.dataSet.x = x

                cellText.dataSet.y = y

                gridRoot.appendChild(cellText)
            }
        )
    }
})

