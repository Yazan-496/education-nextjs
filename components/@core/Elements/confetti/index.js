import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const Celebration = ({type}) => {
    console.log(type)
    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: {
                    color: {
                        value: "transparent",
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: ["#bf2d2d", "#447ff1", '#14a44d', '#e4a11b'],
                    },
                    links: {
                        color: "transparent",
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 6,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 150,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: type === 'success' ? ["star", 'polygon', "image"] : type === "failed" ? ["image"] : null,
                        images: type === 'failed' ? [{
                            src: "/images/sad1.png",
                            width: 10,
                            height: 10
                        },{
                            src: "/images/sad2.png",
                            width: 10,
                            height: 10
                        },{
                            src: "/images/sad3.png",
                            width: 10,
                            height: 10
                        },{
                            src: "/images/sad4.png",
                            width: 10,
                            height: 10
                        }] : type === "success" ? [{
                            src: "/images/happy1.png",
                            width: 10,
                            height: 10
                        },{
                            src: "/images/happy2.png",
                            width: 10,
                            height: 10
                        }] : [],
                    },
                    size: {
                        value: { min: 5, max: 15 },
                    },
                },
                detectRetina: true,
            }}
        />
    );
}
export default Celebration