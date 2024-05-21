import { Link } from "react-router-dom"

function Dashboard() {
  return (
    <div className="flex flex-1 w-[100vw] h-[100vh] justify-center items-center" >
      <div className="flex flex-col gap-y-4">
        <Link to={'/buyer'} >Buy</Link>
        <Link to={'/seller'} >Sell</Link>
        <Link to={'/my-post'} >View Your Posts</Link>
      </div>
    </div>
  )
}

export default Dashboard