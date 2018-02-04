window.onload = function () {
  let translateItemsArr = [
    {title: 'offline-plugin', desc: 'Webpack的PWA插件', link: 'docs/offline-plugin/index.html'},
    {title: 'WorkBox', desc: 'WorkBox 中文文档', link: 'docs/WorkBox/index.html'},
    {title: 'ReactiveX-rxjs', desc: 'ReactiveX/rxjs 中文文档', link: 'docs/ReactiveX-rxjs/index.html'}
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