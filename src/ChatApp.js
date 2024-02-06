import React, { useState } from 'react';
import { Input, Button, Spin } from 'antd'; // Import Spin component from Ant Design
import axios from 'axios'; // Import Axios library
import './ChatApp.css'; // Create this file for styling

// Import your robot image
import robotIcon from './robot-icon.png';

const ChatApp = () => {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = async () => {
    const apiEndpoint = 'http://localhost:3000/api/gdrive/queries'; // Replace with your API endpoint
    
    try {
      setLoading(true); // Set loading state to true when API call starts

      const apiResponse = await axios.post(apiEndpoint, { prompt: inputValue });

      const jsonResponse = apiResponse.data;
      console.log(jsonResponse);

      const message = jsonResponse.message;
      setResponse(message);
    } catch (error) {
      console.error('Error calling API:', error);
    } finally {
      setLoading(false); // Set loading state to false when API call finishes
    }
  };

  return (
    <div className="chat-container">
      <div className="robot-icon">
        <img src={robotIcon} alt="Robot Icon" width={100}/>
      </div>
      <div className="chat-box">
        <Input.TextArea
          rows={5}
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <Button type="primary" onClick={handleButtonClick}>
          Submit
        </Button>
      </div>
      {loading ? ( // Render the Spin component if loading state is true
        <div className="spin-container">
          <Spin size="large" />
        </div>
      ) : (
        response && (
          <div className="response-box">
            <p>{response}</p>
          </div>
        )
      )}
    </div>
  );
};

export default ChatApp;
