import './app1.css'
import $ from 'jquery'

const eventBus = $({})

const m = {
  data: {
    n: parseInt(localStorage.getItem('xxx'))
  },
  create() { },
  delete() { },
  update(data) {
    Object.assign(m.data, data)
    eventBus.trigger('m:updated')
    localStorage.setItem('xxx', m.data.n)
    console.log(m.data.n)
  },
  get() { }
}
const v = {
  xxx: null,
  html: `
    <div class="output">
      <span id="number">{{n}}</span>
    </div>
    <div class="actions">
      <button id="add1">+1</button>
      <button id="minus1">-1</button>
      <button id="mul2">*2</button>
      <button id="divide2">÷2</button>
    </div>
  `,
  init(container) {
    v.xxx = $(container)
  },
  render(n) {
    if (v.xxx.children.length !== 0) v.xxx.empty()
    $(v.html.replace('{{n}}', n))
      .prependTo($(v.xxx))
  }
}

const c = {
  init(container) {
    v.init(container)
    v.render(m.data.n)
    c.autoBindEvents()
    // 在 container 这里监听
    eventBus.on('m:updated', () => {
      v.render(m.data.n)
    })
  },

  events: {
    'click #add1': 'add',
    'click #minus1': 'minus',
    'click #mul2': 'mul',
    'click #divide2': 'div',
  },
  add() {
    //m.data.n += 1
    //v.render()
    // 这里就是就是 m.update()下的 n 就变成 m.data.n + 1
    m.update({ n: m.data.n + 1 })
  },
  minus() {
    //m.data.n -= 1
    //v.render()
    m.update({ n: m.data.n - 1 })
  },
  mul() {
    //m.data.n *= 2
    //v.render()
    m.update({ n: m.data.n * 2 })
  },
  div() {
    //m.data.n /= 2
    //v.render()
    m.update({ n: m.data.n / 2 })
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