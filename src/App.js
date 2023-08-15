import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './logo.png';

function App() {
  const [visionItems, setVisionItems] = useState([]);

  useEffect(() => {
    const storedVisionItems = JSON.parse(localStorage.getItem('visionItems'));
    if (storedVisionItems) {
      setVisionItems(storedVisionItems);
    }
  }, []);

  const saveItemsToLocalStorage = (items) => {
    localStorage.setItem('visionItems', JSON.stringify(items));
  };

  const addItem = () => {
    const newVisionItem = {
      title: 'My Vision',
      content: 'Write your vision here...',
      image: null,
    };
    setVisionItems([...visionItems, newVisionItem]);
  };

  const handleImageUpload = (index, file) => {
    const updatedItems = [...visionItems];
    updatedItems[index].image = URL.createObjectURL(file);
    setVisionItems(updatedItems);
    saveItemsToLocalStorage(updatedItems);
  };

  const handleContentChange = (index, content) => {
    const updatedItems = [...visionItems];
    updatedItems[index].content = content;
    setVisionItems(updatedItems);
    saveItemsToLocalStorage(updatedItems);
  };

  const deleteItem = (index) => {
    const updatedItems = visionItems.filter((item, i) => i !== index);
    setVisionItems(updatedItems);
    saveItemsToLocalStorage(updatedItems);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Virtual Vision Board</h1>
      </header>
      <main className="App-main">
        <div className="vision-board">
          {visionItems.map((item, index) => (
            <div className="vision-item" key={index}>
              <h2>{item.title}</h2>
              <p>
                <textarea
                  value={item.content}
                  onChange={(e) => handleContentChange(index, e.target.value)}
                />
              </p>
              {item.image && <img src={item.image} alt={`Vision ${index}`} />}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(index, e.target.files[0])}
              />
              <button className="delete-button" onClick={() => deleteItem(index)}>Delete</button>
            </div>
          ))}
        </div>
        <button className="add-button" onClick={addItem}>Add Item</button>
      </main>
    </div>
  );
}

export default App;
