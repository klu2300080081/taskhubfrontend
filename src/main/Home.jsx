import React from 'react';


function Home() {
  const features = [
    {
      title: 'Task Creation',
      image: '📋➕',
      description:
        'This feature allows users to create new tasks. Users can enter task details such as the title, description, and deadline. Once created, tasks are added to the task list for further actions.',
    },
   
    {
      title: 'Task Tracking',
      image: '⏱📊',
      description:
        'The task tracking feature enables users to track the status of tasks in real-time. This includes progress monitoring, completion percentage, and due dates to keep tasks on schedule and ensure deadlines are met.',
    },
  ];

  return (
    <div className="scroll-container">
      <div className="features-container">
        {features.map((item, index) => (
          <div className="card" key={index}>
            <div className="card-icon">{item.image}</div>
            <h3 className="card-title">{item.title}</h3>
            <p className="card-description">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
