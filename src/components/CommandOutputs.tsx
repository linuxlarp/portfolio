// /src/components/CommandOutputs.tsx

import { parse } from "path";
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
- Studying 
- Lifting 󱅝
- Microsoft Flight Simulator 
- Drinking more Caffine becauese: more espresso, less depresso 

To learn more about me, my interests and other topics, you can use any of the following commands:
 skills - My Tech Stack / Skills
 about linux - My Linux Experience and Skills

  `, "text-white"),

"about linux": parseOutput(`
I currently daily drive linux for all purposes. I use it for coding, schoolwork, gaming and general usage.

My Linux Setup:
- Distro: CachyOS x86_64 󰣇
- Kernel: Linux-cachyos 
- Terminal: ghostty 󱙝
- WM: Hyprland 
- Shell: fish 󰈺

%IMAGE: /static/images/rice.png%

`),

  projects: parseOutput(`
Here are some of the projects i've worked on over the years.
  
%IMAGE: /static/images/gradient.png%

Southwest Airlines PTFS 󰋑

SWAPTFS was a personal project, attempting to realistically recreate the operations of the IRL Southwest Airlines in Roblox's PTFS (Pilot Training Flight Simulator)

With this project, I used several skills to help properly run, develop and manage the group.  These skills include:
- Using Photoshop  to create advertisements, server embeds, logos, and other graphics for the group.
- Using Discord  to manage the community, communicate with members, and provide support.
- Using Python , TypeScript , JavaScript , and FastAPI  & NextJS  to create a fully functional website.
- Using my knowledge of aviation to create realistic flight operations, procedures and handbooks for the staff team.

I ran the group from 2024 - 2025, before retiring the group due to burnout, school, and personal reasons. 
The group was acknowledged by another server in this community (PTC News) and was nominated in their yearly awards for "Best Technology" and "Best Airline",
The airline also additionally amased 900 members before being handed off to a new CEO.

While i am not directly involved with the group anymore, I am proud of what I was able to accomplish with SWAPTFS and the skills I was able to develop during my time running the group. 

I still host and run the website for the current CEO under a fixed contact.

%IMAGE: /static/images/projects/swa/awards.png%
%IMAGE: /static/images/projects/swa/m1.webp%

 %LINK:SWAPTFS Website:https://southwestptfs.com%

%IMAGE: /static/images/gradient.png%

HourlyPetsTwitter 

A Twitter/X bot coded in Python's tweepy library that posted hourly pictures of furry friends using the public Dog and Cat APIs. The bot was active from 2023 to 2024 before being discontinued and no longer maintaned.

 %LINK:HourlyPetsTwitter:https://github.com/linuxlarp/HourlyPetsTwitter%

Links:
»  %LINK:Tweepy GitHub:https://github.com/tweepy/tweepy%
» 󰩃 %LINK:Dog API:https://dog.ceo/dog-api%
» 󰄛 %LINK:Cat API:https://thecatapi.com/%

%IMAGE: /static/images/gradient.png%

ERLCExampleBot 

A Discord bot template originally built for Reno Tahoe Roleplay featuring Roblox OAuth2 verification, embedded API, and "some" moderation tools. Built entirely by hand with 99% no AI assistance.

This project was intended to be an learning example for Roblox Roleplay communities and ERLC developers, it provides a basic bot example with direct communication to the Police Roleplay Community API.

No longer maintained as of 2025.

 %LINK:ERLCExampleBot:https://github.com/linuxlarp/ERLCBotExample%

%IMAGE: /static/images/gradient.png%

AAWeb 

A simple, HTML , CSS  and JS  website for the American Airlines PTFS Group. The website was never finished, but has a basic authentication manager and startpage.

The website was never finished, but overall was a great learning experience for web development and working with HTML, CSS and JavaScript.

 %LINK:AAWeb:https://github.com/linuxlarp/AAWeb %

