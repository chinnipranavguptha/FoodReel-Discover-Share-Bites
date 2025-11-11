import React, { useState } from 'react';
import "../food partner/CreateFood.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateFood = () => {

    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    video: '',
    description: '',
    backgroundColor: '#ffffff'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3000/api/food/',
        formData,
        { withCredentials: true }
      );

      console.log(response.data);
      console.log('Form submitted:', formData);
      navigate('/');

    } catch (err) {
      console.error("Error while creating food:", err);
    }
  };

  return (
    <div className="create-food-container">
      <h2 className="create-food-title">Create New Food Item</h2>
      
      <div className="create-food-wrapper">
        <form className="create-food-form" onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label htmlFor="name">Food Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter food name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="video">Video URL</label>
          <input
            type="url"
            id="video"
            name="video"
            value={formData.video}
            onChange={handleChange}
            placeholder="Enter video URL"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter food description"
            required
          />
        </div>

        

        <button 
          type="submit" 
          className="submit-button"
          disabled={!formData.name || !formData.video || !formData.description}
        >
          Create Food
        </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;