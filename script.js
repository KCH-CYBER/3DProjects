<link rel="stylesheet" href="styles.css">
<script src="script.js"></script>
// Konfiguracja Firebase
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Rejestracja użytkownika
document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            alert("Rejestracja zakończona sukcesem!");
        })
        .catch(error => alert(error.message));
});

// Logowanie użytkownika
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            alert("Zalogowano pomyślnie!");
        })
        .catch(error => alert(error.message));
});
const favoriteButtons = document.querySelectorAll('.favorite-btn');

favoriteButtons.forEach(button => {
    button.addEventListener('click', () => {
        const projectId = button.parentElement.getAttribute('data-id');
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        if (!favorites.includes(projectId)) {
            favorites.push(projectId);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            alert("Dodano do ulubionych!");
        } else {
            alert("Projekt już znajduje się w ulubionych.");
        }
    });
});
const express = require('express');
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY');
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'pln',
                    product_data: {
                        name: 'Subskrypcja 3D Projects',
                    },
                    unit_amount: 2000, // 20 zł
                },
                quantity: 1,
            },
        ],
        mode: 'subscription',
        success_url: 'https://your-site.com/success',
        cancel_url: 'https://your-site.com/cancel',
    });

    res.json({ id: session.id });
});

app.listen(3000, () => console.log("Serwer działa na porcie 3000"));
document.getElementById('search-input').addEventListener('input', (e) => {
    const searchValue = e.target.value.toLowerCase();
    const projects = document.querySelectorAll('.project');

    projects.forEach(project => {
        const isVisible = project.textContent.toLowerCase().includes(searchValue);
        project.style.display = isVisible ? 'block' : 'none';
    });
});
// Inicjalizacja Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('3d-viewer').appendChild(renderer.domElement);

// Dodanie światła
const light = new THREE.PointLight(0xffffff, 1, 500);
light.position.set(10, 10, 10);
scene.add(light);

// Ładowanie modelu
const loader = new THREE.GLTFLoader();
loader.load('path-to-model.gltf', (gltf) => {
    scene.add(gltf.scene);
    renderer.render(scene, camera);
});

camera.position.z = 5;
