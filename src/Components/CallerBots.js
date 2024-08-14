import React, { useState, useEffect } from "react";
import people from "../PeopleData";
import maleImg from '../Assets/male-30.jpg'

export default function CallerBots() {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [aiResponse, setAiResponse] = useState("");

 

  const api = process.env.REACT_APP_OPENAI_API_KEY;

  useEffect(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = "en-US";

      const startRecognition = () => {
        recognition.start();
        recognition.onresult = async (event) => {
          const newTranscript = event.results[0][0].transcript;
          setTranscript(newTranscript);
          recognition.stop();
          try {
            const response = await fetchAIResponse(newTranscript);
            setAiResponse(response);
            speakText(response)
          } catch (error) {
            setAiResponse(`Error: ${error.message}`);
            speakText(error.message)
          }
        };

      };

      const stopRecognition = () => {
        recognition.stop();
      };

      document.getElementById("start-call-btn").addEventListener("click", startRecognition);
      document.getElementById("stop-call-btn").addEventListener("click", stopRecognition);

      return () => {
        recognition.abort();
      };
    } else {
      console.error("Speech Recognition is not supported by your browser.");
    }
  }, []);

  const fetchAIResponse = async (query) => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          "Authorization": "Bearer " + api,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: query }],
          max_tokens: 150,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      throw new Error(`Failed to fetch AI response: ${error.message}`);
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Text-to-Speech is not supported by your browser.");
    }
  };

  return (
    <>
      <div className="callerName">
        <p style={{ margin: "1rem" }}>
          Choose an AI buyer & start a roleplay conversation in &lt; 10 secs
        </p>
        <hr />
        <div>
          {people.map((person) => (
            <div
              key={person.id}
              className="person"
              onClick={() => setSelectedPerson(person)}
            >
              <button className="btn2">
                <h3>{person.name}</h3>
                <p>{person.occupation}</p>
                <button
                  className="btn"
                  style={{ fontSize: "12px", padding: "10px" }}
                  id="start-call-btn"
                >
                  Start Call
                </button>
                <button
                  className="btn"
                  style={{ fontSize: "12px", padding: "10px", margin: "1rem" }}
                  id="stop-call-btn"
                >
                  Stop Call
                </button>
                <br/>
                <button className="btn" style={{backgroundColor:'#000000', color:'#ffffff', height:'20%', fontSize:'12px', padding:'10px'}}>Book Rate: 10.2%</button>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="details-section">
        {selectedPerson ? (
          <div className="details-section-data">
          <h4 style={{textAlign:'left', margin:'1rem'}}>AI Roleplay Instructions</h4>
            <p style={{textAlign:'left', margin:'1rem'}}>{selectedPerson.details}</p>
            <img className="detail-section-img" src={maleImg} width="30%" alt="img" style={{borderRadius:'50%'}} />
            <h2>{selectedPerson.name}</h2>
            <p>{selectedPerson.occupation}</p>
            <br />
            <h5>Converted Text: {transcript}</h5>
            <h5>AI Response: {aiResponse}</h5>
          </div>
        ) : (
          <div>
            <p style={{ marginTop: "20rem" }}>
              Select a person to see their details.
            </p>
            <br />
          </div>
        )}
      </div>
    </>
  );
}
