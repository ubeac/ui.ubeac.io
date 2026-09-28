window.theme = {
  chart: {
    bg: 'rgba(255,255,255,0)',
    tooltipBg: '#ffffff',
    titleColor: '#333333',
    labelColor: '#333333',
    colors: ['#65BF7C', '#9B3A3A','#0084D6', '#2B6D5F', '#E04343', '#CD6A2B', '#F5A623', '#9D6BCA', '#C02F6B', '#6C7B96'],
    plotLineColor: 'rgba(180, 180, 180, .1)',
    axisLineColor: 'rgba(180, 180, 180, .1)',
    gaugePane: {
      borderColor: '#ffffff',
      backgroundColor: '#f4f4f4'
    }
  },
  googleMap: []
}
window.dispatchEvent(new Event('updateTheme'))
