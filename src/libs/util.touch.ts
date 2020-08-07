const MIN_DISTANCE = 10

function getDirection(x: number, y: number) {
  console.log(x, y)

  if (x > y && x > MIN_DISTANCE) {
    return 'horizontal'
  }

  if (y > x && y > MIN_DISTANCE) {
    return 'vertical'
  }

  return ''
}

class TouchUtil {
  startX: number = 0
  startY: number = 0
  deltaX: number = 0
  deltaY: number = 0
  offsetX: number = 0
  offsetY: number = 0
  direction: string = ''

  touchStart(event: TouchEvent) {
    this.resetTouchStatus()
    this.startX = event.touches[0].clientX
    this.startY = event.touches[0].clientY
  }

  touchMove(event: TouchEvent) {
    const touch = event.touches[0]
    this.deltaX = touch.clientX - this.startX
    this.deltaY = touch.clientY - this.startY
    this.offsetX = Math.abs(this.deltaX)
    this.offsetY = Math.abs(this.deltaY)
    this.direction = this.direction || getDirection(this.offsetX, this.offsetY)
  }

  resetTouchStatus() {
    this.direction = ''
    this.startX = 0
    this.startY = 0
    this.offsetX = 0
    this.offsetY = 0
  }
}

export default new TouchUtil()
