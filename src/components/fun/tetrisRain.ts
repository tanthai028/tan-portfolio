/** Easter egg: drops one of each Tetris piece down the screen, then cleans up. */

const PIECES: { cells: [number, number][]; color: string }[] = [
  { cells: [[0, 0], [1, 0], [2, 0], [3, 0]], color: '#5fb8c4' }, // I
  { cells: [[0, 0], [1, 0], [0, 1], [1, 1]], color: '#d9b84a' }, // O
  { cells: [[0, 0], [1, 0], [2, 0], [1, 1]], color: '#9a7cc0' }, // T
  { cells: [[1, 0], [2, 0], [0, 1], [1, 1]], color: '#7fae6e' }, // S
  { cells: [[0, 0], [1, 0], [1, 1], [2, 1]], color: '#c86b5f' }, // Z
  { cells: [[0, 0], [0, 1], [1, 1], [2, 1]], color: '#6f8fc4' }, // J
  { cells: [[2, 0], [0, 1], [1, 1], [2, 1]], color: '#d39a52' }, // L
]

const CELL = 18

function pieceElement(cells: [number, number][], color: string) {
  const el = document.createElement('div')
  el.setAttribute('aria-hidden', 'true')
  Object.assign(el.style, { position: 'absolute', top: '0', width: `${CELL * 4}px`, height: `${CELL * 2}px` })
  for (const [x, y] of cells) {
    const cell = document.createElement('span')
    Object.assign(cell.style, {
      position: 'absolute',
      left: `${x * CELL}px`,
      top: `${y * CELL}px`,
      width: `${CELL - 2}px`,
      height: `${CELL - 2}px`,
      borderRadius: '3px',
      background: color,
      boxShadow: 'inset 0 -3px 0 rgb(0 0 0 / 0.18)',
    })
    el.append(cell)
  }
  return el
}

export function dropTetrisPieces() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const layer = document.createElement('div')
  Object.assign(layer.style, { position: 'fixed', inset: '0', pointerEvents: 'none', zIndex: '60', overflow: 'hidden' })
  document.body.append(layer)

  const fall = window.innerHeight + CELL * 4
  const animations = PIECES.map(({ cells, color }, i) => {
    const el = pieceElement(cells, color)
    el.style.left = `${8 + ((i * 13 + Math.random() * 6) % 84)}%`
    layer.append(el)
    const turns = Math.floor(Math.random() * 4) * 90
    return el.animate(
      [
        { transform: `translateY(-${CELL * 3}px) rotate(0deg)` },
        { transform: `translateY(${fall}px) rotate(${turns}deg)` },
      ],
      { duration: 1600 + Math.random() * 900, delay: i * 140, easing: 'cubic-bezier(.55,0,.9,.6)', fill: 'forwards' },
    ).finished
  })

  Promise.all(animations).finally(() => layer.remove())
}
