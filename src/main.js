let player_X = document.querySelector('#player-X')
let player_O = document.querySelector('#player-O')
const player_X_background_color = '#323030'
const player_O_background_color = '#827878'
const palyer_X_color = '#b7b7b7'
const palyer_O_color = '#f5f5f7'
const scale_normal = '90%'
const scale_down = '85%'
const scale_up = '105%'
const delay_wining_alert = 150

player_X.style.backgroundColor = player_X_background_color
player_O.style.backgroundColor = player_O_background_color

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

let is_game_active = true
let current_player = 'X'
let board_state = [
  '', '', '',
  '', '', '',
  '', '', ''
]

function handleBoxClick(event) {
  const box_clicked = event.target
  const box_clicked_index = Number(box_clicked.getAttribute('data-index'))

  if (board_state[box_clicked_index] !== '' || !is_game_active) return

  handleBoxChange(box_clicked, box_clicked_index)

  console.log(board_state.every(box => box))

  if (handleCheckWin()) {
    setTimeout(() => {
      alert(`${current_player} menang`)
      handleRestart()
    }, delay_wining_alert)
  } else if (board_state.every((box) => box)) {
    setTimeout(() => {
      alert(`Permainan seri`)
      handleRestart()
    }, delay_wining_alert)
  } else {
    handlePlayerChange()
  }
}

function handleBoxChange(box_clicked, box_clicked_index) {
  board_state[box_clicked_index] = current_player
  box_clicked.innerHTML = current_player
  box_clicked.innerHTML === 'X' ? box_clicked.style.color = palyer_X_color : box_clicked.style.color = palyer_O_color
}

function handlePlayerChange() {
  current_player = current_player === 'X' ? 'O' : 'X'
  if (current_player === 'X') {
    player_X.style.backgroundColor = player_X_background_color
    player_X.style.scale = scale_up
    player_O.style.backgroundColor = player_O_background_color
    player_O.style.scale = scale_down
  } else {
    player_O.style.backgroundColor = player_X_background_color
    player_O.style.scale = scale_up
    player_X.style.backgroundColor = player_O_background_color
    player_X.style.scale = scale_down
  }
  return current_player
}

function handleCheckWin() {
  const check = winning_pattern.find((pattern) => {
    const [a, b, c] = pattern
    return board_state[a] && board_state[a] === board_state[b] && board_state[a] === board_state[c]
  })

  if (check) {
    check.forEach((value) => {
      document.querySelector(`#box-${value}`).classList.add('box-win')
    })
    return true
  }

  return false
}

function handleRestart() {
  is_game_active = true
  current_player = 'X'
  board_state = [
    '', '', '',
    '', '', '',
    '', '', ''
  ]
  player_X.style.backgroundColor = player_X_background_color
  player_X.style.scale = scale_normal
  player_O.style.backgroundColor = player_O_background_color
  player_O.style.scale = scale_normal
  document.querySelectorAll('.box-item').forEach((box) => box.classList.remove('box-win'))
  document.querySelectorAll('.box-item').forEach((box) => box.innerHTML = '')
}

document.querySelectorAll('.box-item').forEach((box) => box.addEventListener('click', handleBoxClick))
document.querySelector('.restart').addEventListener('click', handleRestart)