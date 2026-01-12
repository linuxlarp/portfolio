// /src/components/CommandOutputs.tsx

import { ReactNode } from "react";

interface CommandOutput {
  text?: string;
  image?: string;
  animated?: boolean;
  statusComponent?: ReactNode;
  link?: { title: string; href: string };
  className?: string;
}

function parseOutput(text: string, className = "text-white", animated = false): CommandOutput[] {
  return text
    .split('\n')
    .map(line => {
      const linkFullMatch = line.match(/^%LINK:([^:]+):(.+)%$/);
      if (linkFullMatch) {
        return {
          link: { title: linkFullMatch[1].trim(), href: linkFullMatch[2].trim() },
          className
        };
      }

      const imageMatch = line.match(/^%IMAGE:(.+)%$/);
      if (imageMatch) {
        return {
          image: imageMatch[1].trim(),
          className
        };
      }

      return {
        text: line === '' ? '\u00A0' : line,
        className,
        animated
      };
    });
}

export const commandOutputs: Record<string, CommandOutput[]> = {
  "about": parseOutput(`

%IMAGE: /static/images/pfp.png%

Hello there! My name is linuxlarp or linuxlarper.

Currently 15 years old, self-taught developer, aviation enthusiast, open source & right to repair advocate.

Working on my Private Pilots License (PPL) under the FAA, and enrolled in dual-credit aviation courses at a local highschool.
    
Most of my projects are for Roblox, Discord and social media platforms but im always expanding my skills and expertises to communities, platforms, causes and needs.

I love tinkering and "larping" with Linux as my name suggests. I also love homelabbing on my Raspberry Pi 5 and Dell Optiplex 7010.

And when im not doing any of the above, you can probably find me:
- Studying 
- Lifting 󱅝
- Microsoft Flight Simulator 
- Drinking more Caffine becauese: more espresso, less depresso 

To learn more about me, my interests and other topics, you can use any of the following commands:
󰦉 about techstack - My Tech Stack / Skills
 about linux - My Linux Experience and Skills

  `, "text-white"),

"about techstack": parseOutput(`
This is the tech stack of programming languages, platforms, skills and tools im using to develop the future:


Languages:
- JavaScript & TypeScript (Beginner) 
- HTML5 & CSS  
- Python 
- Golang (Beginner) 

Tools:
- Linux (if you couldnt already tell) 
- SQL 
- Docker 
- Cloudflare 
- Raspberry Pi 
- Red Hat Linux 
- Markdown  
- Bash 

Frameworks:
- NextJS (Hey! Fun fact, this website is built on NextJS!) 
- FastAPI 
- Node.js (Beginner) 󰎙

Applications:
- PyCharm 
- Photoshop 

`),

"about linux": parseOutput(`
I currently daily drive linux for all purposes. I use it for coding, schoolwork, gaming and general usage.

My Linux Setup:
- Distro: CachyOS x86_64 
- Kernel: Linux-cachyos 
- Terminal: ghostty 󱙝
- WM: Hyprland 
- Shell: fish 󰈺

%IMAGE: /static/images/rice.png%

`),

  projects: parseOutput(`

Southwest Airlines PTFS

SWAPTFS was a personal project, attempting to realistically recreate the operations of the IRL Southwest Airlines in Roblox's PTFS (Pilot Training Flight Simulator)

With this project, I used several skills to help properly run, develop and manage the group.  These skills include:
- Using Photoshop  to create advertisements, server embeds, logos, and other graphics for the group.
- Using Discord  to manage the community, communicate with members, and provide support.
- Using Python , TypeScript , JavaScript , and NextJS  to create a fully functional website.
- Using my knowledge of aviation to create realistic flight operations, procedures and handbooks for the staff team.

I ran the group from 2024 - 2025, before retiring the group due to burnout, school, and personal reasons. 
The group was acknowledged by another server in this community (PTC News) and was nominated in their yearly awards for "Best Technology" and "Best Airline",
The airline also additionally amased 900 members before being handed off to a new CEO.

While i am not directly involved with the group anymore, I am proud of what I was able to accomplish with SWAPTFS and the skills I was able to develop during my time running the group. 
I still host and run the website for the current CEO under a fixed contact.

 %LINK:SWAPTFS Website:https://southwestptfs.com%

%IMAGE: /static/images/projects/swa/awards.png%

%IMAGE: /static/images/gradient.png%

HourlyPetsTwitter 
A Twitter/X bot coded in Python's tweepy library that posted hourly pictures of furry friends using the public Dog and Cat APIs. The bot was active from 2023 to 2024 before being discontinued and no longer maintaned.

 %LINK:HourlyPetsTwitter:https://github.com/linuxlarp/HourlyPetsTwitter%

Links
»  %LINK:Tweepy GitHub:https://github.com/tweepy/tweepy%
» 󰩃 %LINK:Dog API:https://dog.ceo/dog-api%
»  %LINK:Cat API: https://thecatapi.com/%

%IMAGE: /static/images/gradient.png%

ERLCExampleBot 
A Discord bot template originally built for Reno Tahoe Roleplay featuring Roblox OAuth2 verification, embedded API, and "some" moderation tools. Built entirely by hand with 99% no AI assistance.

This project was intended to be an learning example for Roblox Roleplay communities and ERLC developers, it provides a basic bot example with direct communication to the Police Roleplay Community API.

No longer maintained as of 2025.

 %LINK:ERLCExampleBot:https://github.com/linuxlarp/ERLCBotExample%

%IMAGE: /static/images/gradient.png%



  `, "text-white"),

  contact: parseOutput(`


  `, "text-white"),

 fastfetch: parseOutput(`

  `, "text-blue-400"),
};