%IMAGE: /static/images/gradient.png%

My Personal Website 

My personal portfolio website, built with NextJS  and TypeScript . This website serves as a hub for my projects, about me section, and contact information. (You're visting it right now!)
It also features as interactive web-terminal

 %LINK:Portfolio Website:https://linuxlarp.dev%
 %LINK:GitHub Repository (Source Code):https://github.com/linuxlarp/portfolio%

%IMAGE: /static/images/gradient.png%

Dats Square 󰸰

Dat's Square was a ROBLOX game I worked on to create a virtual new-years hangout space for friends and community members. It featured a virtual fireworks show, music, and social areas for players to interact and celebrate the new year together.
And the best of all, it was synced up to the real world ball drop in New York City! The event feature multiple timezones so players from around the world could join in on the fun.

The event ran from 2021 to 2025, I began helping with my coding skills in Lua , and FastAPI  to help manage a simple backend server for the game.

Our most sucessful year was 2024, where we had over 150 concurrent players during the ball drop event

Unfortunately, due to ROBLOX's moderation being incredibly sensitive and broken. The place was taken down for "Child Endangerment" in early 2025, and we were unable to recover it.
(No, we didnt actually endanger any children lmao, it was just ROBLOX being ROBLOX)

%IMAGE: /static/images/projects/dats/2025.png%

Videos:
»  %LINK:2025 Full Livestream:https://www.youtube.com/watch?v=3_-nTuQAcvQ%
»  %LINK:2025 Balldrop Test:https://www.youtube.com/watch?v=0kFPkA2LbP8%
»  %LINK:2024 Balldrop Recap:https://www.youtube.com/watch?v=EwwTsb7t3O8%
»  %LINK:2024 Teaser:https://www.youtube.com/watch?v=pNf3bo2Hm_w%
»  %LINK:Video from OG Creator whosdatguy:https://www.youtube.com/watch?v=FCpDJpXfEN0%

%IMAGE: /static/images/gradient.png%
  `, "text-white"),

  contact: parseOutput(`
You can reach out to me through any of the following methods:

- 󰪱  Email: %LINK:larp@linuxlarp.dev:mailto:larp@linuxlarp.dev%
-   Discord: %LINK:linuxlarper:https://discord.com/users/998819061817413652%
-   GitHub: %LINK:linuxlarp:https://github.com/linuxlarp%

Social Media:

-  %LINK:TikTok:https://www.tiktok.com/@linuxlarper:%
-  %LINK:X/Twitter:https://x.com/linuxlarp%


  `, "text-white"),

// dont mind the wierd ass ASCII formatting, if it works it works
fastfetch: parseOutput(` 
         _nnnn_           guest@linuxlarp
        dGGGGMMb          -----------------------
       @p~qp~~qMb         OS: CachyOS x86_64
       M|@||@) M|         Host: linuxlarp.dev
       @,----.JM|         Kernel: linux-cachyos
      JS^\\__/  qKL        Uptime: 15 years
     dZP        qKRb      Packages: 847 (pacman)
    dZP          qKKb     Shell: fish
   fZP            SMMb    Resolution: 1920x1080
   HZM            MMMM    DE: Hyprland
   FqM            MMMM    WM: Hyprland (Wayland)
 __| ".        |\\dS"qML   Terminal: ghostty
 |    \`.       | \`' \\Zq   CPU: AMD Ryzen 7 7700X (16) @ 5.40 GHz
_)      \\.___.,|     .'   GPU: NVIDIA GeForce RTX 4060 Ti
\\____   )MMMMMP|   .'     Memory: 3247MiB / 49152MiB
     \`-'       \`--' hjm   Disk (/): 512GB / 2048GB (25%)
                          Local IP: 192.168.1.100
                          Battery: N/A
                          Locale: en_US.UTF-8
`, "text-cyan-400"),

