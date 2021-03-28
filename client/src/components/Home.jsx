import mainLogo from "../assets/moon-transparent.png"

export default function Home({ cheers }) {

  return (
    <div className="home">
      <h1>Welcome To Your</h1>
      <img src={mainLogo} alt="rocket to bitcoin" />
      <h1>Ports</h1>
    </div>
  )
}
