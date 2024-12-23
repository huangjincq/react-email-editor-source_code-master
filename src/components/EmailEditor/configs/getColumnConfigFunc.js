const getColumnConfigFunc = (t) => {
  return (item) => {
    const contentConfig = {
      name: t('drag_block_here'),
      key: 'empty',
      width: '100%',
      styles: {
        backgroundColor: 'transparent',
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0
      }
    }

    return {
      name: t('column'),
      key: 'column',
      type: 'full',
      styles: {
        backgroundColor: 'transparent',
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
        contentBackground: '#fff'
      },
      children: [
        {
          name: t('content'),
          key: 'content',
          width: '100%',
          styles: {
            backgroundColor: 'transparent',
            paddingTop: 0,
            paddingLeft: 0,
            paddingRight: 0,
            paddingBottom: 0,
            contentBackground: 'transparent'
          },
          children: [item ? item : contentConfig]
        }
      ]
    }
  }
}

export default getColumnConfigFunc
