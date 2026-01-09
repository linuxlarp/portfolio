// /src/components/CommandOutputs.tsx

import { ReactNode } from "react";

interface CommandOutput {
    text?: string;
    image?: string;
    animated?: boolean;
    statusComponent?: ReactNode;
}

function parseOutput(text: string, className = "text-white", animated = false): CommandOutput[] {
  return text
    .split('\n')
    .map(line => {
      const imageMatch = line.match(/^%IMAGE:(.+)%$/);
      
      if (imageMatch) {
        return {
          image: imageMatch[1], 
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

`),

  projects: parseOutput(`


  `, "text-white"),

  contact: parseOutput(`



  `, "text-white"),

 fastfetch: parseOutput(`

  `, "text-blue-400"),
};