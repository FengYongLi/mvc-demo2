import './app2.css'
import $ from 'jquery'

const eventBus = $({})
const localKey = 'yyy'
const m = {
  data: {
    index: parseInt(localStorage.getItem('yyy')) || 0
  },
  create() { },
  delete() { },
  update(data) {
    Object.assign(m.data, data)
    eventBus.trigger('m:updated')
    localStorage.setItem('index', m.data.index)
  },
  get() { }
}

const v = {
  xxx: null,
  html: (index) => {
    return `
    <ol class="tabBar">
      <li class="${index === 0 ? 'selected' : ''}" data-index="0"><span>left</span></li>
      <li class="${index === 1 ? 'selected' : ''}" data-index="1"><span>right</span></li>
    </ol>
    <ol class="tabContent">
      <li class="${index === 0 ? 'active' : ''}">内容1</li>
      <li class="${index === 1 ? 'active' : ''}">内容2</li>
    </ol>
  `},
  init(container) {
    v.xxx = $(container)
  },
  render(index) {
    if (v.xxx.children.length !== 0) v.xxx.empty()
    $(v.html(index)).prependTo($(v.xxx))
  }
}

const c = {
  init(container) {
    v.init(container)
    v.render(m.data.index) // view = render(data)
    c.autoBindEvents()
    // 在 container 这里监听
    eventBus.on('m:updated', () => {
      v.render(m.data.index)
    })
  },

  events: {
    'click .tabBar li': 'bar'
  },
  bar(e) {
    const index = parseInt(e.currentTarget.dataset.index)
    m.update({ index: index })
  },
  autoBindEvents() {
    for (let key in c.events) {
      const value = c[c.events[key]]
      const spaceIndex = key.indexOf(' ')
      const x1 = key.slice(0, spaceIndex)
      const x2 = key.slice(spaceIndex + 1)
      //console.log(x1, x2, value)
      v.xxx.on(x1, x2, value)
    }
  }
}

export default c



