import mainLogo from "../assets/moon-transparent.png"

export default function Home({ user }) {

  return (
    <div className="home">
      <h1>Welcome To Your</h1>
      <img src={mainLogo} alt="rocket to bitcoin" />
      <h1>{`Ports${user ? `, ${user.username}`: '' }`}</h1>
    </div>
  )
}
