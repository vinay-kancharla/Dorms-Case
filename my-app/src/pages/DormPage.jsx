import { useParams } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
export default function DormPage() {
    const { dormId } = useParams();
    return <div>
        <NavigationBar/>
        DORM IS : {dormId} 
        </div>;
  }