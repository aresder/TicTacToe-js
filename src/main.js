document.querySelectorAll('.box-item').forEach((box) => box.addEventListener('click', handleBoxClick))
document.querySelector('.restart').addEventListener('click', handleRestart)

let player_X = document.querySelector('#player-X')
let player_O = document.querySelector('#player-O')
player_X.style.backgroundColor = '#827878'
player_O.style.backgroundColor = '#323030'


let is_game_active = true
let current_player = 'X'
let board_state = [
  '', '', '',
  '', '', '',
  '', '', ''
]

const winning_pattern = [
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
  const box_clicked = e.target
  const box_clicked_index = Number(box_clicked.getAttribute('data-index'))

  if (board_state[box_clicked_index] !== '' || !is_game_active) return

  handleBoxPlayed(box_clicked, box_clicked_index)
  handlePlayerChange()
}

function handleBoxPlayed(box_clicked, box_clicked_index) {
  board_state[box_clicked_index] = current_player
  box_clicked.innerHTML = current_player
  console.log(board_state)
}

function handlePlayerChange() {
  current_player = current_player === 'X' ? 'O' : 'X'

  if (current_player === 'X') {
    player_X.style.backgroundColor = '#827878'
    player_O.style.backgroundColor = '#323030'
  } else {
    player_O.style.backgroundColor = '#827878'
    player_X.style.backgroundColor = '#323030'
  }
}

function handleRestart() {
  is_game_active = true
  current_player = 'X'
  board_state = [
    '', '', '',
    '', '', '',
    '', '', ''
  ]
  player_X.style.backgroundColor = '#827878'
  player_O.style.backgroundColor = '#323030'
  document.querySelectorAll('.box-item').forEach((box) => box.innerHTML = '')
  console.log(board_state)
}