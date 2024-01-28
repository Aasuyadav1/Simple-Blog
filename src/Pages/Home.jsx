import React from 'react'
import Header from './Header'
import Hero from './Hero'
import Category from './Category'
import Post from './Post'
import Recentpost from './Recentpost'



function Home() {
    
  return (
    <div>
        <Header />

<Hero />
<Category />

<Post />
<Recentpost />
    </div>
  )
}

export default Home