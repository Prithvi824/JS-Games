import Nav from './components/nav'
import { Outlet } from 'react-router-dom'


function Skeleton() {
  return (
    <>
      <Nav leftIcon='console.svg' leftName='Console' rightName={["Games", "Users", "Creator"]}/>
      <Outlet />
      <div>
        
      </div>
    </>
  )
}

export default Skeleton
