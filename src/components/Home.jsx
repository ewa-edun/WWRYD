import { Link } from "react-router-dom"


function Home() {
    return (
      <>
        <h1>Home</h1>
        <p>
            The introduction page. gonna include card components of the 6 charcters with links to them.
        </p>
        <Link to="/tony-stark" >Tony Stark</Link> <br />
        <Link to="/jensen-huang" >Jensen Huang</Link> <br />
        <Link to="/manmohan-singh" >Manmohan Singh</Link> <br />
        <Link to="/hedy-lamarr" >Hedy Lamarr</Link> <br />
        <Link to="/marie-curie" >Marie Curie</Link> <br />
        <Link to="/princess-diana" >Princess Diana</Link> <br />
      </>
    )
  }
  
  export default Home