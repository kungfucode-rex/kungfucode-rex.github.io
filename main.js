window.onload = function () {
  let translateItemsArr = [
    {title: 'offline-plugin', desc: 'Webpack的PWA插件', link: 'docs/offline-plugin/index.html'},
    {title: 'WebAssembly', desc: 'MDN文档的翻译', link: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/instantiate'}
  ]
  let projectItemsArr = [
    {title: '安全管理平台', desc: '传统Java Web开发', link: ''}
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
  let $translations = document.querySelector('.translations')
  let $projects = document.querySelector('.projects')
  $translateItemsArr.forEach(function ($item) {
    $translations.appendChild($item)
  })
  $projectItemsArr.forEach(function ($item) {
    $projects.appendChild($item)
  })
}