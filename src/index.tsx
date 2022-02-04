import * as React from 'react'
import { extend, Node } from '@react-three/fiber'
import mergeRefs from 'react-merge-refs'
import * as LAYERS from './vanilla'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      layerMaterial: Node<LAYERS.LayerMaterial, typeof LAYERS.LayerMaterial>
      base_: Node<LAYERS.Base, typeof LAYERS.Base>
      depth_: Node<LAYERS.Depth, typeof LAYERS.Depth>
      fresnel_: Node<LAYERS.Fresnel, typeof LAYERS.Fresnel>
      noise_: Node<LAYERS.Noise, typeof LAYERS.Noise>
    }
  }
}

extend({
  LayerMaterial: LAYERS.LayerMaterial,
  Base_: LAYERS.Base,
  Depth_: LAYERS.Depth,
  Fresnel_: LAYERS.Fresnel,
  Noise_: LAYERS.Noise,
})

export type LayerMaterialProps = JSX.IntrinsicElements['layerMaterial'] & {
  children?: React.ReactNode
}

const LayerMaterial = React.forwardRef(({ children, ...props }: LayerMaterialProps, forwardRef) => {
  const ref = React.useRef<LAYERS.LayerMaterial>(null!)
  React.useLayoutEffect(() => {      
    Object.assign(ref.current, LAYERS.LayerMaterial.constructShader({ layers: (ref.current as any).__r3f.objects }))
    ref.current.uniformsNeedUpdate = true
    ref.current.needsUpdate = true
  }, [children])

  return (
    <layerMaterial ref={mergeRefs([ref, forwardRef])} {...props}>
      {children}
    </layerMaterial>
  )
})

const Base = React.forwardRef((props: JSX.IntrinsicElements['base_'], forwardRef) => {
  return <base_ ref={forwardRef as any} {...props} />
})

const Depth = React.forwardRef((props: JSX.IntrinsicElements['depth_'], forwardRef) => {
  return <depth_ ref={forwardRef as any} {...props} />
})

const Fresnel = React.forwardRef((props: JSX.IntrinsicElements['fresnel_'], forwardRef) => {
  return <fresnel_ ref={forwardRef as any} {...props} />
})

const Noise = React.forwardRef((props: JSX.IntrinsicElements['noise_'], forwardRef) => {
  return <noise_ ref={forwardRef as any} {...props} />
})

export { LayerMaterial, Base, Depth, Fresnel, Noise }
