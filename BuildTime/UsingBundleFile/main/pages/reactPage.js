import { useState, useEffect } from 'react'
import loadable from '@loadable/component'

const ReactPage = () => {
  const [AppComponent, setAppComponent] = useState()

  useEffect(() => {
    // useEffect를 통해 window 가 로드 된 후 import
    setAppComponent(loadable(() => import('../dist/app')))
  }, [])

  return <>{AppComponent && <AppComponent />}</>
}
export default ReactPage
