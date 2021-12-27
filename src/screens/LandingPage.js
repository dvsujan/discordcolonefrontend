import React from 'react'
import './Landing.css'
import backg from './assets/shoe.svg'
import backg1 from './assets/bar.svg'
import sec2img from './assets/sec2.svg' 
import sec1img from './assets/sec1.svg'
import { useHistory } from "react-router-dom"
import nitro from './assets/nitro.svg'

function LandingPage() {
    const history = useHistory(); 
    const onOpenPressed = ()=>{ 
        history.push('/app'); 
    }
    return (
        <div className="landingpage">
            <section className="sec1">
                <h1 className="landingh">IMAGINE A PLACE...</h1>    
                <p className='landingp'>...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</p> 
                <button className='landingbtn' onClick={onOpenPressed}>Open Discord Clone</button> 
                <img className="leftbtmimg" src={backg1}/> 
                <img className="rightbtmimg" src={backg}/> 
            </section > 
            
            <section className="sec2">
                <div className='sec2img'>
                    <img src={sec1img}/>
                </div>
                <div className='sec2info'>
                    <h1>Create an invite-only place where you belong</h1>
                    <p>Discord servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.</p> 
                </div>
            </section >
            
            <section className="sec3">
                <div className='sec2info'>
                    <h1>Where hanging out is easy</h1>
                    <p>Grab a seat in a voice channel when you’re free. Friends in your server can see you’re around and instantly pop in to talk without having to call.</p> 
                </div>    
                 <div className='sec2img'>
                    <img src={sec2img}/>
                </div>
            </section> 
            <div className="sec4">
                <div className='sec5info'>
                    <img src={nitro}/>
                    <h1>No Need To Pay For Nitro</h1>
                    <p>Here You can you nitro features for free No premium or money required</p> 
                </div> 
            </div> 
        </div>
    )
}

export default LandingPage
