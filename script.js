let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi-GB";
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Sir");
    } else {
        speak("Good Evening Sir");
    }
}

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
    recognition.start();
    voice.style.display = "block";
    btn.style.display = "none";
});

function takeCommand(message) {
    voice.style.display = "none";
    btn.style.display = "flex";
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello Sir, what can I help you with?");
    } else if (message.includes("who are you")) {
        speak("I am Deadnox, your virtual assistant, created by Vedant.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://youtube.com/", "_blank");
    } else if (message.includes("weather")) {
        speak("Fetching weather information...");
        window.open("https://www.weather.com/", "_blank");
    } else if (message.includes("joke")) {
        tellJoke();
    } else if (message.includes("set a reminder")) {
        setReminder(message);
    } else if (message.includes("calculate")) {
        calculate(message);
    } else if (message.includes("play")) {
        playMusic(message);
    } else if (message.includes("news")) {
        speak("Opening the latest news...");
        window.open("https://news.google.com/", "_blank");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The time is " + time);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak("Today's date is " + date);
    } else {
        let finalText = "This is what I found on the internet regarding " + 
            message.replace("Deadnox", "").trim();
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message.replace("Deadnox", "").trim()}`, "_blank");
    }
}

// Additional Features
function tellJoke() {
    const jokes = [
        "Why don't skeletons fight each other? They don't have the guts.",
        "I'm reading a book about anti-gravity. It's impossible to put down!",
        "Why did the scarecrow win an award? Because he was outstanding in his field!"
    ];
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    speak(randomJoke);
}

function setReminder(message) {
    let reminderTime = 5000; // Default reminder after 5 seconds
    if (message.includes("after")) {
        const time = message.match(/\d+/);
        if (time) {
            reminderTime = parseInt(time[0]) * 1000;
        }
    }
    speak("Reminder set. I will remind you shortly.");
    setTimeout(() => {
        speak("Sir, this is your reminder.");
    }, reminderTime);
}

function calculate(message) {
    try {
        const mathExpression = message.replace("calculate", "").trim();
        const result = eval(mathExpression);
        speak(`The result is ${result}`);
    } catch (error) {
        speak("I couldn't calculate that. Please try again.");
    }
}

function playMusic(message) {
    const songName = message.replace("play", "").trim();
    speak(`Searching for ${songName} on YouTube...`);
    window.open(`https://www.youtube.com/results?search_query=${songName}`, "_blank");
}
