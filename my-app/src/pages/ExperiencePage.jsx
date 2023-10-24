import { useParams } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';

export default function ExperiencePage() {

    const { experienceId } = useParams();

    return <div>
        <NavigationBar/>
        Experience is : {experienceId} 
        </div>;
  }