sudo: parseOutput(`
 haha, nice try skid. so you see, this website is actually not a real linux terminal... and doesnt connect to any real server! which means you are a SKID!

heres my %LINK:noskid.today certificate:https://noskid.today % (i'd recommend you get one)

%IMAGE: /static/images/cert.png%
`),

blog: parseOutput(`
Hey there! You can visit my blog, %LINK:LARPED_:https://larped.linuxlarp.dev%

LARPED_ is my personal blog/newsletter where I write about Linux systems, aviation / aviation technology, and my adventures in both worlds.

As a young aviator and tech entrepreneur, subscribing or even just looking at my posts helps a lot and measn the world to me!
`),

skills: parseOutput(`

Skills
-----------------------
 Python     █████████████████████████ 90
 HTML 5     ███████████████████░░░░░░ 70
 SQL        █████████████████░░░░░░░░ 60
 CSS 3      ██████████████░░░░░░░░░░░ 50
 JavaScript ██████████░░░░░░░░░░░░░░░ 35
 TypeScript ██████░░░░░░░░░░░░░░░░░░░ 20
 Go         █░░░░░░░░░░░░░░░░░░░░░░░░ 5

Frameworks
-----------------------
 FastAPI █████████████████████████ 70
 NodeJS  ███████████░░░░░░░░░░░░░░ 30
 NextJS  █████░░░░░░░░░░░░░░░░░░░░ 15
 React   ██░░░░░░░░░░░░░░░░░░░░░░░ 5


Platforms/Tools
-----------------------
 Discord (Bots) █████████████████████████ 90
 Git/GitHub     ████████████████████████░ 85
 Raspberry Pi   █████████████████████░░░░ 75
󱊈 Roblox         ███████████████████░░░░░░ 70
 Red Hat Linux  ██████████████░░░░░░░░░░░ 50
 Cloudflare     ████████░░░░░░░░░░░░░░░░░ 30

  
`),


/*
Python, 90
HTML5, 70
CSS3, 50
JavaScript, 35
TypeScript, 20
Go, 5
SQL, 60
*/

/*
FastAPI, 70
Node, 30
NextJS, 15
React, 5
*/

/*
Red Hat Linux, 50
Raspberry Pi, 75
Cloudflare, 30
Discord (Bots), 90
Roblox, 70
 Git/GitHub, 85
*/

source: parseOutput(` %LINK:View Source:https://github.com/linuxlarp/portfolio%`),
whoami: parseOutput(`guest`),
coffee: parseOutput(`
      )  (
     (   ) )
      ) ( (
 mrf_______)_
 .-'---------|  
( C|/\/\/\/\/|
 '-./\/\/\/\/|
   '_________'
    '-------'

`, "text-orange-950"),
hostname: parseOutput(`linuxlarp.dev`),
hardware: parseOutput(`

󰇅 My Full Setup:
-------------------------
 Motherboard: GIGABYTE B650M WIFI GAMING PLUS
󰻠 CPU: AMD Ryzen 7700X
 RAM: TEAMGROUP T-FORCE Delta RGB DDR5 (16GB x 1) 48GB 
 GPU: NVIDIA RTX 4060Ti
 PSU: MSI MAG A650BN 650W
󰇅 Case: Proprietary Prebuilt
󰈐 AIO: Proprietary with custom CORSAIR ICUE LINK RX140 140mm (2x)
 Storage: 2TB Generic SSD, 1TB Samsung 990 PRO

%IMAGE: /static/images/build.png%

󰟑 Homelab:
-------------------------
 Make: DELL
󰣩 Model: OPTIPLEX 7010
󰻠 CPU: i3-3220
 RAM: 4GB DDR3
 GPU: Intel® HD Graphics 2500
 PSU: DELL Propietary 250W
󰇅 Case: DELL Propietary
󰈐 Cooling: DELL Propietary
 Storage: 1TB SATA SSD 

%IMAGE: /static/images/hl.jpg%

`)


};
