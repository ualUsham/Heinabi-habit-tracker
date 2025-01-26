import React from 'react'
import './about.css'

const About = () => {
  return (<>
    <p className="lead mx-3 text-center">
      " Rome was not built in a day. You need Good Habits to build an empire."
    </p>
    <hr></hr>
    <p className="mx-5 mt-4 fs-4">Welcome to <em>Heinabi</em>, a Habit Tracking app where
      you can keep track of your daily goals such as Workout, Study, Hydration, Skin-care, etc.
      We firmly believe that good things take time and it is only through <em>Good Habits</em> that one can build the
      Impossible. Just add your habits and come back everyday to mark your daily task completion. And <em>Guess What? </em> It's
      totally <em>Free!!</em> to build your own good habits.</p>

    <p className="mx-5 mt-5 mb-4 fs-4">If you find any issues while using this app or would want to appreciate us, please feel free to drop a message
      on my Instagram account. We would love to make this app better with your feedback. <em>Thank You!!</em>
    </p>
    <hr></hr>
    <div className='insta'>
      <i class="fa-brands fa-instagram fa-bounce fa-5x"></i>
      <a
        href="https://www.instagram.com/adhitya_ual/"
        style={{ textDecoration: 'none', color:'#2C3E50', fontWeight:'bold' }}
      >
        <em>adhitya_ual</em>
      </a>

    </div>
  </>
  )
}

export default About
