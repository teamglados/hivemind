# HiveMind

![Banner](https://raw.githubusercontent.com/nardeas/hivemind/master/media/screen0.png)

> Virtual peer learning environment for the social distancing era, allowing students to come together and interact in real-time to get the benefits of physical exercise groups. Help each other pass the course through discussion and story-like hints. Study, solve problems and learn.

## See it in action

[[Video]](https://vimeo.com/476775587) [[Source]](https://github.com/teamglados/hivemind) [[Webapp]](https://www.hivemindlive.com) (disabled)

## Description

One of the main challenges in the social distancing era for students is to bring back the peer learning experience. Social interactions with fellow students is a crucial aspect in maintaining mental well-being and to learning efficiently. Static course materials and virtual lectures can only get students so far - without interaction and group think with peers the learning process becomes extra challenging and the lack of social activity and mutual support easily becomes a heavy burden.

HiveMind aims to solve this by bringing back the peer learning experience through an easy to use web-interface for course exercises. Users are allowed to solve course related exercises with fellow students in real-time. If you're stuck on an exercise it often helps to discuss with others to get new perspectives to approaching the problem. Sometimes the discussion proves extra fruitful and everyone gains more insights than working alone. Additionally, explaining ideas to others is often a very efficient way to learn in itself.

Through a clever incentivization scheme HiveMind allows students to share their insights on the exercises through discussion, "story"-like hints and a scoring system that allows students to gain exemptions in course marks for helping others. For example, a student stuck on an exercise can choose to:

- Start a discussion with someone else currently working on the exercise to share ideas
- View a hint by other students that have previously solved the exercise to accelerate progress

Additionally, we've devised a scoring system with a goal to incentivize students to share and socialize with others, creating a win-win course completion and a healthy learning environment even in online settings.

### 0. Basics

The functional idea is demonstrated via slick web-application that could be integrated as a component to various course administration systems already in use in educational organizations. Students could use their organization credentials to authenticate to easily associate their invidual progress to their curriculum.

![Exercises](https://raw.githubusercontent.com/nardeas/hivemind/master/media/screen5.png)

### 1. Solving Exercises

For each course, users are given a list of exercises that they need to solve in order to pass the course. In this example, we use generic riddles for demonstration purposes:

![Exercises](https://raw.githubusercontent.com/nardeas/hivemind/master/media/screen1.png)

### 2. Exercise Hints

Upon successfully completing an exercise, the students are given the ability to share their insights to other students by writing "hints" that can be viewed by others working on that exercise. The hint should not reveal the true answer but instead help with the thought process. By using artificial intelligence based semantic similarity this can be handled automatically without an extra review process.

![Success](https://raw.githubusercontent.com/nardeas/hivemind/master/media/screen2.png)
![Success](https://raw.githubusercontent.com/nardeas/hivemind/master/media/screen3.png)

### 3. Score Based Incentivization

Opening a hint may help one to get through the problem but it also adds a penalty to the total course score. On the other hand, users earn score points by getting upvoted on their helpful hints for others. This creates a balance between helping others and just lazy completion of the course without thinking and studying. 

![Hint Penalty](https://raw.githubusercontent.com/nardeas/hivemind/master/media/screen4.png)

The total course grade is affected by the student's activity through discussions, hints and learning.

### 4. Different Learning Personas

Users can't just exploit the hints to complete the full course as each hint adds a penalty to the total score that may not be enough to complete the course in the end. They are encouraged to engage in discussions to get and share new ideas with others. Scoring extra points can provide exemptions. Earning extra scores through helping others also compensates users that have difficulties.

Additionally, advanced users are allowed to proceed in their own pace as none of the features are mandatory to completing the course.
