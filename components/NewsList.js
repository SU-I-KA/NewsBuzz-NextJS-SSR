import React, { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import {FaRss, FaArrowCircleUp} from 'react-icons/fa'
import styles from '../styles/News.module.css'
import Loading from './Loading'
import ScrollToTop from 'react-scroll-up';


let skipSteps = 14;
const NewsList = ({ data }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [news, setNews] = useState([])
  const [skip, setSkip] = useState(skipSteps)
  const [scrollState, setScrollState] = useState(0)
  const limit = 14;
  

  const fetchNews = async () => {
    setLoading(true)
    setNews((oldNews) => {
      if (skip === 0) {
        return data.news
      } else {
        return [...oldNews, ...data.news]
      }
    })
    setLoading(false)
  }

  useEffect(() => {
    fetchNews()
    window.scrollTo(0, scrollState)
    console.log(scrollState)
    // setSkip(skipSteps)
    console.log(skipSteps)
  }, [skipSteps])


  const handleScroll = () => {
    setScrollState(document.body.scrollHeight - 2)
    if (
      !loading && (window.innerHeight + window.scrollY) >=
      (document.body.scrollHeight - 2)
    ) {
      const query = router.query
      router.push({
        pathname: '/',
        query: {skip:skipSteps},
      }, '/')
      console.log(query)
      skipSteps = skipSteps + 14

      // setSkip((oldNews) => {
      //   return oldNews + 14
      // })
      
    }
  
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })
  
    
  return (
    <>
      <ScrollToTop style={{zIndex:150}} showUnder={160} duration={1000}>
        <FaArrowCircleUp className='scrollToTop'/>
      </ScrollToTop>
      <div className={styles.container}>
        <div className={styles.col__6}></div>
        <div className={styles.newsData}>
          <div className={styles.news__list}>
            {
              news.map((newsItem, index) => {
                console.log(new Date(newsItem.created_at).toUTCString())
                return (
                  <div className={styles.news} key={index}>
                    <div className={styles.sectionHead}>
                      {newsItem.source.title === 'Birmingham Live - Sport'? <h3 className={styles.bTitle}>B</h3> :
                      <img src={newsItem.source.url} className={styles.image} alt='image'/>}
                      <h4 className={styles.sourceTitle}>{newsItem.source.title}</h4>
                      <FaRss className={styles.rss}/>
                    </div>
                    <h3 className={styles.description}>{newsItem.title}</h3>
                    <p className={styles.date}>{newsItem.created_at}</p>
                    { newsItem.keywords.length>0 &&
                      <ul className={styles.keywords}>
                        {newsItem.keywords.map((item, index)=>{
                          return(
                            <li key={index}>
                              <a>{item.name}</a>
                            </li>
                          )
                          })}
                      </ul>
                    }
                    
                  </div>
                )
              })
            }
          </div>
          <Loading />

        </div>

        <div className={styles.col__6}></div>
      </div>
    </>
  )
}

export default NewsList