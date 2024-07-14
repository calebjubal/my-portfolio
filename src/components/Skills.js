import React, { useRef, useState } from 'react' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faHtml5, faCss3, faJs, faPython, faFreeCodeCamp } from '@fortawesome/free-brands-svg-icons';
import CustomHook from './CustomHook';

function Skills() {
  const divs = useRef([]);
  const scrollTab = useRef();
  CustomHook(scrollTab, divs);
const [listSkills] = useState([
  {
    name: 'HTML',
    des: 'Proficient in creating structured and semantic web pages using HTML. Skilled in optimizing HTML code for better SEO and accessibility.',
    icon: faHtml5
  },
  {
    name: 'CSS',
    des: 'Experienced in designing visually appealing and responsive web pages with CSS. Proficient in using modern CSS frameworks and pre-processors like Bootstrap and SASS.',
    icon: faCss3
  },
  {
    name: 'Javascript',
    des: 'Proficient in writing efficient and clean JavaScript code for web development. Experienced in using JavaScript for both client-side and server-side application',
    icon: faJs},
  {
    name: 'ReactJs',
    des: 'Adept at building dynamic and interactive user interfaces with React JS. Skilled in leveraging React hooks, state management, and component-based architecture.',
    icon: faReact
  },
  {
    name: 'Python',
    des: 'Skilled in writing Python scripts for automation, data analysis, and web development. Experienced in using popular libraries such as Pandas, NumPy, and TensorFlow for AI/ML projects.',
    icon: faPython
  },
  {
    name: 'FreeCodeCamp',
    des: 'Completed extensive coding challenges and projects on freeCodeCamp, demonstrating proficiency in web development and programming concepts. Earned certifications in various areas, showcasing a commitment to continuous learning.',
    icon: faFreeCodeCamp
  }

]);
  return (
    <section className='skills' ref={scrollTab}>
       <div className="title" ref={(el) => el && divs.current.push(el)}>
        This is my Skills
       </div>
       <div className="des" ref={(el) => el && divs.current.push(el)}>
        {/* 20 */}
        A versatile developer with a strong foundation in web development technologies, including HTML, CSS, JavaScript, and React JS, capable of creating responsive and dynamic user interfaces. Experienced in Python for automation and data analysis, with a solid understanding of AI/ML concepts. Committed to continuous learning, as evidenced by completing numerous coding challenges and projects on freeCodeCamp.
       </div>
       <div className="list">
        {
          listSkills.map((value, key) => (
            <div className={'item '} key={key} ref={(el) => el && divs.current.push(el)}>
              <FontAwesomeIcon icon={value.icon} />
              <h3>{ value.name }</h3>
              <div className="des">{value.des}</div>
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default Skills

