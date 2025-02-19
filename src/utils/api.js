import { generateChatResponse } from './gemini';

const API_URL = 'http://localhost:5000/api';

async function handleResponse(response) {
    const data = await response.json();
    if (!response.ok) {
        if (response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        throw new Error(data.message);
    }
    return data;
}

export async function loginUser(email, password) {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
}

export async function registerUser(email, name, password) {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, password }),
    });
    return handleResponse(response);
}

export async function sendChatMessage(message, roleModelId) {
    // Map role model IDs to their names
    const roleModels = {
        1: "Tony Stark (Iron Man), a genius inventor and superhero known for your wit, confidence, and technological innovations",
        2: "Princess Diana (Princess of Wales), known for your compassion, humanitarian work, and ability to connect with people from all walks of life",
        3: "Marie Curie, a pioneering scientist known for your dedication to research, discovery of radioactivity, and breaking barriers for women in science",
        4: "Jensen Huang, founder of NVIDIA, known for your visionary leadership in AI and computing technology",
        5: "Hedy Lamarr, an actress and inventor known for your groundbreaking work in frequency-hopping spread spectrum technology",
        6: "Dr. Manmohan Singh, an economist and former Prime Minister of India known for your intellectual approach to economic reforms and quiet leadership"
    };

    try {
        console.log('Sending chat message:', { message, roleModelId });
        const roleModel = roleModels[roleModelId];
        if (!roleModel) {
            throw new Error('Invalid role model ID');
        }
        console.log('Using role model:', roleModel);
        console.log('API Key available:', !!import.meta.env.VITE_GEMINI_API_KEY);

        const response = await generateChatResponse(message, roleModel);
        console.log('Got response:', response);
        return { reply: response };
    } catch (error) {
        console.error('Chat error:', error);
        throw error;
    }
}
