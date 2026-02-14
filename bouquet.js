function openMsg(text, flowerImg) {
    const clickedFlower = window.event.target;
    const rect = clickedFlower.getBoundingClientRect();
    const wrapper = document.querySelector('.bouquet-wrapper');
    const ribbon = document.querySelector('.bottom-text-container');

    // 1. Add the blur effect
    if (wrapper) wrapper.classList.add('searching');
    if (ribbon) ribbon.classList.add('searching');

    // 2. Create the "Ghost" flower
    const ghost = document.createElement('img');
    ghost.src = flowerImg;
    ghost.className = 'flying-flower';
    
    // Set initial position exactly over the clicked flower
    ghost.style.position = 'fixed';
    ghost.style.left = rect.left + 'px';
    ghost.style.top = rect.top + 'px';
    ghost.style.width = rect.width + 'px';
    document.body.appendChild(ghost);

    // 3. Start the slow flight to the center
    setTimeout(() => {
        ghost.style.left = '50%';
        ghost.style.top = '20%';
        // Use transform to center it perfectly and scale it up
        ghost.style.transform = 'translate(-50%, 0) scale(1.5) rotate(10deg)';
    }, 50);

    // 4. Reveal the Modal after 2 seconds
    setTimeout(() => {
        const modal = document.getElementById('msgModal');
        const modalImg = document.getElementById('modalFlower');
        
        document.getElementById('msgText').innerText = text;
        modalImg.src = flowerImg;
        
        modal.style.display = 'flex'; // Trigger the display
        
        // Brief delay to allow 'display: flex' to register before fading in
        setTimeout(() => {
            modal.classList.add('show');
        }, 50);

        // Remove the ghost flower now that modal is open
        ghost.remove();
    }, 2000); 
}

// Don't forget to update your closeMsg to match the folding logic!
function closeMsg() {
    const modal = document.getElementById('msgModal');
    const wrapper = document.querySelector('.bouquet-wrapper');
    const ribbon = document.querySelector('.bottom-text-container');

    modal.classList.remove('show');
    
    // Remove blur effects
    if (wrapper) wrapper.classList.remove('searching');
    if (ribbon) ribbon.classList.remove('searching');

    setTimeout(() => {
        modal.style.display = 'none';
    }, 1000);
}

// --- PHOTO SWITCHING LOGIC ---
const leftPhotos = [
    { src: "side-photo1.jpeg", text: "You are my calm in chaos, my comfort in long days, my safe place without walls." },
    { src: "side_photo3.jpeg", text: "With you, everything feels softer. Even silence feels full when it’s shared with you." },
    { src: "side_photo5.jpeg", text: "If I could choose again, in every lifetime, I would still choose you." },
    { src: "WhatsApp Image 2026-02-15 at 3.41.39 AM.jpeg", text: "Loving you feels like watching the sunrise after the longest night, soft, warm, and full of promise I never knew I needed." },
    { src: "side-photo10.jpeg", text: "You are the kind of beautiful that doesn’t just stay in the eyes, it sinks into the soul and makes it bloom." },
    { src: "side-photo11.jpeg", text: "My heart doesn’t just beat for you, it leans toward you, like it knows where it belongs." },
    { src: "WhatsApp Image 2026-02-15 at 3.41.36 AM (1).jpeg", text: "Being with you feels like coming home to a place I never knew existed until I found you." },
    { src: "WhatsApp Image 2026-02-15 at 3.41.36 AM.jpeg", text: "Every time you smile, it feels like the universe secretly choosing me and saying, “Here, this is your happiness.”" },
    { src: "WhatsApp Image 2026-02-15 at 3.41.37 AM (1).jpeg", text: "I love you more than words can say." },
    { src: "WhatsApp Image 2026-02-15 at 3.41.37 AM.jpeg", text: "Your voice is my favorite sound, the one that can turn my worst day into something soft and survivable." },
    { src: "WhatsApp Image 2026-02-15 at 3.41.41 AM (2).jpeg", text: "I don’t just love you for who you are, I love you for the way you make me softer, kinder, and braver." },
    { src: "WhatsApp Image 2026-02-15 at 3.41.41 AM.jpeg", text: "You are the gentle light that makes even my darkest thoughts lose their power." },
    { src: "WhatsApp Image 2026-02-15 at 3.41.42 AM.jpeg", text: "If forever had a face, I’m sure it would look like you looking at me with that quiet, knowing love." }
];

