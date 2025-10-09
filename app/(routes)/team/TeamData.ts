export interface Member {
  name: string;
  role: string;
  imageUrl: string;
  instaUrl: string;
  linkedinUrl: string;
}

export interface Team {
  name: string;
  members: Member[];
}

export const teams: Team[] = [
  {
    name: "",
    members: [
      {
        name: "John Doe",
        role: "Frontend Developer",
        imageUrl: "/shirt.png",
        instaUrl: "https://instagram.com/john",
        linkedinUrl: "https://linkedin.com/in/john"
      },
      {
        name: "Jane Smith",
        role: "Backend Developer",
        imageUrl: "/shirt.png",
        instaUrl: "https://instagram.com/jane",
        linkedinUrl: "https://linkedin.com/in/jane"
      },
      {
        name: "John Doe",
        role: "Frontend Developer",
        imageUrl: "/shirt.png",
        instaUrl: "https://instagram.com/john",
        linkedinUrl: "https://linkedin.com/in/john"
      },
      {
        name: "Jane Smith",
        role: "Backend Developer",
        imageUrl: "/shirt.png",
        instaUrl: "https://instagram.com/jane",
        linkedinUrl: "https://linkedin.com/in/jane"
      },
      {
        name: "John Doe",
        role: "Frontend Developer",
        imageUrl: "/shirt.png",
        instaUrl: "https://instagram.com/john",
        linkedinUrl: "https://linkedin.com/in/john"
      },
      {
        name: "Jane Smith",
        role: "Backend Developer",
        imageUrl: "/shirt.png",
        instaUrl: "https://instagram.com/jane",
        linkedinUrl: "https://linkedin.com/in/jane"
      },
      // Add more members...
    ]
  },
  {
    name: "Tech",
    members: [
      {
        name: "Mike Johnson",
        role: "UI/UX Designer",
        imageUrl: "/shirt.png",
        instaUrl: "https://instagram.com/mike",
        linkedinUrl: "https://linkedin.com/in/mike"
      },
      // Add more members...
    ]
  },
  {
    name: "Sponsorship & Finance",
    members: [
      {
        name: "Sarah Wilson",
        role: "Digital Marketer",
        imageUrl: "/shirt.png",
        instaUrl: "https://instagram.com/sarah",
        linkedinUrl: "https://linkedin.com/in/sarah"
      },
      // Add more members...
    ]
  },
  {
    name: "Content & Design",
    members: [
      {
        name: "Sarah Wilson",
        role: "Digital Marketer",
        imageUrl: "/shirt.png",
        instaUrl: "https://instagram.com/sarah",
        linkedinUrl: "https://linkedin.com/in/sarah"
      },
      // Add more members...
    ]
  },
  {
    name: "PR & Marketing",
    members: [
      {
        name: "Sarah Wilson",
        role: "Digital Marketer",
        imageUrl: "/shirt.png",
        instaUrl: "https://instagram.com/sarah",
        linkedinUrl: "https://linkedin.com/in/sarah"
      },
      // Add more members...
    ]
  },
  {
    name: "Logistics & Operations",
    members: [
      {
        name: "Sarah Wilson",
        role: "Digital Marketer",
        imageUrl: "/shirt.png",
        instaUrl: "https://instagram.com/sarah",
        linkedinUrl: "https://linkedin.com/in/sarah"
      },
      // Add more members...
    ]
  }
  // Add more teams...
];

