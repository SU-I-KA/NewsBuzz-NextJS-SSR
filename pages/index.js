import Head from 'next/head'
import Nav from '../components/Nav'
import fetch from 'node-fetch'
import NewsList from '../components/NewsList'

import styles from '../styles/Home.module.css'

const Home = ({ data })=> {
  return (
    <>
      <Nav />
      <NewsList scroll={false} data={data}/>
    </>
  )
}

// This gets called on every request
export async function getServerSideProps({ query }) {
  let skip = query.skip || 0
  console.log(`skip: ${query.skip}`)
  const limit = 14;
  let data={}
  // TRY Fetching data from external API
  try{
    const res = await fetch(`http://80.240.21.204:1337/news?skip=${skip}&limit=${limit}`)
    data = await res.json()
    console.log(data)
  } catch (error) {
    console.log(`error: { message: ${error} }`)
  }

  // Pass data to the page via props
  return { props: { data } }
}

export default Home;