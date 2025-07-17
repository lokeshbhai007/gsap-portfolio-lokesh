import React, { useState } from "react";
import styled from "styled-components";

const educationData = [
  {
    degree: "B.Tech in Computer Science and Engineering (IOTCS)",
    institution: "Heritage Institute of Technology",
    duration: "08/2023 - 05/2027",
    location: "Kolkata",
    gpa: "8.87 / 10.0",
  },
  {
    degree: "Higher Secondary (10+2)",
    institution: "Rathtala Manoharidas Vidyaniketan",
    duration: "06/2020 - 05/2022",
    location: "Purba Bardhaman",
    percentage: "86 / 100",
  },
];

const certificationData = [
  {
    title: "Introduction to Generative AI Concepts",
    provider: "Microsoft",
    issued: "May 29, 2025",
  },
  {
    title: "Fundamentals of Information Security",
    provider: "Infosys Springboard",
    issued: "November 17, 2024",
  },
];

const Card = () => {
  const [activeSection, setActiveSection] = useState('education');

  return (
    <StyledWrapper>
      <div className="card">
        <div 
          className={`section personal ${activeSection === 'personal' ? 'open' : ''}`}
          onMouseEnter={() => setActiveSection('personal')}
          onMouseLeave={() => setActiveSection('education')}
        >
          <div className="section-header">
            <span>PERSONAL</span>
          </div>
          <div className="section-content">
            <div className="info-item">
              <h4>Name</h4>
              <p>Lokesh Mondal</p>
            </div>
            <div className="info-item">
              <h4>Location</h4>
              <p>Purba Bardhaman, West Bengal</p>
            </div>
            <div className="info-item">
              <h4>Email</h4>
              <p>lokeshmondal340@gmail.com</p>
            </div>
            <div className="info-item">
              <h4>Language Known</h4>
              <p>Bengali, Hindi, English</p>
            </div>
          </div>
        </div>

        <div 
          className={`section education ${activeSection === 'education' ? 'open' : ''}`}
          onMouseEnter={() => setActiveSection('education')}
          onMouseLeave={() => setActiveSection('education')}
        >
          <div className="section-header">
            <span>EDUCATION</span>
          </div>
          <div className="section-content">
            {educationData.map((edu, index) => (
              <div key={index} className="info-item">
                <h4>{edu.degree}</h4>
                <p>
                  <strong>{edu.institution}</strong>
                </p>
                <p>{edu.duration}</p>
                <p>{edu.location}</p>
                <p className="grade">
                  {edu.gpa ? `GPA: ${edu.gpa}` : `Score: ${edu.percentage}`}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div 
          className={`section certification ${activeSection === 'certification' ? 'open' : ''}`}
          onMouseEnter={() => setActiveSection('certification')}
          onMouseLeave={() => setActiveSection('education')}
        >
          <div className="section-header">
            <span>CERTIFICATION</span>
          </div>
          <div className="section-content">
            {certificationData.map((cert, index) => (
              <div key={index} className="info-item">
                <h4>{cert.title}</h4>
                <p>
                  <strong>{cert.provider}</strong>
                </p>
                <p>Issued: {cert.issued}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 100%;
    max-width: 750px;
    height: 350px;
    border-radius: 24px;
    display: flex;
    gap: 16px;
    padding: 0.3em;
  }

  .section {
    height: 100%;
    flex: 1;
    overflow: hidden;
    cursor: pointer;
    border-radius: 24px;
    transition: all 0.5s;
    background: linear-gradient(to bottom, black, #9a74cf20);
    border: 1px solid #330109;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .section:hover {
    /* Removed hover flex change since we're using state */
  }

  /* Default open state for education section */
  .section.open {
    flex: 4;
  }

  .section-header {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s;
  }

  .section:hover .section-header {
    /* Removed hover header changes since we're using state */
  }

  /* Default open state for education section header */
  .section.open .section-header {
    height: 50px;
    min-height: 50px;
    border-bottom: 1px solid #ff5a91;
  }

  .section-header span {
    min-width: 12em;
    padding: 0.4em;
    text-align: center;
    transform: rotate(-90deg);
    transition: all 0.5s;
    text-transform: uppercase;
    color: yellowgreen;
    letter-spacing: 0.08em;
    font-weight: bold;
    font-size: 1.4em;
  }

  .section:hover .section-header span {
    /* Removed hover span changes since we're using state */
  }

  /* Default open state for education section span */
  .section.open .section-header span {
    transform: rotate(0);
    min-width: auto;
    font-size: 1em;
  }

  .section-content {
    opacity: 0;
    padding: 0.8em;
    overflow-y: auto;
    transition: all 0.5s;
    flex: 1;
    color: #fff;
  }

  .section:hover .section-content {
    /* Removed hover content changes since we're using state */
  }

  /* Default open state for education section content */
  .section.open .section-content {
    opacity: 1;
  }

  .info-item {
    margin-bottom: 1em;
    padding-bottom: 0.8em;
    border-bottom: 1px solid #333;
  }

  .info-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }

  .info-item h4 {
    color: #ff568e;
    margin: 0 0 0.4em 0;
    font-size: 0.9em;
    font-weight: bold;
    line-height: 1.3;
  }

  .info-item p {
    margin: 0.15em 0;
    font-size: 0.8em;
    line-height: 1.3;
    color: #ccc;
  }

  .info-item p strong {
    color: #fff;
  }

  .grade {
    color: #ff568e !important;
    font-weight: bold;
  }

  /* Scrollbar styling */
  .section-content::-webkit-scrollbar {
    width: 3px;
  }

  .section-content::-webkit-scrollbar-track {
    background: #333;
  }

  .section-content::-webkit-scrollbar-thumb {
    background: #050309;
    border-radius: 2px;
  }

  /* Tablet responsive */
  @media (max-width: 768px) {
    .card {
      height: 300px;
      gap: 10px;
      padding: 0.2em;
    }

    .section:hover .section-header {
      /* Removed hover header changes since we're using state */
    }

    .section.open .section-header {
      height: 40px;
      min-height: 40px;
    }

    .section-header span {
      min-width: 10em;
      padding: 0.3em;
      font-size: 1.1em;
      letter-spacing: 0.05em;
    }

    .section:hover .section-header span {
      /* Removed hover span changes since we're using state */
    }

    .section.open .section-header span {
      font-size: 0.8em;
    }

    .section-content {
      padding: 0.6em;
    }

    .info-item {
      margin-bottom: 0.8em;
      padding-bottom: 0.6em;
    }

    .info-item h4 {
      font-size: 0.75em;
      margin: 0 0 0.3em 0;
    }

    .info-item p {
      font-size: 0.65em;
      line-height: 1.2;
    }
  }

  /* Mobile responsive - keep original mobile sizes */
  @media (max-width: 480px) {
    .card {
      height: 220px;
      gap: 1px;
      padding: 0.1em;
    }

    .section:hover .section-header {
      /* Removed hover header changes since we're using state */
    }

    .section.open .section-header {
      height: 35px;
      min-height: 35px;
    }

    .section-header span {
      min-width: 8em;
      padding: 0.2em;
      font-size: 0.7em;
      letter-spacing: 0.03em;
    }

    .section:hover .section-header span {
      /* Removed hover span changes since we're using state */
    }

    .section.open .section-header span {
      font-size: 0.6em;
    }

    .section-content {
      padding: 0.5em;
    }

    .info-item {
      margin-bottom: 0.6em;
      padding-bottom: 0.5em;
    }

    .info-item h4 {
      font-size: 0.55em;
      margin: 0 0 0.2em 0;
    }

    .section {
      border-radius: 12px;
    }

    .info-item p {
      font-size: 0.5em;
      line-height: 1.2;
      margin: 0.1em 0;
    }

    .section-content::-webkit-scrollbar {
      width: 2px;
    }
  }
`;

export default Card;