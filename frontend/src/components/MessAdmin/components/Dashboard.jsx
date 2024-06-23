import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateSchedule from './UpdateSchedule';

const Dashboard = () => {
  const [messData, setMessData] = useState(null); 

  useEffect(() => {
    getMessData();
  }, []);

  const getMessData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/messAdmin/messData', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });
      setMessData(response.data);
      console.log(response.data.messSchedule);
    } catch (error) {
      console.error('Error fetching mess schedule:', error);
    }
  };

  return (
    <div>
      {messData && <div className='text-center font-bold text-xl p-2 m-4'>Welcome to {messData.messName}</div>}
      {messData &&  <UpdateSchedule messSchedule={messData.messSchedule} />}
    </div>
  );
};

export default Dashboard;

