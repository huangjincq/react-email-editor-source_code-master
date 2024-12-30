const createStyleString = (styles) => {
  const regex = new RegExp(/[A-Z]/g)
  const kebabCase = (str) => str.replace(regex, (v) => `-${v.toLowerCase()}`)

  let styleConfig = ''

  for (let item of Object.entries(styles)) {
    if (item[1] && item[0] !== 'contentBackground') {
      styleConfig += `${kebabCase(item[0])}:${typeof item[1] === 'number' ? item[1] + 'px' : item[1]};`
    }
  }

  return styleConfig
}

const createStyleTag = (list, styles = '') => {
  const newBlockList = list.map((item, index) => {
    let newItem = item
    newItem.styleConfig = createStyleString(item.styles)

    if (newItem.contentStyles) {
      newItem.contentStyleConfig = createStyleString(item.contentStyles)
    }

    if (item.styles.contentBackground) {
      newItem.contentStyleConfig = `background-color:${item.styles.contentBackground};`
    }

    if (item.children?.length) {
      const { newBlockList: childrenList, styles: childrenStyles } = createStyleTag(item.children, styles)
      styles += childrenStyles
      newItem.children = childrenList
    }

    return {
      ...newItem
    }
  })

  return {
    newBlockList: newBlockList,
    styles: styles
  }
}

const createImageString = (imageConfig) => {
  return `<div style="${imageConfig.contentStyleConfig}">
      <img src="${imageConfig.src}" alt="${imageConfig.alt}" style="max-width:100%;${imageConfig.styleConfig}" /> 
  </div>`
}

const createTextString = (textBlock) => {
  return `<div style="${textBlock.styleConfig}">${textBlock.text}</div>`
}

const createHeaderString = (headerBlock) => {
  return `<${headerBlock.type} style="${headerBlock.styleConfig}">
  ${headerBlock.text}
  </${headerBlock.type}>`
}

const createButtonString = (buttonBlock) => {
  return `<div style="${buttonBlock.contentStyleConfig}">
    <a style="${buttonBlock.styleConfig}" target="_black" href="https://${buttonBlock.linkURL}">${buttonBlock.text}</a>
  </div>`
}

const createDividerString = (dividerBLock) => {
  return `<div style="${dividerBLock.contentStyleConfig}">
    <div style="${dividerBLock.styleConfig}"></div>
  </div>`
}

const createInfoString = (info) => {
  return `<div style="${info.propValue.contentStyleConfig}">
  <table style="width:100%;margin:0 auto;">
    <tbody>
    ${info.propValue.dataSource.map(({ displayName, fieldId }) => `<tr><td style="width: ${((info.propValue.labelSpan / 24) * 100).toFixed(2)}%;font-weight:bold">${displayName}: </td><td>${fieldId}</td></tr>`).join('')}
    </tbody>
  </table>
</div>`
}

const blockListToHtml = (blockList, bodySettings) => {
  let content = ''
  blockList.forEach((item) => {
    if (item.key === 'column') {
      content += `<div style="${item.styleConfig};width:100%;display:block;">
        <table style="width:100%;max-width:${bodySettings.contentWidth}px;margin:0 auto;${item.contentStyleConfig}">
      <tbody><tr>${blockListToHtml(item.children)}</tr></tbody>
       </table></div>`
    }

    if (item.key === 'content') {
      content += `<td style="width:${item.propValue}; ${item.styleConfig}">${blockListToHtml(item.children)}</td>`
    }

    if (item.key === 'text') {
      content += createTextString(item)
    }

    if (item.key === 'heading') {
      content += createHeaderString(item)
    }

    if (item.key === 'image') {
      content += createImageString(item)
    }

    if (item.key === 'button') {
      content += createButtonString(item)
    }

    if (item.key === 'divider') {
      content += createDividerString(item)
    }

    if (item.key === 'info') {
      content += createInfoString(item)
    }
  })

  return content
}

const dataToHtml = ({ bodySettings, blockList }) => {
  let content = ''
  const { newBlockList, styles } = createStyleTag(blockList)
  content = blockListToHtml(newBlockList, bodySettings)
  return `<html>
  <head>
  <meta charset="UTF-8">
  <title>email</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style type="text/css">
  *{
    margin: 0;
    padding: 0;
    border: none;
    box-sizing: border-box;
  }

  html,body {
    height:100%;
    overflow-y:auto;
  }

  table {
    width: 100%;
    color:unset;
  }

  table, tr, td {
    vertical-align: top;
    border-collapse: collapse;
 }

  h1,h2,h3,h4 {
    display: block;
    margin-block-start: 0px;
    margin-block-end: 0px;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }

  @media(max-width:620px){
    td {
      display:inline-block;
      width:100% !important;
    }
  }
  ${styles}
</style>
  </head>
  <body>
  <div style="opacity:0;">${bodySettings.preHeader}</div>
  <div style="background-color:${bodySettings.styles.backgroundColor};color:${bodySettings.styles.color}; font-family:${bodySettings.styles.fontFamily};"> ${content}</div>
  </body>
  </html>`
}

export default dataToHtml
