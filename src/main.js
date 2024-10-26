let boardState = [
  '', '', '',
  '', '', '',
  '', '', ''
]
let currentPlayer = 'X'
let isGameActive = true

const winningPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function handleBoxClick(e) {
  const cellClicked = e.target
  const cellClickedIndex = Number(cellClicked.getAttribute('data-index'))

  if (boardState[cellClickedIndex] !== '' || !isGameActive) return

  handleBoxPlayed(cellClicked, cellClickedIndex)
  handlePlayerChange()
}

function handleBoxPlayed(cellClicked, cellClickedIndex) {
  boardState[cellClickedIndex] = currentPlayer
  cellClicked.innerHTML = currentPlayer
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
}

document.querySelectorAll('.box-item').forEach((box) => box.addEventListener('click', handleBoxClick))