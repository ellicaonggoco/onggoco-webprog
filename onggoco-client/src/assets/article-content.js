import ncII from "../assets/logo/ncII.jpg";
import mitigate from "../assets/logo/mitigate.jpg";
import heuristic from "../assets/logo/heuristic.jpg";
import gunita from "../assets/logo/gunita.jpg";
import foure from "../assets/logo/fourelugawan.jpg";

const articles = [
  {
    name: "mitigating-plus-mern-migration",
    title: "Beyond the Mobile App: Migrating MitigatePlus to MERN",
    image: mitigate,
    content: [
      "Originally envisioned as a Flutter mobile application, MitigatePlus is transitioning into a full-stack web ecosystem using the MERN stack.",
      "The shift to MongoDB and Node.js allows for more robust geospatial data handling and real-time community alerts across Metro Manila.",
      "This migration focuses on creating a high-performance backend that can handle simultaneous data feeds from multiple disaster risk sensors.",
      "By centralizing the architecture, we ensure that both mobile users and web administrators have access to the same critical safety information.",
    ],
  },
  {
    name: "ux-heuristic-redesign",
    title: "Heuristic Evaluation: Redesigning User Flows",
    image: heuristic,
    content: [
      "Using Jakob Nielsen's 10 Usability Heuristics, I conducted a deep-dive evaluation into modern social and functional interfaces.",
      "One major project involved identifying friction points in mobile navigation and proposing 'Matte Charcoal' design systems to reduce cognitive load.",
      "Applying the 'Visibility of System Status' heuristic was key in redesigning feedback loops for real-time applications.",
      "Prototyping these solutions in Figma allowed for rapid iteration before the coding phase in React and Tailwind began.",
    ],
  },
  {
    name: "ncii-technical-standards",
    title: "Standards of Excellence: My NCII Journey",
    image: ncII,
    content: [
      "Earning a National Certificate II (NCII) was a pivotal step in mastering technical workflows and system diagnostics.",
      "This certification reflects a commitment to industry-standard practices in computer systems and network infrastructure.",
      "The rigorous training at National University provided a grounded understanding of how hardware and software must interlock seamlessly.",
      "This technical foundation now guides my approach to building stable, production-ready web and mobile architectures.",
    ],
  },
  {
    name: "digital-storytelling-masarap-pag-buo",
    title: "Creative Direction in Digital Storytelling",
    image: gunita,
    content: [
      "Beyond coding, I served as a photographer and social media manager for the short film project 'Masarap Pag Buo'.",
      "Managing the digital marketing campaign required a blend of technical organization and creative visual communication.",
      "Coordinating with directors and cast members for character reveals taught me the importance of cohesive branding across platforms.",
      "This experience in film marketing reinforced my belief that every technical project needs a strong, human-centered narrative.",
    ],
  },
  {
    name: "heuristic-evaluation-web-design",
    title: "Mastering UI/UX: Applying Nielsen’s 10 Heuristics",
    image: foure,
    content: [
      "In my journey as an IT student, I've learned that great software isn't just about code; it's about the user experience.",
      "I recently conducted a deep-dive heuristic evaluation of major platforms, identifying usability violations and proposing data-driven redesigns.",
      "By applying principles like 'Visibility of System Status' and 'Error Prevention,' I transformed complex interfaces into intuitive, user-friendly layouts.",
      "Using Figma for prototyping allowed me to iterate quickly, ensuring my designs meet the highest standards of modern accessibility and usability.",
    ],
  },
];

export default articles;
