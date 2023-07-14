function selectPage() {
  return {
    values: {
      config: {},
      titulo: '',
      texto: '',
      imagem: '',
      bgColor: '',
      bgVideo: '',
    },
    refs: {
      jsonConf: document.querySelector('textarea'),
      title: document.querySelector('#title'),
      text: document.querySelector('#text'),
      img: document.querySelector('#img'),
      bgColor: document.querySelector('#bgColor'),
      bgVideo: document.querySelector('#bgVideo'),
      preview: document.querySelector('iframe'),
      play: document.querySelector('#play'),
      pause: document.querySelector('#pause'),
      replay: document.querySelector('#replay'),
      toggle: document.querySelector('#toggle'),
    },
    resizeFrame(width, height) {
      this.refs.preview.width = width
      this.refs.preview.height = height
    },
    sendData() {
      const target = this.refs.preview.contentWindow
      target.postMessage(this.values, '*')
    },
    hydrate() {
      const target = this.refs.preview.contentWindow
      const item = {
        titulo: this.values.titulo,
        texto: this.values.texto,
        imagem: this.values.imagem,
        bgColor: this.values.bgColor,
        bgVideo: this.values.bgVideo,
      }
      target.postMessage({item}, '*')
    }
  }
}

const page = selectPage()

page.refs.play.addEventListener('click', () => {
  const win = page.refs.preview.contentWindow
  win.postMessage('play', '*')
})

page.refs.pause.addEventListener('click', () => {
  const win = page.refs.preview.contentWindow
  win.postMessage('pause', '*')
})

page.refs.replay.addEventListener('click', () => {
  const win = page.refs.preview.contentWindow
  win.postMessage('replay', '*')
})

page.refs.toggle.addEventListener('click', () => {
  const win = page.refs.preview.contentWindow
  win.postMessage('toggle', '*')
})

page.refs.jsonConf.addEventListener('change', (ev) => {
  try {
    const value = JSON.parse(ev.target.value)
    page.values.config = value
    console.log(page.values.config)
    page.resizeFrame(value.width, value.height)
    page.sendData()
  } catch (err) {
    console.warn(err)
  }
})

page.refs.title.addEventListener('change', (ev) => {
  try {
    const value = ev.target.value
    page.values.titulo = value
    page.hydrate()
  } catch (err) {
    console.warn(err)
  }
})

page.refs.text.addEventListener('change', (ev) => {
  try {
    const value = ev.target.value
    page.values.texto = value
    page.hydrate()
  } catch (err) {
    console.warn(err)
  }
})

page.refs.bgColor.addEventListener('change', (ev) => {
  try {
    const value = ev.target.value
    if (value.length) {
      page.values.bgColor = value
      page.hydrate()
    }
  } catch (err) {
    console.warn(err)
  }
})

page.refs.bgVideo.addEventListener('change', (ev) => {
  try {
    const value = ev.target.value
    page.values.bgVideo = value
    page.hydrate()
  } catch (err) {
    console.warn(err)
  }
})

page.refs.img.addEventListener('change', (ev) => {
  try {
    const value = ev.target.value
    page.values.imagem = value
    page.hydrate()
  } catch (err) {
    console.warn(err)
  }
})

window.addEventListener('message', (ev) => {
  if (ev.data && ev.data === 'load') {
    console.log('iframe loaded')
    page.sendData()
  }
})

