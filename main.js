window.onload = function () {
  let translateItemsArr = [
    {title: 'offline-plugin', desc: 'Webpack的PWA插件', link: 'docs/offline-plugin/index.html'},
    {title: 'WebAssembly', desc: 'MDN文档的翻译', link: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/instantiate'}
  ]
  let projectItemsArr = [
    {title: '安全管理平台', desc: '传统Java Web开发', link: ''}
  ]
  let xmindsItemsArr = [
    { title: 'JS对象', desc: 'JS的对象关系图', link: 'xminds/Object.svg' },
    { title: 'JS原型链', desc: 'JS的原型链关系图', link: 'xminds/Prototype.svg' },
    { title: 'ServiceWorker', desc: 'SW内置对象概览', link: 'xminds/ServiceWorker.svg' }, 
    { title: 'VueJS', desc: 'Vue源码流程简析', link: 'xminds/VueFlow.svg' },
  ]
  let pptsItemsArr = [
    { title: 'JS对象', desc: 'JS的对象基础知识', link: 'ppts/Object.pptx' },
    { title: 'ServiceWorker', desc: 'SW基础知识', link: 'ppts/service-worker.svg' },
    { title: 'WebAssembly基础', desc: 'WebAssembly基础知识', link: 'ppts/WebAssembly-base.pptx' },
    { title: 'WebAssembly进阶', desc: 'WebAssembly进阶', link: 'ppts/WebAssembly-high.pptx' },
    { title: '微信小程序', desc: '微信小程序基础', link: 'ppts/sm-program.pdf'}
  ]
  let knowledgesItemsArr = [
    { title: '高效页面注意事项', desc: '高效页面注意事项', link: 'knowledges/efficient-page.html' }
  ]
  function get$itemArr (itemsArr) {
    return itemsArr.map(function (item) {
      let $item = document.createElement('div')
      $item.classList.add('item')
      let $itemTitle = document.createElement('div')
      $itemTitle.classList.add('item-title')
      $itemTitle.innerHTML = item.title
      let $itemBody = document.createElement('div')
      $itemBody.classList.add('item-body')
      $itemBody.innerHTML = item.desc
      $item.appendChild($itemTitle)
      $item.appendChild($itemBody)
      if (item.link) {
        $item.onclick = function () {
          let $a = document.createElement('a')
          $a.href = item.link
          $a.target = '_blank'
          $a.click()
        }
      }
      return $item
    })
  }
  let $translateItemsArr = get$itemArr(translateItemsArr)
  let $projectItemsArr = get$itemArr(projectItemsArr)
  let $xmindsItemsArr = get$itemArr(xmindsItemsArr)
  let $pptsItemsArr = get$itemArr(pptsItemsArr)
  let $knowledgesItemsArr = get$itemArr(knowledgesItemsArr)
  let $translations = document.querySelector('.translations')
  // let $projects = document.querySelector('.projects')
  let $xminds = document.querySelector('.xminds')
  let $ppts = document.querySelector('.ppts')
  let $knowledges = document.querySelector('.knowledges')
  $translateItemsArr.forEach(function ($item) {
    $translations.appendChild($item)
  })
  /* $projectItemsArr.forEach(function ($item) {
    $projects.appendChild($item)
  }) */
  $xmindsItemsArr.forEach(function ($item) {
    $xminds.appendChild($item)
  })
  $pptsItemsArr.forEach(function ($item) {
    $ppts.appendChild($item)
  })
  $knowledgesItemsArr.forEach(function ($item) {
    $knowledges.appendChild($item)
  })
}