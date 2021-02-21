const month = ['january', 'febuary', 'March', 'April', 'May', 'Juny', 'July', 'August', 'August', 'September', 'October', 'November', 'December']

const MonthUpComing = (mountMonth) => {
  const current = new Date()
  const resultMonth = []
  for (let i = 0; i < mountMonth; i++) {
    current.setMonth(current.getMonth() + 1)
    const nextMonth = current.getMonth().toLocaleString()
    resultMonth.push(month[nextMonth])
  }
  return resultMonth
}

export { MonthUpComing }
