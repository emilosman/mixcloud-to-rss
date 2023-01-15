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
        <h1> Mixcloud to RSS</h1>
        <label htmlFor="username">Enter a Mixcloud username below:</label>
        <input type="text" id="username" name="username" required  placeholder='example: hobocan'/>
        <button type="submit">Submit</button>
        <a href="https://github.com/emilosman/mixcloud-to-rss">github</a>
      </form>
    </>
  )
}