const rightPhotos = [
    { src: "side_photo2.jpeg", text: "Your smile is my favorite view. It’s the kind of light that makes my whole world brighter." },
    { src: "side_photo4.jpeg", text: "Loving you feels easy. Natural. Like my heart already knew you before we even met." },
    { src: "side_photo6.jpeg", text: "You are not just someone I love. You are my heart’s home." },
    { src: "WhatsApp Image 2026-02-15 at 3.41.38 AM (1).jpeg", text: "You are the warmth in my chest when I think about the future, the reason it doesn’t scare me anymore." },
    { src: "WhatsApp Image 2026-02-15 at 3.41.38 AM (2).jpeg", text: "I love the way your presence alone can quiet my overthinking and make my heart feel safe." },
    { src: "WhatsApp Image 2026-02-15 at 3.41.38 AM.jpeg", text: "I don’t want a perfect life, I just want a life where I get to hold your hand through all of it." },
    { src: "WhatsApp Image 2026-02-15 at 3.41.39 AM (1).jpeg", text: "Loving you is not loud or dramatic, it’s steady, deep, and certain like roots growing stronger every day." },
    { src: "WhatsApp Image 2026-02-15 at 3.41.39 AM (2).jpeg", text: "You are the softest chapter in my story, the one I never want to end." },
    { src: "WhatsApp Image 2026-02-15 at 3.41.39 AM (3).jpeg", text: "When I say I miss you, it’s not just a thought, it’s a small ache that reminds me how much you matter." },
    { src: "WhatsApp Image 2026-02-15 at 3.41.40 AM (1).jpeg", text: "If I had to choose one place to stay forever, it would be in the warmth of your arms." },
    { src: "WhatsApp Image 2026-02-15 at 3.41.40 AM (2).jpeg", text: "You are my favorite feeling, the one I never get tired of, the one I always want more of." },
    { src: "WhatsApp Image 2026-02-15 at 3.41.40 AM.jpeg", text: "I don’t just want you in my present, I want you in every tomorrow I get lucky enough to have." },
    { src: "WhatsApp Image 2026-02-15 at 3.41.41 AM (1).jpeg", text: "I don’t love you in a loud, temporary way; I love you in the quiet, forever kind of way where even on ordinary days, when nothing special is happening, I still look at you and think, “Out of everyone in this world, I’m so unbelievably lucky it’s you.”" }
];

let photoIdx = 0;

function switchPhotos() {
    const leftEl = document.getElementById('leftImg').parentElement;
    const rightEl = document.getElementById('rightImg').parentElement;
    
    // Select the specific caption elements
    const leftCap = document.querySelector('.cap-left');
    const rightCap = document.querySelector('.cap-right');

    // 1. Fade out the whole frame
    leftEl.style.opacity = 0;
    rightEl.style.opacity = 0;

    setTimeout(() => {
        // 2. Increment the index
        photoIdx = (photoIdx + 1) % leftPhotos.length;

        // 3. Update BOTH Images
        document.getElementById('leftImg').src = leftPhotos[photoIdx].src;
        document.getElementById('rightImg').src = rightPhotos[photoIdx].src;

        // 4. Update BOTH Captions (This is the part that was stuck!)
        if (leftCap) leftCap.innerText = leftPhotos[photoIdx].text;
        if (rightCap) rightCap.innerText = rightPhotos[photoIdx].text;
        
        // 5. Fade back in
        leftEl.style.opacity = 1;
        rightEl.style.opacity = 1;
    }, 1000); // Wait for fade out to finish
}

// Switch photos every 5 seconds
setInterval(switchPhotos, 5000);

// --- MUSIC LOGIC ---
function toggleMusic() {
    const audio = document.getElementById('bgMusic');
    const btn = document.getElementById('musicBtn');
    if (audio.paused) {
        audio.play();
        btn.innerText = "⏸️";
    } else {
        audio.pause();
        btn.innerText = "🎵";
    }
}

// Keep your existing openMsg and closeMsg below...
const textElement = document.getElementById('dynamicText');
const messages = [
    "Happy Valentine's Day",
    "Pick a flower for a surprise",
    "Each petal holds a secret",
    "Made with love for you"
];
let messageIndex = 0;

function rotateText() {
    textElement.style.opacity = 0; // Fade out
    
    setTimeout(() => {
        messageIndex = (messageIndex + 1) % messages.length;
        textElement.innerText = messages[messageIndex];
        textElement.style.opacity = 1; // Fade in
    }, 800);
}
// Change the message every 4 seconds
setInterval(rotateText, 4000);