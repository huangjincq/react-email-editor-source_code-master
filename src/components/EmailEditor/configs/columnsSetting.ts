const defaultStyles = {
  textAlign: 'center',
  paddingTop: 12,
  paddingBottom: 12,
  paddingLeft: 12,
  paddingRight: 12
}

const columnsSetting: { [key: string]: any } = {
  full: {
    columns: 1,
    type: 'full',
    children: [
      {
        name: 'Drag block here',
        propValue: '100%',
        styles: defaultStyles,
        key: 'empty'
      }
    ]
  },
  '1-1': {
    columns: 2,
    type: '1-1',
    children: Array.from({ length: 2 }).map(() => {
      return {
        name: 'Content',
        key: 'content',
        propValue: '50%',
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
            name: 'Drag block here',
            key: 'empty',
            styles: defaultStyles
          }
        ]
      }
    })
  },
  '1-1-1': {
    columns: 3,
    type: '1-1-1',
    children: Array.from({ length: 3 }).map(() => {
      return {
        name: 'Content',
        key: 'content',
        propValue: '33.3%',
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
            name: 'Drag block here',
            key: 'empty',
            styles: defaultStyles
          }
        ]
      }
    })
  },
  '1-1-1-1': {
    columns: 4,
    type: '1-1-1-1',
    children: Array.from({ length: 4 }).map(() => {
      return {
        name: 'Content',
        key: 'content',
        propValue: '25%',
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
            name: 'Drag block here',
            key: 'empty',
            styles: defaultStyles
          }
        ]
      }
    })
  },
  '1-2': {
    columns: 2,
    type: '1-2',
    children: Array.from({ length: 2 }).map((item, index) => {
      return {
        name: 'Content',
        key: 'content',
        propValue: index === 0 ? '33.3%' : '66.6%',
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
            name: 'Drag block here',
            key: 'empty',
            styles: defaultStyles
          }
        ]
      }
    })
  },
  '2-1': {
    columns: 2,
    type: '2-1',
    children: Array.from({ length: 2 }).map((item, index) => {
      return {
        name: 'Content',
        key: 'content',
        propValue: index === 0 ? '66.6%' : '33.3%',
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
            name: 'Drag block here',
            key: 'empty',
            styles: defaultStyles
          }
        ]
      }
    })
  },
  '2-4-2-4': {
    columns: 4,
    type: '2-4-2-4',
    children: Array.from({ length: 4 }).map((item, index) => {
      return {
        name: 'Content',
        key: 'content',
        propValue: index % 2 === 0 ? '16.6%' : '33.3%',
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
            name: 'Drag block here',
            key: 'empty',
            styles: defaultStyles
          }
        ]
      }
    })
  },
  '4-2-4-2': {
    columns: 4,
    type: '4-2-4-2',
    children: Array.from({ length: 4 }).map((item, index) => {
      return {
        name: 'Content',
        key: 'content',
        propValue: index % 2 === 0 ? '33.3%' : '16.6%',
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
            name: 'Drag block here',
            key: 'empty',
            styles: defaultStyles
          }
        ]
      }
    })
  }
}

export default columnsSetting
