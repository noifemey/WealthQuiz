<template>
    <div id="app" class="quiz-bg mx-auto pt-5 m-0">
        <div class="container">
            <img class="top-logo" src="../assets/img/icon-img/quiz-wealth_avatarr.png"/>
        </div>
        <div class="container header-text text-center ">
            <h1 class="begin-text">7 Wealth Avatars. 1 Destiny To Unlimited Wealth.</h1>
            <h4 class="my-4 text-shadow">Free Wealth Archetype Quiz Reveals <span class="text-decoration-underline">Hidden Money Secrets</span> Based On Your Personality</h4>
        </div>
        <div class="container begin-text p-0 mt-5 mb-5 text-center">
            <p class="fw-bold text-light">Start My FREE Quiz Now:</p>
        </div>

        <!-- begin -->
        <div id="begin" class="text-center" v-show="showQuiz === false">
            <button class="btn button-begin glow-on-hover text-center" @click="showQuiz = !showQuiz" >
            BEGIN
            <img class="d-inline" src="../assets/img/icon-img/quiz-play-icon.png"/>
            </button>
        </div>

        <transition name="fade">
            <div class="container quiz-card mb-5" v-show="showQuiz === true">
                <div class="jumbotron mt-3">
                    <!-- Progress Bar -->
                    <div class="container text-center">
                        <div class="loading-bar mx-auto">
                            <div class="percentage" :style="{'width' : percent + '%'}">
                                <p class="percentage-inside">{{ percent }}%</p>
                            </div>
                        </div>
                    </div>

                    <!-- Alert -->
                    <p v-if="errors[currentSet]" class="alert alert-danger">
                        {{ error }}
                    </p>

                    <div v-for="(question, index) in quiz.questions" :key="question">
                        <!-- Questions -->
                        <div v-show="showQuestion(index)">
                            <hr class="bg-danger border-2 border-top ">
                            <div class="row">
                                <!-- question image -->
                                <div class="col-sx-12 col-md-4 order-md-3">
                                    <div class="question-img">
                                        <img :src="require(`@/assets/img/quiz-img/${question.image}.png`)" alt class="img-fluid rounded-circle  mx-auto"/>
                                    </div>
                                </div>
                                <div class="row col">
                                    <!-- question text -->
                                    <div class="col-12 order-md-1">
                                        <p class="mb-1 text-center text-md-start question-text">{{ question.text }}</p> 
                                    </div>
                                    <!-- question answers -->
                                    <div class="col order-md-2">
                                        <div v-for="answer in question.answers" class="form-check mb-lg-1" :key="answer">
                                            <label class="form-check-label">
                                                <input class="form-check-input" type="radio"
                                                    :value="answer.value"
                                                    :name="index"
                                                    v-model="responses[index]" @change="next">
                                                {{answer.text}}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Prev and Next buttons -->
                    <div v-show="false" class="row justify-content-between mt-5">
                        <button class="btn col shade-prev" v-if="questionIndex > 0" @click="prev">
                            Previous
                        </button>
                        <button class="btn col shade-next" @click="next">
                            Next
                        </button>  
                    </div>
                
                    <transition name="question">
                        <div v-show="currentSet == 4" class="row justify-content-center mt-4">
                            <div class="col mx-auto text-center">
                                <form class="opt-in mt-3 mx-auto" ref="form" @submit="redirect">
                                    <p><span class="fw-bold">REGISTER</span> To See Your Result!</p>

                                        <div v-if="errorMessage" class="alert alert-danger">
                                            FAILED REGISTRATION: <br>
                                            {{errorMessage}}
                                        </div>

                                        <div v-if="form_errors.length" class="alert alert-danger">
                                            <ul>
                                                <!-- Loop through each error message -->
                                                <li v-for="error in form_errors" :key="error">{{ error }}</li>
                                            </ul>
                                        </div>

                                    <div class="row">       
                                        <div class="col-md-4 mt-2">
                                            <label for="name">NAME:</label> 
                                        </div>        
                                        <div class="col-md-8 mt-2">
                                            <input class="form-control" type="text" name="name" v-model="name" placeholder="Name" required>
                                        </div>             
                                    </div>
                                    <div class="row">       
                                        <div class="col-md-4 mt-2">
                                            <label for="mail">EMAIL:</label> 
                                        </div>        
                                        <div class="col-md-8 mt-2">
                                            <input class="form-control" type="mail" name="mail" v-model="mail" placeholder="Email" required>
                                        </div>             
                                    </div>
                                    <div class="row">       
                                        <div class="col-md-4 mt-2">
                                            <label for="gender">GENDER:</label> 
                                        </div>        
                                        <div class="col-md-8 mt-2">
                                            <select  class="form-control" id="gender" v-model="gender">
                                                <option value="male" selected>Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>             
                                    </div>
                                    <div class="row">       
                                        <div class="col-md-4 mt-2">
                                            <label for="mobile_number">MOBILE NUMBER:</label> 
                                        </div>        
                                        <div class="col-md-8 mt-2">
                                            <input class="form-control" type="text" name="mobile_number" v-model="mobile_number" placeholder="Mobile Number">
                                        </div>             
                                    </div>
                                    <div class="row">       
                                        <div class="col-md-4 mt-2">
                                            <label for="password">PASSWORD:</label> 
                                        </div>        
                                        <div class="col-md-8 mt-2">
                                            <input class="form-control" id="password" type="password" placeholder="Password" name="password" required autocomplete="new-password"  v-model="password" >
                                        </div>             
                                    </div>
                                    <button type="submit"  class="btn d-black my-4 text-light shade-submit">See My Result</button>
                                </form>
          
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </transition>

        <!-- Testimonials -->
        <div class="text-center mt-5 px-2">
            <p class="fw-bold text-light fs-4">Here’s What Others Think About Their FREE WealthAvatarr™ Readings…</p>
        </div>
        <div class="container row my-5 mx-auto">
            <div class="col-12 col-md-4 col-lg-4 mx-auto">
                <div class="testimonial mx-auto"> 
                    <span class="archetype-xs banker-icon rounded-circle"></span>
                    <p class="testimonial-header">“The formula to make me content and happy, emotionally and financially.”</p>
                    <p>I’m one of those people who are going through a midlife crisis.</p>
                    <p>I was just scrolling through my emails when I came across this online reading. I was so bored so I gave it a try and did the free quiz.</p>
                    <p>To my surprise, this is not just any ordinary quiz. I was overwhelmed by the accuracy of the reading and the hard-truths I need to know about money based on my personality.</p>
                    <p>I’m SO GLAD I took this free quiz! Highly recommended.</p>
                    <div class="testimonial-profile">
                        <p>Chonna Sy, 36</p>
                        <p>Firm Accountant</p>
                        <p>Wealth archetype: Banker</p>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-4 col-lg-4 mx-auto">
                <div class="testimonial mx-auto"> 
                    <span class="archetype-xs influencer-icon rounded-circle"></span>
                    <p class="testimonial-header">"…like there was a real human coach behind that tells me exactly what to do with my life."</p>
                    <p>I have never found an online quiz that will tell everything I need to know about me until this!</p>
                    <p>I was surprised by the reason behind my materialistic tendencies. All those articles about taming yourself to stop spending are futile if you don’t address the root cause of these tendencies.</p>
                    <p>This reading speaks to me on so many levels and I’m ready to take my wealth to the next level!</p>
                    <div class="testimonial-profile">
                        <p>Michella Azar, 29</p>
                        <p>Junior Architect</p>
                        <p>Wealth archetype: Influencer</p>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-4 col-lg-4 mx-auto">
                <div class="testimonial mx-auto"> 
                    <span class="archetype-xs capitalist-icon rounded-circle"></span>
                    <p class="testimonial-header">"The financial problems I thought would be with me forever now seem like an easy thing to resolve… You won’t regret it…"</p>
                    <p>For people who are looking to reset their mind, gain a new perspective, and see themselves from another point of view - this wealth avatar quiz is for you!</p>
                    <p>I got two valuable takeaways after the avatar assessment: a higher level of confidence to deal with people and a comprehensive guideline to make me richer in a year based on my profile!</p>
                    <p>The reading interacts with me like a person is typing behind in real-time.</p>
                    <p>You won’t regret it!</p>
                    <div class="testimonial-profile">
                        <p>Mary S., 41</p>
                        <p>Business Consulting Agency Founder</p>
                        <p>Wealth archetype: Capitalist</p>
                    </div>
                </div>
            </div>
        </div>
        

        <div id="footer" class="" :class="{'footer-relative': showQuiz ,'footer-fixed': !showQuiz}">
            <div class="footer-logo">
                <img class="img-fluid" src="../assets/img/icon-img/quiz-wealth_avatarr.png">
            </div>
            <p class="small text-center" style="font-family:'Raleway',sans-serif;">&copy; Copyright 2022 wealthavatarr.com, All Rights Reserved</p>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';  

    export default {
        props:
        {
            msg: String
        },
        data () {
            return {
                name: '',
                mail: '',
                mobile_number: '',
                password: '',
                gender: '',
                showQuiz: false,
                currentSet: 0,
                percent: 20,
                errorMessage: '',
                loggedinEmail: '',
                checkEmail: false,

                // THIS questionSet CONTAINS THE COUNTS OF QUESTIONS PER BATCH
                questionSet: [
                    {
                        start: 0,
                        end: 4,
                    },
                    {
                        start: 5,
                        end: 9,
                    },
                    {
                        start: 10,
                        end: 14,
                    },
                    {
                        start: 15,
                        end: 20,
                    },
                ],

                // THIS quiz OBJECT CONTAINS THE LIST OF 21 QUESTIONS
                quiz: {
                        title: "Quiz",
                        questions: [
                            { // Question 1
                                text: 'You get anxious about losing a dollar in your bank account.', // text PROPERTY CONTAINS THE QUESTION ITSELF
                                image: 'q1-500', // image PROPERTY CONTAINS THE NAME OF THE ACTUAL IMAGE ON THE assets/img/quiz-img FOLDER
                                show: true, // show PROPERTY IS THE VISIBILITY OF CORRESPONDING QUESTION
                                answers: [ // THE ANSWERS THAT CORRESPOND TO THE QUESTION
                                    {
                                        text: 'Least Likely', // THE TEXT DISPLAYED FOR THE ANSWER
                                        value:  ["CO","GI","IN"] // THIS ARRAY CONTAINS THE LETTERS AS ABBREVIATION THAT CORRESPOND TO A CATEGORY
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["CA","SA"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["AD"]
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["BA"]
                                    },
                                ]
                            },
                            { // Question 2
                                text: 'You judge people based on how they handle their funds and budget.',
                                image: 'q2-500',
                                show: true,
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["SA","CO","GI"],
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["CA","AD"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["IN"],
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["BA"]
                                    },
                                ]
                            },
                            { // Question 3
                                text: 'You’d rather keep your money in a bank, rather than putting them in any other investment for fear of losing it.',
                                image: 'q3-500',
                                show: true,
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["SA","CO","GI"]
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["CA","AD"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["AD"]
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["BA"]
                                    },
                                ]
                            },
                            { // Question 4
                                text: 'You easily turn your creative ideas into a business proposal.',
                                image: 'q4-500',
                                show: true,
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["BA","GI"]
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["IN","AD"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["CO", "SA"]
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["CA"]
                                    },
                                ]
                            },
                            { // Question 5
                                text: 'You’d rather work than spend a whole day resting.',
                                image: 'q5-500',
                                show: true,
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["SA","GI"]
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["IN","AD"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["CO", "BA"]
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["CA"]
                                    },
                                ]
                            },
                            { // Question 6
                                text: 'Your family members see you as the most workaholic person they ever know.',
                                image: 'q6-500',
                                show: false,
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["SA","GI"]
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["IN","AD"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["CO", "BA"]
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["CA"]
                                    },
                                ]
                            },
                            { // Question 7
                                text: 'You love hanging out with people, old and new acquaintances.',
                                image: 'q7-500',
                                show: false,
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["CA","BA"]
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["GI","CO"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["AD", "IN"]
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["SA"]
                                    },
                                ]
                            },
                            { // Question 8
                                text: 'You credit certain people for your success.',
                                image: 'q8-500',
                                show: false,
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["CA","IN"],
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["BA","CO"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["GI", "AD"],
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["SA"]
                                    },
                                ]
                            },
                            { // Question 9
                                text: 'Your connection with other people is vital to your success.',
                                image: 'q9-500',
                                show: false,
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["BA"]
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["CA","IN", "CO"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["GI", "AD"]
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["SA"]
                                    },
                                ]
                            },
                            { // Question 10
                                text: 'You love taking financial risks.',
                                image: 'q10-500',
                                show: false,
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["BA","SA","GI","AD"],
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["IN"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["CA"]
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["CO"]
                                    },
                                ]
                            },
                            { // Question 11
                                text: 'You’d rather see your investment in big assets in hopes of generating income in the future than opt for small assets for a meager passive income.',
                                image: 'q11-500',
                                show: false,
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["BA","GI","AD"]
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["SA","IN"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["CA"],
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["CO"]
                                    },
                                ]
                            },
                            { // Question 12
                                text: 'You find it hard to trust people (not just with your money, but also with your ideas and responsibilities)',
                                image: 'q12-500',
                                show: false,
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["SA","GI","AD","BA"]
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["IN"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["CA"],
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["CO"]
                                    },
                                ]
                            },
                            { // Question 13
                                text: 'You find it hard to say NO to people who ask for a favor.',
                                image: 'q13-500',
                                show: false,
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["BA", "CA"],
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["CO"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["SA", "IN", "AD"],
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["GI"]
                                    },
                                ]
                            },
                            { // Question 14
                                text: 'You feel like you owe people big time.',
                                image: 'q14-500',
                                show: false,
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["BA", "CA", "CO"]
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["IN"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["SA", "AD"]
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["GI"]
                                    },
                                ]
                            },
                            { // Question 15
                                text: 'You love spoiling people.',
                                image: 'q15-500',
                                show: false,
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["BA", "CA", "CO"]
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["AD"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["SA", "IN"]
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["GI"]
                                    },
                                ]
                            },
                            { // Question 16
                                text: 'You love flaunting your expensive stuff in real life and/or in social media.',
                                image: 'q16-500',
                                show: false,
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["BA", "SA", "AD"]
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["CA", "CO"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["GI"]
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["IN"]
                                    },
                                ]
                            },
                            { // Question 17
                                text: 'You’d rather save money to buy material things that you think you deserve.',
                                image: 'q17-500',
                                show: false,
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["BA", "SA", "CO", "GI"]
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["CA"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["AD"]
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["IN"]
                                    },
                                ]
                            },
                            { // Question 18
                                text: 'You believe that money (and what you do about it) is one of the most effective means to get recognized.',
                                image: 'q18-500',
                                show: false,
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["BA", "SA", "AD", "GI"],
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["CA"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["CO"]
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["IN"]
                                    },
                                ]
                            },
                            { // Question 19
                                text: 'You see yourself leading a social movement.',
                                image: 'q19-500',
                                show: false,
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["BA", "CA", "IN"]
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["CO"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["GI", "SA"]
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["AD"]
                                    },
                                ]
                            },
                            { // Question 20
                                text: 'Money will never make you happy, but relationships will.',
                                image: 'q20-500',
                                show: false,
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["BA", "CA", "IN"]
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["SA"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["CO", "GI"]
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["AD"]
                                    },
                                ]
                            },
                            { // Question 21
                                text: 'You care so much about social injustice.',
                                image: 'q21-500',
                                show: false,
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["BA", "CA", "CO", "IN"]
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["GI"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["SA"]
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["AD"]
                                    },
                                ]
                            },
                        ]
                    },

                questionIndex: 0,
                responses: [],
                errors: [],
                error: '',
                form_errors: [],

                // CONTAINS THE ACCUMULATED POINTS OF EACH CATEGORIES BASED ON THE USER ANSWER
                categoriesPoints: { // ABBREVIATIONS
                    banker: 0,      // banker = BA
                    capitalist: 0,  // capitalist = CA
                    salesPerson: 0, // salesPerson = SA
                    conqueror: 0,   // conqueror = CO
                    giver: 0,       // giver = GI
                    influencer: 0,  // influencer = IN
                    adversary: 0    // adversary = AD
                },

                avatar: '',
                questionStart: 0,
                questionEnd: 2,
                questionBatch: 1,
            }
        },
        created() {
            // TITLE BAR TEXT
            document.title = "Wealth Avatarr";
        },

        methods: {
            // FUNCTION FOR PREVIEWS QUESTION BATCH
            prev: function() {
                this.questionIndex -= 3;
                this.questionStart -= 3;
                this.questionEnd -= 3;
            },
        
            // FUNCTION FOR NEXT QUESTION BATCH
            next: function() {
                var start = this.questionSet[this.currentSet].start;
                var end = this.questionSet[this.currentSet].end;

                for(let i = start; i <= end; i++)
                {
                    
                    if (this.responses[i] === undefined){
                        this.increaseProgressBar();
                        return;
                    }
                    else {

                        if(this.currentSet == 3 && i == end){
                            window.scrollTo(0, 0);
                            this.currentSet += 1;
                            this.tallyScore();
                        }
                        else if(i == end)
                        {
                            window.scrollTo(0, 250);
                            this.currentSet += 1;
                        }
                        this.increaseProgressBar();
                    } 
                }
            },

            // FUNCTION HANDLES THE INCREMENT OF PROGRESS BAR
            increaseProgressBar: function() {
                switch(this.currentSet){
                    case 0:
                        this.percent = 20;
                        break;
                    case 1:
                        this.percent = 40;
                        break;
                    case 2:
                        this.percent = 60;
                        break;
                    case 3:
                        this.percent = 80;
                        break;
                    case 4:
                        this.percent = 85;
                        break;
                }
            },

            // FUNCTION PROCESS THE TALLYING OF THE CATEGORIES SCORE ACCORDING TO USER ANSWERS
            tallyScore: function() {
                var categories = this.categoriesPoints;
                let sortable = [];
                var highestCategory;
                this.responses.forEach(function(response){
                    response.forEach(function(item){
                        if(item == "BA"){
                            categories.banker += 1;
                        }
                        else if(item == "CA"){
                            categories.capitalist += 1;
                        }
                        else if(item == "SA")
                        {
                            categories.salesPerson += 1;
                        }
                        else if(item == "CO"){
                            categories.conqueror += 1;
                        }
                        else if(item == "GI"){
                            categories.giver += 1;
                        }
                        else if(item == "IN"){
                            categories.influencer += 1;
                        }
                        else if(item == "AD"){
                            categories.adversary += 1;
                        }
                    });
                });

                for (var items in categories) {
                    sortable.push([items, categories[items]]);
                }

                sortable.sort(function(a, b) {
                    return a[1] - b[1];
                });

                highestCategory = sortable[6][0];

                if(highestCategory == 'banker')
                    this.avatar = 'Banker';
                else if(highestCategory == 'capitalist')
                    this.avatar = 'Capitalist';
                else if(highestCategory == 'salesPerson')
                    this.avatar = 'Sales Person';
                else if(highestCategory == 'conqueror')
                    this.avatar = 'Conqueror';
                else if(highestCategory == 'giver')
                    this.avatar = 'Giver';
                else if(highestCategory == 'influencer')
                    this.avatar = 'Influencer';
                else if(highestCategory == 'adversary')
                    this.avatar = 'Adversary';
            },

            // FUNCTION REDIRECTS USER TO THE DECLARED URL ADDRESS BELOW
            redirect: function(e) {
                e.preventDefault();

                const data = {
                    archetype: this.avatar,
                    name: this.name,
                    email: this.mail,
                    gender: this.gender,
                    mobile_number: this.mobile_number,
                    password: this.password,
                };
                
                axios.post('/api/apistore',data)
                .then(response => {
                    //this.products = response.data;
                    console.log(response);
                    this.errorMessage = '';
                    
                    let urlAddress = "https://wealthavatarr.com/redirect?avatar=" + this.avatar + "&name=" + this.name + "&mail=" + this.mail
                    window.location.href = urlAddress;
                })
                .catch(error => {
                    console.log(error);
                    if (error.response && error.response.data && error.response.data.errors) {
                        // Display the first error message returned from the server
                        this.errorMessage = error.response.data.errors[Object.keys(error.response.data.errors)[0]];
                    } else {
                        this.errorMessage = 'An error occurred during registration.';
                    }
                });
            },

            checkemail: function(e) {
                axios.get('/api/checkemail')
                .then(response => {
                    this.checkemail = response.data;
                })
                .catch(error => {
                    this.checkemail = false;
                });
            },

            loggedinEmail: function(e) {

                this.loggedinEmail = '';
                
                // axios.get('/api/loggedinEmail')
                // .then(response => {
                //     this.loggedinEmail = response.data;
                // })
                // .catch(error => {
                //     this.loggedinEmail = '';
                // });
            }

            // FUNCTION HANDLES THE VIEWING OF EACH QUESTION
            showQuestion: function(value) {
                var show = false;
                if(this.currentSet <= 3)
                {
                    var start = this.questionSet[this.currentSet].start;
                    var end = this.questionSet[this.currentSet].end;
                    
                    if(value >= start && value <= end)
                        show = true;
                    else
                        show = false;
                }
                return show;
            },
        }
    }
</script>