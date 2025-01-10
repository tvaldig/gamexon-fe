const About = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
            <h1>About Gamexon Rent-Game-Cafe</h1>
            <p>
                <strong>Gamexon Rent-Game-Cafe</strong> is a modern solution for game rentals, seamlessly integrated with a personalized cloud café experience. 
                The platform combines gaming and technology to offer users a unique environment where they can rent games and enjoy a personalized café atmosphere tailored to their preferences.
            </p>
            <p>
                This project is part of my coursework for the <strong>Integrated Technology Course</strong>, showcasing the implementation of a 
                microservices-based backend architecture. Each service is designed to operate independently while communicating efficiently, ensuring scalability and maintainability.
            </p>
            <h2>Key Features:</h2>
            <ul style={{ padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color:'white' }}>
                <li><strong>Game Rental Services:</strong> Rent games from a wide selection and enjoy a personalized gaming experience.</li>
                <li><strong>Cloud Café Integration:</strong> Combine gaming with a customized café environment for ultimate comfort.</li>
                <li><strong>Microservices Architecture:</strong> Ensures high scalability, modularity, and easy maintenance for the backend.</li>
            </ul>
            <p>
                To learn more about the technical details and API documentation, visit the project's <a href="https://github.com/tvaldig/API-TST" target="_blank" rel="noopener noreferrer">GitHub Repository</a>.
            </p>
        </div>
    );
};

export default About;
