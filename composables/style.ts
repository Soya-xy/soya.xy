export function useTheme() {
  let index = 0
  const theme = useState('theme', () => 'default')
  const themeList = ['default', 'light', 'sepia']
  function switchTheme() {
    index++
    theme.value = themeList[index]
    if (index >= themeList.length)
      index = 0
  }

  return {
    theme,
    switchTheme,
  }
}
