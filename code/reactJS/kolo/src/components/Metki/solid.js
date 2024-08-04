import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
	Box,
	Sphere,
	Icosahedron,
	Tetrahedron,
	Dodecahedron,
	Octahedron,
	Edges,
} from "@react-three/drei";

import { solidsAttrs } from "./geometryUtils";

const ZOOM_SOLID = 1.1;

export default function Solid({ type, sideLength, rotationSpeed, hideFaces }) {
	const meshRef = useRef();
	useFrame(() => {
		if (meshRef.current) {
			meshRef.current.rotation.x += rotationSpeed.x * 0.01;
			meshRef.current.rotation.y += rotationSpeed.y * 0.01;
			meshRef.current.rotation.z += rotationSpeed.z * 0.01;
		}
	});

	sideLength = ZOOM_SOLID;

	const { color, edgeColor } = solidsAttrs[type] || {};

	const commonProps = {
		ref: meshRef,
		args: [sideLength],
		position: [0, 0, 0],
	};

	const materialProps = hideFaces
		? { transparent: true, opacity: 0 }
		: { color };

	return (
		<>
			{type === "sphere" && (
				<Sphere {...commonProps} args={[sideLength, 32, 32]}>
					<meshStandardMaterial attach="material" {...materialProps} />
					<Edges color={edgeColor} />
					<meshStandardMaterial attach="shadow" color="green" />
				</Sphere>
			)}
			{type === "icosahedron" && (
				<Icosahedron {...commonProps} args={[sideLength, 0]}>
					<meshStandardMaterial attach="material" {...materialProps} />
					<Edges color={edgeColor} />
					<meshStandardMaterial attach="shadow" color="green" />
				</Icosahedron>
			)}
			{type === "tetrahedron" && (
				<Tetrahedron {...commonProps}>
					<meshStandardMaterial attach="material" {...materialProps} />
					<Edges color={edgeColor} />
					<meshStandardMaterial attach="shadow" color="green" />
				</Tetrahedron>
			)}
			{type === "dodecahedron" && (
				<Dodecahedron {...commonProps}>
					<meshStandardMaterial attach="material" {...materialProps} />
					<Edges color={edgeColor} />
					<meshStandardMaterial attach="shadow" color="green" />
				</Dodecahedron>
			)}
			{type === "octahedron" && (
				<Octahedron {...commonProps}>
					<meshStandardMaterial attach="material" {...materialProps} />
					<Edges color={edgeColor} />
					<meshStandardMaterial attach="shadow" color="green" />
				</Octahedron>
			)}
			{type === "hexagon" && (
				<Box {...commonProps} args={[sideLength, sideLength, sideLength]}>
					<meshStandardMaterial attach="material" {...materialProps} />
					<Edges color={edgeColor} />
					<meshStandardMaterial attach="shadow" color="green" />
				</Box>
			)}
			{type === "star_dodecahedron" && (
				<Dodecahedron {...commonProps}>
					<meshStandardMaterial attach="material" {...materialProps} />
					<Edges color={edgeColor} />
					<meshStandardMaterial attach="shadow" color="green" />
				</Dodecahedron>
			)}
		</>
	);
}