//   {
//     name: 'Tech',
//     members: [
//       {
//         name: 'Piyush Gupta',
//         role: 'Tech Lead',
//         imageUrl:
//           '/Team/Piyush_Kumar_Gupta.png',
//         instaUrl: 'https://www.instagram.com/kpiyushgupta/',
//         linkedinUrl: 'http://linkedin.com/in/kumarpiyushgupta',
//       },
//       {
//         name: 'Rahul Pandey',
//         role: 'Backend Developer',
//         imageUrl:
//           '/Team/Rahul_Pandey.jpeg',
//         instaUrl: 'https://www.instagram.com/rahul.p_19?igsh=MWYzaTZlc3hzZ25oeA==',
//         linkedinUrl: 'https://www.linkedin.com/in/rahul-pandey2005/',
//       },
//       {
//         name: 'Ahnik Purkait ',
//         role: 'Frontend Developer',
//         imageUrl:
//           '/Team/Ahnik_Purkait.jpg',
//         instaUrl: 'https://www.instagram.com/voldyys_moldies',
//         linkedinUrl: 'https://www.linkedin.com/in/ahnikpurkait',
//       },
//       {
//         name: 'Aindree Chatterjee',
//         role: 'Frontend Developer',
//         imageUrl:
//           '/Team/Aindree_Chatterjee.png',
//         instaUrl: 'https://www.instagram.com/aindree2005/',
//         linkedinUrl: 'https://www.linkedin.com/in/aindree-chatterjee-b93279201/',
//       },
//       {
//         name: 'Arnob Bhakta',
//         role: 'OC, Backend Developer',
//         imageUrl:
//           '/Team/Arnob_Bhakta.jpg',
//         instaUrl: '#',
//         linkedinUrl: 'https://www.linkedin.com/in/arnob-bhakta-a86531296/',
//       },
//       {
//         name: 'Rishob Mondal',
//         role: 'Frontend Developer',
//         imageUrl:
//           '/Team/Rishob_Mondal.jpg',
//         instaUrl: 'https://www.instagram.com/mondal_rishob?igsh=MXkybzNxcWlpNG91bg==',
//         linkedinUrl: 'https://www.linkedin.com/in/rishob-mondal-671497258?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
//       },
//       {
//         name: 'Yash Raj Singh',
//         role: 'Frontend Developer',
//         imageUrl:
//           '/Team/Yash_Raj_Singh.jpg',
//         instaUrl: 'https://www.instagram.com/raj.yashhh/',
//         linkedinUrl: 'https://www.linkedin.com/in/yashhhhh/',
//       }
//     ],
//   },
//   {
//     name: 'PR',
//     members: [
//       {
//         name: 'Raktim Banerjee',
//         role: 'PR Co-Lead',
//         imageUrl:
//           '/Team/Raktim_Banerjee.jpg',
//         instaUrl: '#',
//         linkedinUrl: 'https://www.linkedin.com/in/banerjeeraktim?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
//       },
//       {
//         name: 'Subhro Roy',
//         role: 'PR Member',
//         imageUrl:
//           '/Team/Subhro_Roy.jpg',
//         instaUrl: 'https://www.instagram.com/lyadhkarkhana/profilecard/?igsh=MWxrdDltc2RweTdncw==',
//         linkedinUrl: 'https://www.linkedin.com/in/subhro-roy-84b01827a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
//       },
//       {
//         name: 'Sohamdeep Mondal',
//         role: 'PR Co-Lead',
//         imageUrl:
//           '/Team/Sohamdeep_Mondal.jpeg',
//         instaUrl: 'https://www.instagram.com/sohamdeep7?igsh=Y21vODFndWlpdGto&utm_source=qr',
//         linkedinUrl: 'https://www.linkedin.com/in/sohamdeep-mondal?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
//       },
//       {
//         name: 'Oyshi Mukherjee',
//         role: 'Organising PR',
//         imageUrl:
//           '/Team/Oyshi_Mukherjee.jpg',
//         instaUrl: 'https://www.instagram.com/infernal.gaze/profilecard/?igsh=a3psM3doYmU5ejRy',
//         linkedinUrl: 'https://www.linkedin.com/in/oyshi-mukherjee-20aaaa2b6',
//       },
//       {
//         name: 'Anamitra Roy',
//         role: 'Organising PR',
//         imageUrl:
//           '/Team/Anamitra_Roy.jpg',
//         instaUrl: 'https://www.instagram.com/itsroybaybay/',
//         linkedinUrl: 'https://www.linkedin.com/in/anamitra-roy-832a6b301?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
//       },
//       {
//       {
//         name: 'Sayandip Das',
//         role: 'Organising PR',
//         imageUrl:
//           '/Team/Sayandip_Das.jpg',
//         instaUrl: 'https://www.instagram.com/iamsayaandipdas/',
//         linkedinUrl: 'https://www.linkedin.com/in/sayandip-das-592b7030b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
//       },
//       {
//         name: 'Rudra Ray',
//         role: 'Organising PR',
//         imageUrl: '/Team/Rudra_Ray.jpeg',
//         instaUrl: 'https://www.instagram.com/rudray006/',
//         linkedinUrl: 'https://www.linkedin.com/in/rudray006/',
//       },
//       // Add more Public Relations team members here
//     ],
//   },
//   {
//     name: 'Finance',
//     members: [
//       {
//         name: 'Jotiraditya Banerjee',
//         role: 'Finance Lead',
//         imageUrl:
//           '/Team/Jotiraditya_Banerjee.png',
//         instaUrl: 'https://www.instagram.com/_._leviianthan_._',
//         linkedinUrl: 'https://www.linkedin.com/in/jotiraditya?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
//       },
//       {
//         name: 'Aditya Anand',
//         role: 'Sponsorship Member',
//         imageUrl:
//         '/Team/Aditya_Anand.jpg',
//         instaUrl: 'https://www.instagram.com/aditya_anand176?igsh=c3F6ZHFwbWI1cnFx',
//         linkedinUrl: 'https://www.linkedin.com/in/aditya-astralite-anand/',
//       },
//       {
//         name: 'Arka Dhar',
//         role: 'Sponsorship Member',
//         imageUrl:
//         '/Team/Arka_Dhar.jpeg',
//         instaUrl: 'https://www.instagram.com/__ark_phoenix/?next=%2F',
//         linkedinUrl: 'http://www.linkedin.com/in/arka-dhar-4921882a7',
//       },
//       {
//         name: 'Om Karmakar',
//         role: 'Sponsorship Member',
//         imageUrl:
//         '/Team/Om_Karmakar.jpg',
//         instaUrl: 'https://www.instagram.com/iamomkarmakar?igsh=MTlzaWZhYXRzbG5ndw==',
//         linkedinUrl: 'https://www.linkedin.com/in/om-karmakar-52214b1ba',
//       },
//       {
//         name: 'Sakshya Mukherjee',
//         role: 'Sponsorship Co-Lead',
//         imageUrl:
//           '/Team/Sakshya_Mukherjee.jpg',
//         instaUrl: 'https://www.instagram.com/_.sakshya._/profilecard/?igsh=d3YwamM5MzFrbndp',
//         linkedinUrl: 'https://www.linkedin.com/in/sakshyamukherjee/',
//       },
//       {
//         name: 'Shivam Mundra',
//         role: 'Sponsorship Member',
//         imageUrl:
//           '/Team/Shivam_Mundra.jpg',
//         instaUrl: 'https://www.instagram.com/shivam_mundra24/',
//         linkedinUrl: 'https://www.linkedin.com/in/shivam-mundra-97989123b/',
//       },
//       {
//         name: 'Jahid Mamud',
//         role: 'Sponsorship Member',
//         imageUrl:
//           '/Team/Jahid.jpeg',
//         instaUrl: 'https://www.instagram.com/jem_.__?igsh=b2o0ZjlqZ3pkeW5t',
//         linkedinUrl: 'http://www.linkedin.com/in/jahid-mamud',
//       },
//       {
//         name: 'Aishani Roy ',
//         role: 'Sponsorship Member',
//         imageUrl:
//           '/Team/Aishani_Roy.jpg',
//         instaUrl: 'https://www.instagram.com/aishani._?igsh=MTZtMmN3M3VrZ3o1cA==',
//         linkedinUrl: 'https://www.linkedin.com/in/aishani-roy-a6804829b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
//       },
//       {
//         name: 'Shubham Sarkar',
//         role: 'Sponsorship Member',
//         imageUrl:
//           '/Team/Shubham_Sarkar.jpg',
//         instaUrl: 'https://www.instagram.com/_iamshubhamsarkar_?igsh=MTZ2b24xc2pwdmI4dQ==',
//         linkedinUrl: 'https://www.linkedin.com/in/shubham-sarkar-57438b27a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
//       },
//       {
//         name: 'Taufique Ali ',
//         role: 'Sponsorship Member',
//         imageUrl:
//           '/Team/Taufique_Ali.jpg',
//         instaUrl: 'https://www.instagram.com/taufiqueali007s?igsh=bHYycDVsaWUzN3By',
//         linkedinUrl: 'https://www.linkedin.com/in/taufiqueali?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
//       },
//       {
//         name: 'Ayudh Banerjee',
//         role: 'Judges Coordinator',
//         imageUrl:
//           '/Team/Ayudh_Banerjee.jpeg',
//         instaUrl: 'https://www.instagram.com/melody_of_lyf/',
//         linkedinUrl: 'https://www.linkedin.com/in/ayudh-banerjee/',
//       },
//       // Add more finance team members here
//     ],
//   },
//   {
//     name: 'Design',
//     members: [
//       {
//         name: 'Anurag Dey',
//         role: 'Creative Lead',
//         imageUrl:
//           '/Team/Anurag_Dey.jpg',
//         instaUrl: 'https://www.instagram.com/_theweirdintrovert_/',
//         linkedinUrl: 'https://www.linkedin.com/in/iamanurag101/',
//       },
//       {
//         name: 'Anitketan Suin',
//         role: 'Video Editor',
//         imageUrl:
//           '/Team/Anitketan_Suin.jpg',
//         instaUrl: 'https://www.instagram.com/_.anit._xd/',
//         linkedinUrl: 'https://www.linkedin.com/in/anitketan-suin-07488b289/',
//       },
//       {
//         name: 'Apurba Nandi',
//         role: 'Designer',
//         imageUrl:
//           '/Team/Apurba_Nandi.jpg',
//         instaUrl: 'https://www.instagram.com/just.apurba/',
//         linkedinUrl: 'https://www.linkedin.com/in/apurbanandi/',
//       },
//       {
//         name: 'Meghna Das',
//         role: 'Designer',
//         imageUrl:
//           '/Team/Meghna_Das.jpg',
//         instaUrl: 'https://www.instagram.com/heels_xl?igsh=cXRsdmJpMmdyMzdk',
//         linkedinUrl: 'https://www.linkedin.com/in/meghna-das-009628248?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
//       },
//       {
//         name: 'Anubrata Karmakar',
//         role: 'Designer',
//         imageUrl:
//           '/Team/Anubrata_Karmakar.jpg',
//         instaUrl: 'https://www.instagram.com/anubrata_0312/',
//         linkedinUrl: 'https://www.linkedin.com/in/anubrata-karmakar-926631212',
//       },
//       {
//         name: 'Prama Ray',
//         role: 'OC, Designer',
//         imageUrl:
//           '/Team/Prama_Ray.jpg',
//         instaUrl: 'https://www.instagram.com/thelaughinghooman?igsh=c2Z4MzV0YzBvOHpv',
//         linkedinUrl: 'https://www.linkedin.com/in/pramaray?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
//       },
//       {
//         name: 'Chandrima Ghosh',
//         role: 'Designer',
//         imageUrl:
//           '/Team/Chandrima_Ghosh.jpg',
//         instaUrl: '#',
//         linkedinUrl: 'http://www.linkedin.com/in/chandrima-ghosh-5a15292a7',
//       },
//       {
//         name: 'Saumili Roy',
//         role: 'Designer',
//         imageUrl:
//           '/Team/Saumili_Roy.jpeg',
//         instaUrl: 'https://www.instagram.com/saumilir?igsh=MWVzejloNTl4YTJwOQ==',
//         linkedinUrl: 'http://linkedin.com/saumili-roy',
//       },
//       {
//         name: 'Sombrata Biswas',
//         role: 'Content Designer',
//         imageUrl:
//           '/Team/Sombrata_Biswas.jpeg',
//         instaUrl: 'https://www.instagram.com/some.brat.uh?igsh=ODYzZm40OW8zYWYy',
//         linkedinUrl: 'https://www.linkedin.com/in/sombrata-b-099365217?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
//       }
      
