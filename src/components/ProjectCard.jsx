import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';

const ProjectCard = ({ project }) => {
  return (
    <Card className="max-w-sm mx-auto mb-4">
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <a href={project.liveDemoUrl} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Live Demo</a>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
