import { InputNumber } from 'antd'

const PaddingSettings = ({ padding, setPadding }: { padding: any; setPadding: any }) => {
  const paddingChange = (key: string, value: number) => {
    const newPadding = { ...padding, [key]: value }
    setPadding(newPadding)
  }
  return (
    <div className="padding-settings">
      {[
        { label: 'Top', value: 'paddingTop' },
        { label: 'Right', value: 'paddingRight' },
        { label: 'Left', value: 'paddingLeft' },
        { label: 'Bottom', value: 'paddingBottom' }
      ].map(({ label, value }) => {
        const style = padding[value]
        return (
          <div key={value}>
            <div>{label}</div>
            <InputNumber
              className="width-full"
              addonAfter="px"
              min={0}
              value={style}
              onChange={(val) => paddingChange(value, val)}
            />
          </div>
        )
      })}
    </div>
  )
}

export default PaddingSettings
