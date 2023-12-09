# Dorms @ Case Basic User Manual

**NOTE: PREVIOUSLY WE WERE USING CHATGPT GENERATED DORM LIST CALLED DORMS.JSON. DURING OUR FINAL REVISION WE HAVE DELETED THIS FILE**

## Introduction: 
The purpose of Dorms @ Case is to aid current or prospective student with choosing the best dorms to fit their needs. It's an unbiased application where current or prospective students can view what student’s experiences were like in dorms that they lived in the past or spent a lot of time in. The application allows users to seamlessly see the rankings of the best dorms for each of the experiences (First-year, Second-year, and Upperclass). Furthermore, users can also see specific reviews for each of the dorm by visiting each of the individual’s dorm pages as well as see real time pictures of the dorm to get an idea of what it looks like.

## Installing 
Open up a terminal and navigate to the repository directory
```
cd client
```

```
npm install
```
```
npm start
```

Open up another terminal
```
cd server
```

```
mvn clean install
```
```
mvn spring-boot:run
```
**Note! If you do not have the database key, you will not be able to mvn clean install.**
**Please contact us if you would like to use the database functionality**

## How to Use:

### User who just wants to view reviews: 
Can navigate through the application using the navigation bar. By clicking on the navigation bar, the user can see all three of the experiences. If the user wants to just view the ranking of the dorms for a particular experience, they can just click on the experience and can view that experience's dorms ranked from highest rated to lowest rated. If the user wants to look at reviews for individual dorms, they can go to the experience in which the dorm is located in and click on the arrow besides that experience to a list of all the dorms in that experience. By clicking on the name of the individual dorm in that experience, the user can go to that dorm's page and see all the written reviews
  
### User who wants to write a review: 
To write a review, a user has to create an account or log into an existing account that they have. If they have an account, they can click on the "log in" button and input their credentials. If they don't have an account, they can also click on the "log in" button and then click on the "sign up" button. Once the user is able to log in, they can do to the individaul dorm page they want to write a review on using the navigation bar and click on the "Add a review" button. The user then can give a star rating, write a review, and upload an image of the dorm. To submit the review, the user can click on the "validate and publish" button.
  
