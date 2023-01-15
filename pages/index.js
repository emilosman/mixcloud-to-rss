import styles from '../styles/Home.module.css'

export default function Home() {
  const handleSubmit = async (event) => {
    event.preventDefault()
    const username = event.target.username.value;
    console.log(username)
    window.location.href = '/feeds/' + username;
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="username">Enter the Mixcloud username</label>
        <input type="text" id="username" name="username" required />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}
