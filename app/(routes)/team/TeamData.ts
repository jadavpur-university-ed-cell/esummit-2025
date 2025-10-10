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
    name: '',
    members: [
      {
        name: 'Piyush Gupta',
        role: 'Student Head',
        imageUrl:
          '/team/Piyush_Gupta.webp',
        instaUrl: 'https://www.instagram.com/kpiyushgupta/',
        linkedinUrl: 'http://linkedin.com/in/kumarpiyushgupta',
      },
      {
        name: 'Jotiraditya Banerjee',
        role: 'Deputy Student Head',
        imageUrl:
          '/team/Jotiraditya_Banerjee.png',
        instaUrl: 'https://www.instagram.com/_._leviianthan_._',
        linkedinUrl: 'https://www.linkedin.com/in/jotiraditya?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      },
      {
        name: 'Sohini Hazra',
        role: 'Deputy Student Head',
        imageUrl:
          '/team/Sohini_Hazra.png',
        instaUrl: 'https://www.instagram.com/_._.sohini._._/',
        linkedinUrl: 'https://www.linkedin.com/in/sohini-hazra-a17121254/',
      },
      {
        name: 'Anurag Dey',
        role: 'Design Head',
        imageUrl:
          '/team/Anurag_Dey.jpeg',
        instaUrl: 'https://www.instagram.com/_theweirdintrovert_/',
        linkedinUrl: 'https://www.linkedin.com/in/iamanurag101/',
      },
      {
        name: 'Gourab Paul',
        role: 'Logistics Head',
        imageUrl:
          '/team/Gourab_Paul.png',
        instaUrl: 'https://www.instagram.com/gourab____paul/',
        linkedinUrl: 'https://www.linkedin.com/in/gourab-paul-259156227/',
      },
      {
        name: 'Sohamdeep Mondal',
        role: 'Operations Head',
        imageUrl:
          '/team/Sohamdeep_Mondal.jpeg',
        instaUrl: 'https://www.instagram.com/sohamdeep7?igsh=Y21vODFndWlpdGto&utm_source=qr',
        linkedinUrl: 'https://www.linkedin.com/in/sohamdeep-mondal?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
      },
      {
        name: 'Raktim Banerjee',
        role: 'Operations Head',
        imageUrl:
          '/team/Raktim_Banerjee.jpg',
        instaUrl: '#',
        linkedinUrl: 'https://www.linkedin.com/in/banerjeeraktim?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      },
      {
        name: 'Sakshya Mukherjee',
        role: 'Logidstics Head',
        imageUrl:
          '/team/Sakshya_Mukherjee.jpg',
        instaUrl: 'https://www.instagram.com/_.sakshya._/profilecard/?igsh=d3YwamM5MzFrbndp',
        linkedinUrl: 'https://www.linkedin.com/in/sakshyamukherjee/',
      },
      {
        name: 'Shivam Mundra',
        role: 'Logistics Head',
        imageUrl:
          '/team/Shivam_Mundra.jpg',
        instaUrl: 'https://www.instagram.com/shivam_mundra24/',
        linkedinUrl: 'https://www.linkedin.com/in/shivam-mundra-97989123b/',
      },
      // Add more members...
    ]
  },
  {
    name: 'Tech',
    members: [
      {
        name: 'Rahul Pandey',
        role: 'Tech Lead',
        imageUrl:
          '/team/Rahul_Pandey.jpeg',
        instaUrl: 'https://www.instagram.com/rahul.p_19?igsh=MWYzaTZlc3hzZ25oeA==',
        linkedinUrl: 'https://www.linkedin.com/in/rahul-pandey2005/',
      },
      {
        name: 'Arnob Bhakta',
        role: 'Tech Lead',
        imageUrl:
          '/team/Arnob_Bhakta.jpg',
        instaUrl: '#',
        linkedinUrl: 'https://www.linkedin.com/in/arnob-bhakta/',
      },
      {
        name: 'Yash Raj Singh',
        role: 'Backend Developer',
        imageUrl:
          '/team/Yash_Raj_Singh.jpg',
        instaUrl: 'https://www.instagram.com/raj.yashhh/',
        linkedinUrl: 'https://www.linkedin.com/in/yashhhhh/',
      },
      {
        name: 'Sarin Sanyal',
        role: 'Backend Developer',
        imageUrl: '/team/Sarin_Sanyal.jpeg',
        instaUrl: '',
        linkedinUrl: 'https://www.linkedin.com/in/sarinsanyal/',
      },
      {
        name: 'Krittika Sen',
        role: 'Frontend Developer',
        imageUrl: '/team/Krittika_Sen.jpeg',
        instaUrl: 'https://www.instagram.com/krittikaisasloth?igsh=ZzNhb2phOGVnbGZs&utm_source=qr',
        linkedinUrl: 'http://linkedin.com/in/krittika-sen-22a7a624a',
      },
      {
        name: 'Ayush Bhattacharyya',
        role: 'Frontend Developer',
        imageUrl: '/team/Ayush_Bhattacharyya.jpeg',
        instaUrl: 'https://www.instagram.com/_._ayush.b_._?igsh=MTZ0emZ1bGprMmNyOQ==',
        linkedinUrl: 'https://www.linkedin.com/in/ayush-bhattacharyya-654063314?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      },
      {
        name: 'Pritam Das',
        role: 'Frontend Developer',
        imageUrl: '/team/Pritam_Das.jpeg',
        instaUrl: 'https://www.instagram.com/davyprit/',
        linkedinUrl: 'https://linkedin.com/in/pritamdas2006/',
      },
    ]
  },
  {
    name: 'Sponsorship & Finance',
    members: [
      {
        name: 'Om Karmakar',
        role: 'Finance Lead',
        imageUrl:
          '/team/Om_Karmakar.jpeg',
        instaUrl: 'https://www.instagram.com/iamomkarmakar?igsh=MTlzaWZhYXRzbG5ndw==',
        linkedinUrl: 'https://www.linkedin.com/in/om-karmakar-52214b1ba',
      },
      {
        name: 'Barnik Ray',
        role: 'Sponsorship Co-Lead',
        imageUrl:
          '/team/Barnik_Ray.jpeg',
        instaUrl: 'https://www.instagram.com/barnik_br7/',
        linkedinUrl: 'https://www.linkedin.com/in/barnik-ray-br7/',
      },
      {
        name: 'Aditya Anand',
        role: 'Sponsorship Co-Lead',
        imageUrl:
          '/team/Aditya_Anand.jpg',
        instaUrl: 'https://www.instagram.com/aditya_anand176?igsh=c3F6ZHFwbWI1cnFx',
        linkedinUrl: 'https://www.linkedin.com/in/aditya-astralite-anand/',
      },
      {
        name: 'Oyshi Mukherjee',
        role: 'Finance Lead',
        imageUrl:
          '/team/Oyshi_Mukherjee.jpg',
        instaUrl: 'https://www.instagram.com/infernal.gaze/profilecard/?igsh=a3psM3doYmU5ejRy',
        linkedinUrl: 'https://www.linkedin.com/in/oyshi-mukherjee-20aaaa2b6',
      },
      {
        name: 'Jahid Mamud',
        role: 'Sponsorship Member',
        imageUrl:
          '/team/Jahid.jpeg',
        instaUrl: 'https://www.instagram.com/jem_.__?igsh=b2o0ZjlqZ3pkeW5t',
        linkedinUrl: 'http://www.linkedin.com/in/jahid-mamud',
      },
      {
        name: 'Ayan Bhowmick',
        role: 'Sponsorship Member',
        imageUrl: '/team/Ayan_Bhowmick.jpeg',
        instaUrl: 'https://www.instagram.com/aayanbhowmick?igsh=c21zNzV4NmI0dWRk',
        linkedinUrl: 'https://www.linkedin.com/in/ayan-bhowmick-705822348?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      },
      {
        name: 'Ayush Choudhary',
        role: 'Sponsorship Member',
        imageUrl: '/team/Ayush_Choudhary.jpeg',
        instaUrl: 'https://www.instagram.com/eccen.trix_?utm_source=qr&igsh=amlnbHM3cGs4eTB4',
        linkedinUrl: 'https://www.linkedin.com/in/ayush-choudhary18/',
      },
      {
        name: 'Kingshuk Bhandary',
        role: 'Sponsorship Member',
        imageUrl: '/team/Kingshuk_Bhandary.jpeg',
        instaUrl: 'https://www.instagram.com/kingshukb27/',
        linkedinUrl: 'https://www.linkedin.com/in/kingshuk-bhandary-64557726a/',
      },
      {
        name: 'Srishti Dutta',
        role: 'Sponsorship Member',
        imageUrl: '/team/Srishti_Dutta.jpeg',
        instaUrl: 'https://www.instagram.com/__srishtid?igsh=MWxzcHpibWNpb2I2aw%3D%3D&utm_source=qr',
        linkedinUrl: 'https://www.linkedin.com/in/srishti-dutta-4104b1317?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'
      },
      {
        name: 'Dipjyoti Dash',
        role: 'Sponsorship Member',
        imageUrl: '/team/Dipjyoti_Dash.jpeg',
        instaUrl: 'https://www.instagram.com/dipjyotidash/',
        linkedinUrl: 'http://www.linkedin.com/in/dipjyoti-dash-22508227a'
      },
      {
        name: 'Nirnoy Barma',
        role: 'Sponsorship Member',
        imageUrl: '/team/Nirnoy_Barma.jpeg',
        instaUrl: 'https://www.instagram.com/n1rnxy/',
        linkedinUrl: 'https://www.linkedin.com/in/nirnoyb/',
      },
      {
        name: 'Neelavra Das',
        role: 'Sponsorship Member',
        imageUrl: '/team/Neelavra_Das.jpeg',
        instaUrl: 'https://www.instagram.com/neelavradas?igsh=MTF0cm56bTRjNGF3Yg==',
        linkedinUrl: 'https://www.linkedin.com/in/neelavra-das-3657a731b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      },
      {
        name: 'Swapnendu Sikdar',
        role: 'Sponsorship Member',
        imageUrl: '/team/Swapnendu_Sikdar.jpeg',
        instaUrl: 'https://www.instagram.com/just_swapnendu?igsh=MTI1dTJyMG4xNjR5aA==',
        linkedinUrl: 'www.linkedin.com/in/swapnendu-sikdar-9080aa365',
      },
      {
        name: 'Abhradeep Jana',
        role: 'Sponsorship Member',
        imageUrl: '/team/Abhradeep_Jana.jpeg',
        instaUrl: 'https://www.instagram.com/__abhradeep',
        linkedinUrl: 'https://www.linkedin.com/in/abhradeepjana'
      },
      {
        name: 'Sohom Ghosh',
        role: 'Sponsorship Member',
        imageUrl: '/team/Sohom_Ghosh.jpeg',
        instaUrl: 'https://www.instagram.com/_._.ghosh._._?igsh=NzdkcWNnczNzYWVn',
        linkedinUrl: 'https://www.linkedin.com/in/sohom-ghosh26?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      },
      {
        name: 'Pranjal Deb',
        role: 'Sponsorship Member',
        imageUrl: '/team/Team/18.jpg',
        instaUrl: '',
        linkedinUrl: 'https://www.linkedin.com/in/pranjal-deb-62aa15324',
      },
      {
        name: 'Nildeep Sarkar',
        role: 'Sponsorship Member',
        imageUrl: '/team/Nildeep_Sarkar.jpeg',
        instaUrl: 'https://www.instagram.com/sarkarnildeep?igsh=MW1jOHljODNqbXpmcg==',
        linkedinUrl: 'https://www.linkedin.com/in/nildeepsarkar?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      },
      {
        name: 'Devesh Konnur',
        role: 'Sponsorship Member',
        imageUrl: '/team/Devesh_Konnur.jpeg',
        instaUrl: 'https://www.instagram.com/devesh_konnur0601?igsh=MThudHFhMGhnaWp4cQ==',
        linkedinUrl: 'https://www.linkedin.com/in/devesh-konnur-9569a2313?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      },
    ]
  },
  {
    name: 'Content & Design',
    members: [
      {
        name: 'Aindree Chatterjee',
        role: 'Design Lead',
        imageUrl:
          '/team/Aindree_Chatterjee.png',
        instaUrl: 'https://www.instagram.com/aindree2005/',
        linkedinUrl: 'https://www.linkedin.com/in/aindree-chatterjee-b93279201/',
      },
      {
        name: 'Chandrima Ghosh',
        role: 'Design Lead',
        imageUrl:
          '/team/Chandrima_Ghosh.jpg',
        instaUrl: '#',
        linkedinUrl: 'http://www.linkedin.com/in/chandrima-ghosh-5a15292a7',
      },
      {
        name: 'Arka Dhar',
        role: 'Content Co-Lead',
        imageUrl: '/team/Arka_Dhar.jpeg',
        instaUrl: 'https://www.instagram.com/__ark_phoenix/?next=%2F',
        linkedinUrl: 'http://www.linkedin.com/in/arka-dhar-4921882a7',
      },
      {
        name: 'Anitketan Suin',
        role: 'Video Co-Lead',
        imageUrl:
          '/team/Anitketan_Suin.jpg',
        instaUrl: 'https://www.instagram.com/_.anit._xd/',
        linkedinUrl: 'https://www.linkedin.com/in/anitketan-suin-07488b289/',
      },
      {
        name: 'Aishani Roy ',
        role: 'Content Co-Lead',
        imageUrl:
          '/team/Aishani_Roy.jpg',
        instaUrl: 'https://www.instagram.com/aishani._?igsh=MTZtMmN3M3VrZ3o1cA==',
        linkedinUrl: 'https://www.linkedin.com/in/aishani-roy-a6804829b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      },
      {
        name: 'Shreyash Ray',
        role: 'Content & Design Team Member',
        imageUrl: '/team/Shreyash_Ray.jpeg',
        instaUrl: 'https://www.instagram.com/shreyashhhhhh______/',
        linkedinUrl: 'https://www.linkedin.com/in/shreyash-ray/',
      },
      {
        name: 'Ujaan Roy',
        role: 'Content & Design Team Member',
        imageUrl: '/team/Ujaan_Roy.jpeg',
        instaUrl: 'https://www.instagram.com/metalhound_07/',
        linkedinUrl: 'https://www.linkedin.com/in/ujaan-roy-a2109b193/',
      },
      {
        name: 'Utsha Ghosh',
        role: 'Content & Design Team Member',
        imageUrl: '/team/Utsha_Ghosh.jpeg',
        instaUrl: 'https://www.instagram.com/_utsha_ghosh_?igsh=bXhxcjVpb2xwanV5',
        linkedinUrl: 'https://www.linkedin.com/in/utsha-ghosh-bb4218329?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      },
      {
        name: 'Anshika Dutta',
        role: 'Content & Design Team Member',
        imageUrl: '/team/Anshika_Dutta.jpeg',
        instaUrl: 'https://www.instagram.com/_.4nshika/',
        linkedinUrl: 'https://www.linkedin.com/in/anshika-d-18252833a',
      },
      {
        name: 'Ashmit Sinha',
        role: 'Content & Design Team Member',
        imageUrl: '/team/Ashmit_Sinha.jpeg',
        instaUrl: 'https://www.instagram.com/ashes_of_phoeni.x?igsh=MTBuYmNtbXBuMGphYQ==',
        linkedinUrl: 'https://www.linkedin.com/in/ashmit-sinha2005?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      },
      {
        name: 'Ayush Chowdhary',
        role: 'Content & Design Team Member',
        imageUrl: '/team/Ayush_Chowdhary.jpeg',
        instaUrl: 'https://www.instagram.com/ayushchowdhary_?igsh=cHQwbjNrZXpyczBy',
        linkedinUrl: 'https://www.linkedin.com/in/ayushchowdhary11/',
      }
    ]
  },
  {
    name: 'PR & Marketing',
    members: [
			{
        name: 'Meghna Das',
        role: 'Social Media Lead',
        imageUrl:
          '/team/Meghna_Das.jpg',
        instaUrl: 'https://www.instagram.com/heels_xl?igsh=cXRsdmJpMmdyMzdk',
        linkedinUrl: 'https://www.linkedin.com/in/meghna-das-009628248?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      },
      {
        name: 'Anubrata Karmakar',
        role: 'PR Lead',
        imageUrl:
          '/team/Anubrata_Karmakar.jpg',
        instaUrl: 'https://www.instagram.com/anubrata_0312/',
        linkedinUrl: 'https://www.linkedin.com/in/anubrata-karmakar-926631212',
      },
      {
        name: 'Sayandip Das',
        role: 'Marketing Lead',
        imageUrl:
          '/team/Sayandip_Das.jpg',
        instaUrl: 'https://www.instagram.com/iamsayaandipdas/',
        linkedinUrl: 'https://www.linkedin.com/in/sayandip-das-592b7030b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      },
      {
        name: 'Shubham Sarkar',
        role: 'PR Member',
        imageUrl:
          '/team/Shubham_Sarkar.jpg',
        instaUrl: 'https://www.instagram.com/_iamshubhamsarkar_?igsh=MTZ2b24xc2pwdmI4dQ==',
        linkedinUrl: 'https://www.linkedin.com/in/shubham-sarkar-57438b27a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      },
      {
        name: 'Ayudh Banerjee',
        role: 'Judges Coordinator',
        imageUrl:
          '/team/Ayudh_Banerjee.jpeg',
        instaUrl: 'https://www.instagram.com/melody_of_lyf/',
        linkedinUrl: 'https://www.linkedin.com/in/ayudh-banerjee/',
      },
      {
        name: 'Debraj Chakraborty',
        role: 'Outreach & PR Team Member',
        imageUrl: '/team/Debraj_Chakraborty.jpeg',
        instaUrl: 'https://www.instagram.com/debrajchakraborty297?igsh=ZjEyZGp4azZwaXRo',
        linkedinUrl: 'https://www.linkedin.com/in/debraj-chakraborty-49b006312?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      },
      {
        name: 'Debarpan Ghosh',
        role: 'Outreach & PR Team Member',
        imageUrl: '/team/Debarpan_Ghosh.jpeg',
        instaUrl: 'https://www.instagram.com/ami_debarpan?igsh=MXdveTE2eW9ybHhrcw==',
        linkedinUrl: 'https://www.linkedin.com/in/debarpan-ghosh-405419322?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      },
      {
        name: 'Souranil Sen',
        role: 'Outreach & PR Team Member',
        imageUrl: '/team/Souranil_Sen.jpeg',
        instaUrl: '',
        linkedinUrl: 'https://www.linkedin.com/in/souranil-sen-ju/',
      },
      {
        name:'Md Arsh Ansari',
        role: 'Outreach & PR Team Member',
        imageUrl: '/team/Md_Arsh_Ansari.jpeg',
        instaUrl: 'https://www.instagram.com/peterparker16191?igsh=cTYyZzVucXg0OWlj',
        linkedinUrl: 'https://www.linkedin.com/in/md-arsh-ansari'
      }
    ]
  },
  {
    name: 'Logistics & Operations',
    members: [
      {
        name: 'Md. Taufique Ali ',
        role: 'Operations Lead',
        imageUrl:
          '/team/Taufique_Ali.jpg',
        instaUrl: 'https://www.instagram.com/taufiqueali007s?igsh=bHYycDVsaWUzN3By',
        linkedinUrl: 'https://www.linkedin.com/in/taufiqueali?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      },
      {
        name: 'Rudra Ray',
        role: 'Operations Lead',
        imageUrl: '/team/Rudra_Ray.jpeg',
        instaUrl: 'https://www.instagram.com/rudray006/',
        linkedinUrl: 'https://www.linkedin.com/in/rudray006/',
      },
      {
        name: 'Anamitra Roy',
        role: 'Logistics Lead',
        imageUrl:
          '/team/Anamitra_Roy.jpeg',
        instaUrl: 'https://www.instagram.com/itsroybaybay/',
        linkedinUrl: 'https://www.linkedin.com/in/anamitra-roy-832a6b301?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      },
      {
        name: 'Rishob Mondal',
        role: 'On Day Co-Lead',
        imageUrl:
          '/team/Rishob_Mondal.jpg',
        instaUrl: 'https://www.instagram.com/mondal_rishob?igsh=MXkybzNxcWlpNG91bg==',
        linkedinUrl: 'https://www.linkedin.com/in/rishob-mondal-671497258?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      },
      {
        name: 'Subhro Roy',
        role: 'On-Day Co-Lead',
        imageUrl:
          '/team/Subhro_Roy.jpg',
        instaUrl: 'https://www.instagram.com/lyadhkarkhana/profilecard/?igsh=MWxrdDltc2RweTdncw==',
        linkedinUrl: 'https://www.linkedin.com/in/subhro-roy-84b01827a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      },
      {
        name: 'Sabyasachi Sen',
        role: 'Logistics Member',
        imageUrl:
          '/team/Sabyasachi_Sen.jpeg',
        instaUrl: 'https://www.instagram.com/yoursabya/',
        linkedinUrl: 'https://www.linkedin.com/in/sabyasachi-sen-16b7b3303',
      },
    ]
  }
];
