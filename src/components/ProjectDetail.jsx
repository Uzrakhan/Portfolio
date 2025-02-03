import { useParams } from "react-router-dom";

const ProjectDetail = () => {
    const { id } = useParams();
    const project = projectList.find((proj) => proj.id === id);

    if(!project) {
        return <p>No projects found.</p>
    }

    return(
        <div className="container">
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <img src={project.image} alt={project.title}/>
        </div>
    )
};

export default ProjectDetail;