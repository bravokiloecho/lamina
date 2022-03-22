import { SerializedLayer } from 'src/types'
import * as LAYERS from '../vanilla'

function getPropsFromLayer(layer: SerializedLayer) {
  // @ts-ignore
  const constructor = LAYERS[layer.constructor]
  const instance = new constructor()
  let props = ''
  Object.entries(layer.properties).forEach(([key, val]) => {
    const defaultVal = constructor['u_' + key] ?? instance[key]

    switch (key) {
      case 'name':
        if (val !== layer.constructor) props += ` ${key}={${JSON.stringify(val)}}`
        break

      case 'visible':
        if (!val) props += ` ${key}={${JSON.stringify(val)}}`
        break

      default:
        if (val !== defaultVal) props += ` ${key}={${JSON.stringify(val)}}`
        break
    }
  })

  return props
}

export function serializedLayersToJSX(layers: SerializedLayer[], material: SerializedLayer) {
  const materialProps = getPropsFromLayer(material)

  const jsx = `
    <LayerMaterial${materialProps}>
      ${layers
        .map((layer) => {
          const props = getPropsFromLayer(layer)
          return `<${layer.constructor}${props} />`
        })
        .join('\n\t')}
    </LayerMaterial>
    `

  return jsx
}

export function downloadObjectAsJson(exportObj: object, exportName: string) {
  var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj))
  var downloadAnchorNode = document.createElement('a')
  downloadAnchorNode.setAttribute('href', dataStr)
  downloadAnchorNode.setAttribute('download', exportName + '.lamina')
  document.body.appendChild(downloadAnchorNode) // required for firefox
  downloadAnchorNode.click()
  downloadAnchorNode.remove()
}
