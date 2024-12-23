const getBlockConfigsList = (t) => {
  return [
    {
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
          children: [
            {
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
          ]
        }
      ]
    },
    {
      name: t('text'),
      key: 'text',
      text: t('text_content'),
      styles: {
        fontSize: 14,
        fontFamily: 'sans-serif',
        color: undefined,
        lineHeight: '140%',
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 12,
        paddingRight: 12,
        textAlign: 'left'
      }
    },
    {
      name: t('heading'),
      key: 'heading',
      text: t('heading_content'),
      type: 'h1',
      styles: {
        fontSize: 22,
        lineHeight: '140%',
        fontFamily: 'sans-serif',
        color: undefined,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 12,
        paddingRight: 12,
        textAlign: 'left',
        fontWeight: 'bold'
      }
    },
    {
      name: t('button'),
      key: 'button',
      text: t('button'),
      type: 'link',
      linkURL: '',
      contentStyles: {
        textAlign: 'center',
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 12,
        paddingRight: 12
      },
      styles: {
        width: 'auto',
        fontSize: 12,
        lineHeight: '140%',
        borderRadius: 4,
        fontFamily: 'sans-serif',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#2faade',
        color: '#fff',
        display: 'inline-block'
      }
    },
    {
      name: t('divider'),
      key: 'divider',
      contentStyles: {
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 12,
        paddingRight: 12,
        textAlign: 'center'
      },
      styles: {
        width: '100%',
        borderTopStyle: 'solid',
        borderTopColor: '#ccc',
        borderTopWidth: 1,
        display: 'inline-block',
        verticalAlign: 'middle'
      }
    },
    {
      name: t('image'),
      key: 'image',
      src: '',
      alt: 'Image',
      type: 'link',
      linkURL: '',
      contentStyles: {
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 12,
        paddingRight: 12,
        textAlign: 'center'
      },
      styles: {
        width: 'auto'
      }
    },
    {
      name: t('social_link'),
      key: 'social_link',
      list: [
        {
          image: 'https://iili.io/HMnhdkN.png',
          title: 'facebook',
          linkURL: ''
        },
        {
          image: 'https://iili.io/J9qWqNV.png',
          title: 'Instagram',
          linkURL: ''
        },
        {
          image: 'https://iili.io/J9qWBDB.png',
          title: 'TikTok',
          linkURL: ''
        },
        {
          image: 'https://iili.io/J9qWnoP.png',
          title: 'Twitter',
          linkURL: ''
        }
      ],
      imageWidth: 32,
      contentStyles: {
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 12,
        paddingRight: 12,
        textAlign: 'left'
      },
      styles: {
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 6,
        paddingRight: 6
      }
    }
  ]
}

export default getBlockConfigsList
