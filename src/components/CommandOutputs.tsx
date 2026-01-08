// Components/CommandOutputs.tsx

import { ReactNode } from "react";

interface CommandOutput {
    text: string;
    animated?: boolean;
    statusComponent?: ReactNode;
}

function parseOutput(text: string, className = "text-white", animated = false) {
  return text
    .trim() 
    .split('\n')
    .map(line => ({
      text: line,
      className,
      animated
    }));
}


export const commandOutputs: Record<string, CommandOutput[]> = {
  "about": parseOutput(`

Hello there! My name is linuxlarp or linuxlarper.

Current 15 years old, self-taught developer, aviation enthusiast, open source & right to repair advocate.

Working on my Private Pilots License (PPL) under the FAA, and enrolled in dual-credit aviation courses at a local higschool.
    
Most of my projects are for Roblox, Discord and social media platforms but im always expanding my skills and expertises to other communities and platforms online. 

I love tinkering and "larping" with Linux as my name suggests. I also love homelabbing on my Raspberry Pi 5 and Dell Optiplex 7010.

And when im not doing any of the above, you can probably find me:
- Studying
- Lifting
- Microsoft FLight Sim
- Drinking more Caffine becauese: more espresso, less depresso

  `, "text-white"),

  projects: parseOutput(`
╔════════════════════════════════════════╗
║              PROJECTS                  ║
╚════════════════════════════════════════╝


  `, "text-white"),

  contact: parseOutput(`
╔════════════════════════════════════════╗
║              CONTACT                    ║
╚════════════════════════════════════════╝


  `, "text-white"),

 fastfetch: parseOutput(`

  `, "text-blue-400"),
};