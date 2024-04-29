"use client";
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { Github, Mail, Linkedin } from "lucide-react";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";

const socials = [
	{
		icon: <Mail size={20} />,
		href: "mailto:nakar.tamir@gmail.com",
		label: "Email",
		handle: "nakar.tamir@gmail.com",
	},
	{
		icon: <Github size={20} />,
		href: "https://github.com/tamir-nakar",
		label: "Github",
		handle: "Tamir-Nakar",
	},
	{
		icon: <Linkedin size={20} />,
		href: "https://www.linkedin.com/in/tamirnakar/",
		label: "LinkedIn",
		handle: "Tamir Nakar",
	},
	{
		icon: <FontAwesomeIcon icon={faStackOverflow} size="xl" />,
		href: "https://stackoverflow.com/users/8930025/tamir-nakar",
		label: "StackOverflow",
		handle: "Tamir Nakar",
	},
];

export default function Example() {
	const [stackOverflowStats, setStackOverflowStats] = useState({ reputation: null, badges: null });

	useEffect(() => {
		fetch('https://api.stackexchange.com/2.3/users/8930025?site=stackoverflow')
			.then(response => response.json())
			.then(data => {
				if (data.items && data.items.length > 0) {
					const { reputation, badge_counts } = data.items[0];
					setStackOverflowStats({ reputation, badges: badge_counts });
				}
			})
			.catch(() => {
				// Handle errors or limit exceeded
				console.log('Unable to fetch StackOverflow data');
			});
	}, []);

	return (
		<div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
			<Navigation />
			<div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
				<div className="grid w-full grid-cols-1 gap-8 mx-auto mt-32 sm:mt-0 sm:grid-cols-4 lg:gap-16">
					{socials.map((s, index) => (
						<Card key={index}>
							<Link
								href={s.href}
								target="_blank"
								className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24  lg:pb-48  md:p-16"
							>
								<span
									className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
									aria-hidden="true"
								/>
								<span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange">
									{s.icon}
								</span>
								<div className="z-10 flex flex-col items-center">
									<span className="lg:text-xl font-medium duration-150 xl:text-3xl text-zinc-200 group-hover:text-white font-display">
										{s.handle}
									</span>
									<span className="mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200">
										{s.label}
									</span>
									{index === 3 && stackOverflowStats.reputation !== null && (
										<>
											<span className="mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200">
												Rep: {stackOverflowStats.reputation} | <FontAwesomeIcon icon={faCircle} size={"xs"} color={"#fd0"} />  {stackOverflowStats.badges.gold}  <FontAwesomeIcon icon={faCircle} size={"xs"} color={"#b4b8bc"} /> {stackOverflowStats.badges.silver}  <FontAwesomeIcon icon={faCircle} size={"xs"} color={"#d1a684"} /> {stackOverflowStats.badges.bronze} 
											</span>
										</>
									)}
								</div>
							</Link>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
