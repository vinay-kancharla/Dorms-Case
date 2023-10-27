import { useParams } from 'react-router-dom';
import DormPages from '../components/DormPages.js';
import NavigationBar from '../components/NavigationBar';
import reviewsJSON from '../dummy_data/reviews.json'
import ReviewTemplate from '../components/ReviewTemplate.js';
export default function DormPage() {
    
    const { dormId } = useParams();
    const h1Style = {
        paddingTop:'20px',
        textAlign: 'center',
        };

    let getReviews = () => {
        return reviewsJSON[dormId]
    }
    let reviews = getReviews()
    return <div>
        <NavigationBar/>
        <h1 class = "display-4" style = {h1Style}>{dormId}</h1>
        {/* Here is "map" code to give you an idea of how it works. I would recommend making a component called "reviewlayout" and use that in each iteration*/}
        {reviews.map((review, index) => (
                <ReviewTemplate rating={review.starrating} reviewText={review.review} dormPicture={review.image} likes={review.like} dislikes={review.dislike}/>
            ))}
        <DormPages/>
        </div>;
  }