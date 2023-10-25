import { useParams } from 'react-router-dom';
import DormPages from '../components/DormPages.js';
import NavigationBar from '../components/NavigationBar';
export default function DormPage() {
    const { dormId } = useParams();
    const h1Style = {
        paddingTop:'20px',
        textAlign: 'center',
        };
    return <div>
        <NavigationBar/>
        <h1 class = "display-4" style = {h1Style}>{dormId}</h1>
        <DormPages/>
        </div>;
  }