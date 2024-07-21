import React, { useState, useRef } from 'react' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonCircleQuestion, faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import CustomHook from './CustomHook';

function Projects() {
const [listProjects] = useState([
  {
    name: 'Stock Price Prediction',
    des: 'Develop a machine learning model to accurately forecast future stock prices using historical market data, enabling investors to make informed trading decisions.',
    language: 'Python, Numpy, Pandas....',
    images: '/project1.PNG'
  },
  {
    name: 'Snippet Bro',
    des: 'A Next.js based application which helps you to search and save your favorite snippets.',
    mission: 'Full-Stack Developer, use of Next framework and design',
    language: 'Next.js, tailwindCSS, Typescript, MongoDB, Vercel...',
    images: '/project2.PNG'
  },
  {
    name: 'Qala: An ecommerce website which acts as a art marketplace',
    des: 'An e-commerce website built on the MERN stack, Qala serves as a vibrant marketplace for artists to showcase and sell their artwork directly to buyers.',
    mission: 'Back-end Developer, some part of the frontend design',
    language: 'HTML5, CSS3, Express JS, React JS,...',
    images: '/Screenshot 2024-07-21 200325.png'
  },

]);
const divs = useRef([]);
const scrollTab = useRef();
CustomHook(scrollTab, divs);
  return (
    <section className='projects' ref={scrollTab}>
       <div className="title" ref={(el) => el && divs.current.push(el)}>
        This is my Projects
       </div>
       <div className="des" ref={(el) => el && divs.current.push(el)}>
        {/* 20 */}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam perspiciatis quae veniam amet nesciunt voluptatibus quis consectetur consequatur quisquam harum.
       </div>
       <div className="list">
        {
          listProjects.map((value, key) => (
            <div className='item' key={key} ref={(el) => el && divs.current.push(el)}>
              <div className="images">
                <img src={value.images} alt="" />
              </div>
              <div className="content">
                <h3>{value.name}</h3>
                <div className="des">{value.des}</div>
                <div className="mission">
                    <div><FontAwesomeIcon icon={faPersonCircleQuestion} /></div>
                    <div>
                        <h4>Mission</h4>
                        <div className="des">{value.mission}</div>
                    </div>
                </div>
                <div className="mission">
                    <div><FontAwesomeIcon icon={faEarthAmericas} /></div>
                    <div>
                        <h4>Languages</h4>
                        <div className="des">{value.language}</div>
                    </div>
                </div>
              </div>
            </div>
          ))
        }
       </div>
    </section>
  )
}
export default Projects
