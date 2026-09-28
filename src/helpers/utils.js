/* eslint-disable */
export default {
  hexToRgbA (hex, opacity) {
    var c
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('')
      if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]]
      }
      c = '0x' + c.join('')
      return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + `,${opacity})`
    }
    throw new Error('Bad Hex')
  },
  pSBC (p, c0, c1, l) {
    let r; let g; let b; let P; let f; let t; let h; let i = parseInt; let m = Math.round; let a = typeof (c1) === 'string'
    if (typeof (p) !== 'number' || p < -1 || p > 1 || typeof (c0) !== 'string' || (c0[0] != 'r' && c0[0] != '#') || (c1 && !a)) return null
    if (!this.pSBCr) {
      this.pSBCr = (d) => {
        let n = d.length; let x = {}
        if (n > 9) {
          [r, g, b, a] = d = d.split(','), n = d.length
          if (n < 3 || n > 4) return null
          x.r = i(r[3] == 'a' ? r.slice(5) : r.slice(4)), x.g = i(g), x.b = i(b), x.a = a ? parseFloat(a) : -1
        } else {
          if (n == 8 || n == 6 || n < 4) return null
          if (n < 6)d = '#' + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : '')
          d = i(d.slice(1), 16)
          if (n == 9 || n == 5)x.r = d >> 24 & 255, x.g = d >> 16 & 255, x.b = d >> 8 & 255, x.a = m((d & 255) / 0.255) / 1000
          else x.r = d >> 16, x.g = d >> 8 & 255, x.b = d & 255, x.a = -1
        } return x
      }
    }
    h = c0.length > 9, h = a ? c1.length > 9 ? true : c1 == 'c' ? !h : false : h, f = this.pSBCr(c0), P = p < 0, t = c1 && c1 != 'c' ? this.pSBCr(c1) : P ? { r: 0, g: 0, b: 0, a: -1 } : { r: 255, g: 255, b: 255, a: -1 }, p = P ? p * -1 : p, P = 1 - p
    if (!f || !t) return null
    if (l)r = m(P * f.r + p * t.r), g = m(P * f.g + p * t.g), b = m(P * f.b + p * t.b)
    else r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5), g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5), b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5)
    a = f.a, t = t.a, f = a >= 0 || t >= 0, a = f ? a < 0 ? t : t < 0 ? a : a * P + t * p : 0
    if (h) return 'rgb' + (f ? 'a(' : '(') + r + ',' + g + ',' + b + (f ? ',' + m(a * 1000) / 1000 : '') + ')'
    else return '#' + (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0)).toString(16).slice(1, f ? undefined : -2)
  },
  loadjscssfile (filename, filetype) {
    var fileref = null
    if (filetype === 'js') { // if filename is a external JavaScript file
      fileref = document.createElement('script')
      fileref.setAttribute('type', 'text/javascript')
      /* eslint-disable */
      fileref.setAttribute('src', filename + `?${VERSION}`)
      /* eslint-enable */
    } else if (filetype === 'css') { // if filename is an external CSS file
      fileref = document.createElement('link')
      fileref.setAttribute('rel', 'stylesheet')
      fileref.setAttribute('type', 'text/css')
      /* eslint-disable */
      fileref.setAttribute('href', filename + `?${VERSION}`)
      /* eslint-enable */
    }
    if (typeof fileref !== 'undefined') { document.getElementsByTagName('head')[0].appendChild(fileref) }
  },
  removejscssfile (filename, filetype) {
    var targetelement = (filetype === 'js') ? 'script' : (filetype === 'css') ? 'link' : 'none' // determine element type to create nodelist from
    var targetattr = (filetype === 'js') ? 'src' : (filetype === 'css') ? 'href' : 'none' // determine corresponding attribute to test for
    var allsuspects = document.getElementsByTagName(targetelement)
    for (var i = allsuspects.length; i >= 0; i--) { // search backwards within nodelist for matching elements to remove
      if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) !== null && allsuspects[i].getAttribute(targetattr).indexOf(filename) !== -1) { allsuspects[i].parentNode.removeChild(allsuspects[i]) } // remove element by calling parentNode.removeChild()
    }
  }
}
/* eslint-enable */
