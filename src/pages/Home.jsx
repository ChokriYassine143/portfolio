// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/card';


// Fetch projects from Supabase
const fetchProjects = async () => {
  const { data, error } = await supabase
    .from('test') // Ensure you use the correct table name
    .select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        setError('Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to My Portfolio</h1>
          <p className="hero-description">Explore my work and projects.</p>
        </div>
      </section>
      <section className="introduction">
        <Card className="intro-card">
          <CardHeader>
            <h2 className="card-title">About Me</h2>
          </CardHeader>
          <CardContent>
            <p>
              As a dedicated software developer, I have cultivated a robust skill set across a variety of technologies and domains. My journey in the tech world has equipped me with extensive experience in full-stack development, encompassing front-end technologies like React, Angular, and Vue.js, as well as back-end frameworks such as Node.js, Django, and Ruby on Rails. My proficiency in languages including JavaScript, Python, Java, and PHP allows me to tackle complex programming challenges with confidence. Additionally, I have honed my skills in database management, working with both relational databases like PostgreSQL and MySQL and NoSQL databases such as MongoDB. My expertise extends to cloud services and deployment platforms, including AWS and Azure, ensuring scalable and reliable solutions. With a strong foundation in UI/UX design principles, I focus on creating intuitive and engaging user experiences. Throughout my career, I have successfully managed and delivered numerous projects, from developing sophisticated web applications to designing and implementing APIs. My problem-solving abilities, coupled with a keen eye for detail, drive me to continuously explore new technologies and methodologies, always striving for excellence in my craft. Here, you can delve into a comprehensive overview of my projects and achievements, reflecting the breadth and depth of my technical capabilities and professional growth.
            </p>
          </CardContent>
        </Card>
      </section>
      <section className="projects-preview">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-list">
          {projects.map((project) => (
            <Card key={project.id} className="project-card">
              <CardHeader>
                <h3 className="project-title">{project.Title}</h3>
              </CardHeader>
              <CardContent>
                <p className="project-description">{project.description}</p>
              </CardContent>
              {project.LiveDemourl && (
                <CardFooter>
                  <a href={project.LiveDemourl} target="_blank" rel="noopener noreferrer" className="project-link">
                    View Project
                  </a>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
