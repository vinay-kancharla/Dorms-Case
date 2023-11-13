import { useParams } from 'react-router-dom';
import ExperiencePages from '../components/ExperiencePages.js';
import NavigationBar from '../components/NavigationBar';

export default function ExperiencePage() {
    const { experienceId } = useParams();
    const h1Style = {
        paddingTop:'20px',
        textAlign: 'center',
        };
    return <div>
        <NavigationBar/>
        <h1 class = "display-4" style = {h1Style}>{experienceId}</h1>
        <ExperiencePages/>
        </div>;
  }