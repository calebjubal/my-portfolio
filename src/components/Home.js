import React, { useRef } from 'react' 
import CustomHook from './CustomHook';
function Home() {
const scrollTab = useRef();
CustomHook(scrollTab);

return (
    <section ref={scrollTab} className='home'>
        <div className="content">
            <div className="name">
                MY NAME IS <span>CALEB</span>
            </div>
            <div className="des">
                {/* 30 */}
                
                As a dedicated developer, I create impactful and user-friendly digital experiences with expertise in HTML, CSS, JavaScript, React JS, and Python. Committed to continuous learning, I strive to serve others through my talents.

                "In everything, set them an example by doing what is good." This principle guides me to deliver high-quality solutions that benefit users.
            </div>
            
            <a href="/democv.pdf" target="_blank" rel="noopener noreferrer" className='animation active '>
                Download My CV
            </a>
        </div>
        <div className="avatar">
            <div className="card">
                <img src="/avatar.jpg" alt="" />
                <div className="info">
                    <div>Designation</div>
                    <div>Location</div>
                    <div>Full-Stack Developer</div>
                    <div>New Delhi, India</div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default Home
