import React, { useState, useRef } from 'react';
import CustomHook from './CustomHook';

function Contacts() {
  const [listContacts] = useState([
    {
      title: 'Phone Number',
      value: '+91 77039 52970',
      link: null
    },
    {
      title: 'Email',
      value: 'chandrasekarcaleb@gmail.com',
      link: 'mailto:chandrasekarcaleb@gmail.com'
    },
    {
      title: 'Instagram',
      value: '@dj_calebrocks',
      link: 'https://www.instagram.com/dj_calebrocks'
    },
    {
      title: 'LinkedIn',
      value: 'https://www.linkedin.com/in/caleb-chandrasekar-b8521026b/',
      link: 'https://www.linkedin.com/in/caleb-chandrasekar-b8521026b/'
    },
    {
      title: 'Github',
      value: 'https://github.com/calebjubal',
      link: 'https://github.com/calebjubal'
    }
  ]);
  
  const divs = useRef([]);
  const scrollTab = useRef();
  CustomHook(scrollTab, divs);

  return (
    <section className='contacts' ref={scrollTab}>
      <div className="title" ref={(el) => el && divs.current.push(el)}>
        These are my Contacts
      </div>
      <div className="des" ref={(el) => el && divs.current.push(el)}>
        {/* 20 */}
        Got questions or projects? Hit me up! With my skills and determination. Let's make some tech magic together!
      </div>
      <div className="list" ref={(el) => el && divs.current.push(el)}>
        {
          listContacts.map((contact, key) => (
            <div className='item' key={key}>
              <h3>{contact.title}</h3>
              {
                contact.link ? 
                <a href={contact.link} target="_blank" rel="noopener noreferrer">{contact.value}</a> :
                <p>{contact.value}</p>
              }
            </div>
          ))
        }
      </div>
    </section>
  );
}

export default Contacts;
