import React, { useState } from 'react';
import Wrapper from './style';
import HomeList from './Homelist';
import ROlist from '../RO_List';
import LOlist from '../LO_List';
import AClist from '../AC_List';
import stuIcon from '../assets/Graduate.png';
import homeIcon from '../assets/Smart Home.png';
import listIcon from '../assets/Audit.png';
import StudentList from '../Students/StudentSelect';
import Classview from '../Classview';

import { useSwipeable } from 'react-swipeable';
const Home = ({ user }) => {
  const [index, setIndex] = useState(1);
  const [tabs, setTabs] = useState([
    { id: 2, title: 'Home', icon: homeIcon },
    { id: 3, title: 'Students', icon: stuIcon },
    { id: 4, title: 'LO', icon: listIcon },
    { id: 5, title: 'RO', icon: listIcon },
    { id: 6 , title: 'AC', icon: listIcon },
  ]);
  const [loItems, setLoItems] = useState([]);
  const [acItems, setAcItems] = useState([]);
  const [studentsData, setStudentsData] = useState([]); // New state to store students data
  // Function passed to LOlist to update loItems in the parent component
  const handleLoItems = (data) => {
    setLoItems(data);
  };
  const handleAcItems = (data) => {
    setAcItems(data);
  };
  // New function to handle the students data
  const handleStudentsData = (data) => {
    setStudentsData(data); // Update students data in the parent state
  };
  // const handleSetIndex = (newIndex) => {
  //   console.log("Setting index to:", newIndex);
  //   setIndex(newIndex);
  // };
// console.log(user)
const handlers = useSwipeable({
  onSwipedLeft: () => {
    if (index !== 1 && index !== 6) setIndex((prevIndex) => (prevIndex < 6 ? prevIndex + 1 : prevIndex));
  },
  onSwipedRight: () => {
    if (index !== 1 && index !== 6) setIndex((prevIndex) => (prevIndex > 1 ? prevIndex - 1 : prevIndex));
  },
  trackMouse: true,
});
  return (
    <Wrapper {...handlers}>
      <div className="screen">
        {index === 1 ? (
          <HomeList user={user} setIndex={setIndex}  />
        ) : index === 2 ? (
          <Classview setIndex={setIndex} user={user}/>
        ) : index === 3 ? (
          <StudentList onStudentsData={handleStudentsData} setIndex={setIndex} />
        ) : index === 4 ? (
          <LOlist loItems={loItems} handleLoItems={handleLoItems} acItems={acItems} setAcItems={setAcItems} setIndex={setIndex}/>
        ) : index === 5 ? (
          <ROlist loItems={loItems} setLoItems={setLoItems} setIndex={setIndex} handleLoItems={handleLoItems} acItems={acItems}/>
        ) : (
          <AClist acItems={acItems} setAcItems={setAcItems} handleAcItems={handleAcItems} studentsData={studentsData} setIndex={setIndex} user={user}/>
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
              onClick={() => setIndex(tab.id)}  // Correct usage of setIndex here
            />
          ))}
        </div>
      )}
    </Wrapper>
  );
};
export default Home;