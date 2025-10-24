"use client";

import React, { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import * as random from "maath/random";

/* =================== NEBULA LAYER (shader) =================== */
type NebulaProps = {
    scale: number;
    speed: number;
    intensity: number;
    hueShift: number;
    alpha: number;
    z: number;
    dustStrength?: number;
};

function NebulaLayer({
                         scale,
                         speed,
                         intensity,
                         hueShift,
                         alpha,
                         z,
                         dustStrength = 0.35,
                     }: NebulaProps) {
    const material = useMemo(
        () =>
            new THREE.ShaderMaterial({
                transparent: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
                uniforms: {
                    uTime: { value: 0 },
                    uScale: { value: scale },
                    uSpeed: { value: speed },
                    uIntensity: { value: intensity },
                    uHueShift: { value: hueShift },
                    uAlpha: { value: alpha },
                    uDustStrength: { value: dustStrength },
                    uAspect: { value: 1 },
                },
                vertexShader: /* glsl */ `
          varying vec2 vUv;
          void main(){
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }
        `,
                fragmentShader: /* glsl */ `
          vec2 rot2D(vec2 p, float a){ float s=sin(a), c=cos(a); return mat2(c,-s,s,c)*p; }
          float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
          float noise(vec2 p){
            vec2 i=floor(p), f=fract(p);
            float a=hash(i), b=hash(i+vec2(1.,0.)), c=hash(i+vec2(0.,1.)), d=hash(i+vec2(1.,1.));
            vec2 u=f*f*(3.-2.*f);
            return mix(a,b,u.x) + (c-a)*u.y*(1.-u.x) + (d-b)*u.x*u.y;
          }
          float fbm(vec2 p){
            float v=0., a=.5;
            for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.02; a*=.55; }
            return v;
          }
          float ridge(vec2 p){
            float v=0., a=.5;
            for(int i=0;i<4;i++){
              float n = 1.0 - abs(2.0*noise(p)-1.0);
              v += a*n; p*=2.2; a*=.6;
            }
            return v;
          }
          vec3 purplePalette(float t, float h){
            vec3 a = vec3(0.30,0.10,0.55);
            vec3 b = vec3(0.55,0.18,0.95);
            vec3 c = vec3(0.35,0.78,1.00);
            vec3 col = mix(a,b, smoothstep(0.0,0.6,t));
            col = mix(col,c, smoothstep(0.5,1.0,t));
            col.rg *= (0.95 + 0.10*h);
            col.b  *= (1.00 + 0.20*h);
            return col;
          }

          varying vec2 vUv;
          uniform float uTime, uScale, uSpeed, uIntensity, uHueShift, uAlpha, uDustStrength, uAspect;

          void main(){
            vec2 uv = vUv*2.0-1.0;
            uv.x *= 1.6 * uAspect;
            uv.y *= 1.2;

            float t = uTime * uSpeed;
            vec2 p = uv * uScale;

            vec2 q = vec2(
              fbm(p + vec2(0.0, t*0.35)),
              fbm(p + vec2(5.2, -t*0.25))
            );
            vec2 r = vec2(
              fbm(p + rot2D(q, 1.2) + vec2(1.7, -t*0.18)),
              fbm(p + rot2D(q,-1.8) + vec2(-3.1,  t*0.22))
            );

            float neb = fbm(p + 3.5*q + 2.0*r);

            float lane = ridge(p*0.6 + vec2(0.0, t*0.08));
            lane = smoothstep(0.55, 0.85, lane);
            float darkMask = 1.0 - uDustStrength * lane;

            float radial = smoothstep(1.4, 0.2, length(uv));
            float glow = smoothstep(0.35, 0.95, neb) * radial;

            vec3 col = purplePalette(neb, uHueShift);
            col *= (0.35 + 0.75*glow);
            col *= darkMask;

            float sparks = smoothstep(0.86, 1.0, neb) * 0.25;
            col += vec3(0.9,0.85,1.0) * sparks * 0.15;

            gl_FragColor = vec4(col * uIntensity, (0.55*glow + 0.25*neb) * uAlpha);
          }
        `,
            }),
        [alpha, dustStrength, hueShift, intensity, scale, speed]
    );

    useFrame(({ size }, dt) => {
        material.uniforms.uTime.value += dt;
        material.uniforms.uAspect.value = size.width / Math.max(1, size.height);
    });

    return (
        <mesh position={[0, 0, z]} renderOrder={-2}>
            <planeGeometry args={[6, 4, 1, 1]} />
            {/* @ts-ignore */}
            <primitive attach="material" object={material} />
        </mesh>
    );
}

/* =================== DUST OVERLAY (frente) =================== */
function DustOverlay({ z = -1.23, strength = 0.35 }) {
    const material = useMemo(
        () =>
            new THREE.ShaderMaterial({
                transparent: true,
                depthWrite: false,
                blending: THREE.MultiplyBlending,
                uniforms: { uTime: { value: 0 }, uStrength: { value: strength } },
                vertexShader: `
          varying vec2 vUv;
          void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
        `,
                fragmentShader: `
          varying vec2 vUv; uniform float uTime; uniform float uStrength;
          float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
          float noise(vec2 p){ vec2 i=floor(p), f=fract(p); float a=hash(i), b=hash(i+vec2(1.,0.)), c=hash(i+vec2(0.,1.)), d=hash(i+vec2(1.,1.));
            vec2 u=f*f*(3.-2.*f); return mix(a,b,u.x)+ (c-a)*u.y*(1.-u.x)+ (d-b)*u.x*u.y; }
          float fbm(vec2 p){ float v=0., a=.5; for(int i=0;i<4;i++){ v+=a*noise(p); p*=2.2; a*=.55; } return v; }
          void main(){
            vec2 uv = vUv*2.0-1.0; uv.x *= 1.4;
            float t = uTime * 0.05;
            float d = fbm(uv*0.9 + vec2(0.0,t)) * 0.7 + fbm(uv*2.1 - vec2(t*0.6,0.0))*0.3;
            float mask = smoothstep(0.35, 0.85, d);
            float darkness = mix(1.0, 0.65, mask*uStrength);
            gl_FragColor = vec4(vec3(darkness), 1.0);
          }
        `,
            }),
        [strength]
    );

    useFrame((_, dt) => {
        material.uniforms.uTime.value += dt;
    });

    return (
        <mesh position={[0, 0, z]} renderOrder={-1}>
            <planeGeometry args={[6, 4, 1, 1]} />
            {/* @ts-ignore */}
            <primitive attach="material" object={material} />
        </mesh>
    );
}

/* =================== STARS (seu template intacto) =================== */
export const StarBackground = (props: any) => {
    const ref = useRef<THREE.Points | null>(null);
    const [sphere] = useState(() =>
        random.inSphere(new Float32Array(5000), { radius: 1.2 })
    );

    useFrame((_state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points
                ref={ref}
                stride={3}
                positions={new Float32Array(sphere)}
                frustumCulled
                {...props}
            >
                <PointMaterial
                    transparent
                    color="#fff"
                    size={0.002}
                    sizeAttenuation
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    opacity={0.95}
                />
            </Points>
        </group>
    );
};

/* =================== CANVAS (named + default) =================== */
export const StarsCanvas = () => (
    <div className="w-full h-auto fixed inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 1] }}>
            <Suspense fallback={null}>
                {/* fundo distante */}
                <NebulaLayer
                    scale={1.2}
                    speed={0.25}
                    intensity={0.75}
                    hueShift={0.08}
                    alpha={0.9}
                    z={-1.6}
                    dustStrength={0.25}
                />
                {/* frente detalhada */}
                <NebulaLayer
                    scale={1.8}
                    speed={0.45}
                    intensity={1.0}
                    hueShift={-0.05}
                    alpha={0.85}
                    z={-1.25}
                    dustStrength={0.4}
                />
                {/* faixa escura multiplicativa */}
                <DustOverlay z={-1.23} strength={0.35} />

                {/* estrelas: composição/velocidade originais */}
                <StarBackground />
                <Preload all />
            </Suspense>
        </Canvas>
    </div>
);

// suporta import default e named
export default StarsCanvas;