//       // Add more design team members here
//     ],
//   },
//   {
//     name: 'Logistics',
//     members: [
//       {
//         name: 'Sohini Hazra',
//         role: 'Operations Lead',
//         imageUrl:
//           '/Team/Sohini_Hazra.png',
//         instaUrl: 'https://www.instagram.com/_._.sohini._._/',
//         linkedinUrl: 'https://www.linkedin.com/in/sohini-hazra-a17121254/',
//       },
//       {
//         name: 'Gourab Paul',
//         role: 'Operations Co-Lead',
//         imageUrl:
//           '/Team/Gourab_Paul.png',
//         instaUrl: 'https://www.instagram.com/gourab____paul/',
//         linkedinUrl: 'https://www.linkedin.com/in/gourab-paul-259156227/',
//       },
//       {
//         name: 'Sabyasachi Sen',
//         role: 'Logistics Member',
//         imageUrl:
//           '/Team/Sabyasachi_Sen.jpeg',
//         instaUrl: 'https://www.instagram.com/yoursabya/',
//         linkedinUrl: 'https://www.linkedin.com/in/sabyasachi-sen-16b7b3303',
//       },
//       {
//         name: 'Barnik Ray',
//         role: 'OC, Logistics Member',
//         imageUrl:
//           '/Team/Barnik_Ray.jpeg',
//         instaUrl: 'https://www.instagram.com/barnik_br7/',
//         linkedinUrl: 'https://www.linkedin.com/in/barnik-ray-br7/',
//       },
//       
//       // Add more finance team members here
//     ],
//   },
// ];