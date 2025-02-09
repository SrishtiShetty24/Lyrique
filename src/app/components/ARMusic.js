import 'aframe';
import { useEffect } from 'react';

const ARMusic = () => {
    useEffect(() => {
        console.log('A-Frame ARMusic Component Loaded');
    }, []);

    return (
        <a-scene embedded arjs>
            <a-marker preset="hiro">
                <a-entity
                    geometry="primitive: box"
                    material="color: red"
                    position="0 0.5 0"
                    animation="property: rotation; to: 0 360 0; loop: true; dur: 3000"
                ></a-entity>
            </a-marker>
            <a-entity camera></a-entity>
        </a-scene>
    );
};

export default ARMusic;

