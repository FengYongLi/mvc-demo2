import $ from 'jquery'
import '/app3.css'

const $square = $('#app3 .square')

$square.on('click', () => {
  //$square.addClass('active')
  // 这时jquery内置的一个方法
  // 如果有active就删除，如果没有就添加
  // 这样可以控制点击左右易懂
  $square.toggleClass('active')
})