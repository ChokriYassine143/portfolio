// src/pages/Projects.jsx
import React, { useEffect, useState } from 'react';
import {supabase} from '../supabaseClient';
import { Card, CardHeader, CardContent } from '../components/ui/card'; // Assuming you have a CardMedia component for images

const fetchProjects = async () => {
  const { data, error } = await supabase
    .from('test') // Ensure you use the correct table name
    .select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        console.log(data);
        setProjects(data);
      } catch (err) {
        setError('Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="projects-container">
      <h1>Projects</h1>
      <div className="projects-list">
        {projects.map((project) => (
          <Card key={project.id} className="project-card">
          
            <CardHeader>
              <h2>{project.Title}</h2>
            </CardHeader>
            <CardContent>
              <p>{project.description}</p>
              {project.LiveDemourl && (
                <a href={project.LiveDemourl} target="_blank" rel="noopener noreferrer" className="project-link">
                  View Project
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Projects;
