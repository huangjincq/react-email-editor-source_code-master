import en from './en'

const useTranslation = () => {
  const t = (key, metaTag) => {
    let translation = en[key]
    if (metaTag && metaTag instanceof Object) {
      Object.keys(metaTag).forEach((key) => {
        translation = translation.replace(`{{${key}}}`, metaTag[key])
      })
    }
    return translation || key
  }

  return { t }
}

export default useTranslation
