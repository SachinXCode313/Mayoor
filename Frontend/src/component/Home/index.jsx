import React, { useState } from 'react';
import Wrapper from './style';
import HomeList from './Homelist';
import ROlist from '../RO_List';
import LOlist from '../LO_List';
import AClist from '../AC_List';
import StudentSelect from '../Students/StudentSelect'
import stuIcon from '../assets/Graduate.png';
import homeIcon from '../assets/Smart Home.png';
import listIcon from '../assets/Audit.png';

const Home = ({ user }) => {
  const [index, setIndex] = useState(1);
  const [tabs, setTabs] = useState([
    { id: 1, title: 'Home', icon: homeIcon },
    { id: 2, title: 'Students', icon: stuIcon },
    { id: 5, title: 'AC', icon: listIcon },
    { id: 4, title: 'LO', icon: listIcon },
    { id: 3, title: 'RO', icon: listIcon },
  ]);
  const [loItems, setLoItems] = useState([
    { id: 11, number: 'LO-1', title: 'Title of LO-1' },
    { id: 12, number: 'LO-2', title: 'Title of LO-2' },
    { id: 13, number: 'LO-3', title: 'Title of LO-3' },
    { id: 14, number: 'LO-4', title: 'Title of LO-4' },
    { id: 15, number: 'LO-5', title: 'Title of LO-5' },
    { id: 16, number: 'LO-6', title: 'Title of LO-6' },
    { id: 17, number: 'LO-7', title: 'Title of LO-7' },
    { id: 18, number: 'LO-8', title: 'Title of LO-8' },
    { id: 19, number: 'LO-9', title: 'Title of LO-9' },
    { id: 20, number: 'LO-10', title: 'Title of LO-10' }
  ]);
  const [acItems, setAcItems] = useState([
    { id: 21, number: 'AC-1', title: 'Title of AC-1' },
    { id: 22, number: 'AC-2', title: 'Title of AC-2' },
    { id: 23, number: 'AC-3', title: 'Title of AC-3' },
    { id: 24, number: 'AC-4', title: 'Title of AC-4' },
    { id: 25, number: 'AC-5', title: 'Title of AC-5' },
    { id: 26, number: 'AC-6', title: 'Title of AC-6' },
    { id: 27, number: 'AC-7', title: 'Title of AC-7' },
    { id: 28, number: 'AC-8', title: 'Title of AC-8' },
    { id: 29, number: 'AC-9', title: 'Title of AC-9' },
    { id: 30, number: 'AC-10', title: 'Title of AC-10' }
  ]);
  const [userData, setUserData] = useState({}); // State to hold user data from HomeList

  // Function passed to HomeList to update user data in the parent component
  const handleUserData = (data) => {
    setUserData(data); // Update user data in the parent state
  };
  
  // console.log('user data in home:', userData);
  return (
    <Wrapper>
      <div className="screen">
        {index === 1 ? (
          <HomeList user={user} setIndex={setIndex} setUserData={handleUserData} userdata = {userData} />
        ) : index === 2 ? (
          <StudentSelect userData = {userData} />
        ) : index === 3 ? (
          <ROlist loItems={loItems} setLoItems={setLoItems} userData = {userData}/>
        ) : index === 4 ? (
          <LOlist loItems={loItems} setLoItems={setLoItems} acItems={acItems} setAcItems={setAcItems} userData = {userData}/>
        ) : (
          <AClist acItems={acItems} setAcItems={setAcItems} userData = {userData}/>
        )}
      </div>
      {index !== 1 && (
        <div className="bottom">
          {tabs.map((tab) => (
            <input
              key={tab.id}
              className={index === tab.id ? 'active' : ''}
              type="button"
              value={tab.title}
              onClick={() => setIndex(tab.id)}
            />
          ))}
        </div>
      )}
    </Wrapper>
  );
};

export default Home;
