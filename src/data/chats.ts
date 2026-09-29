// ============================================================
// CHATS DATA FILE — SINGLE SOURCE OF TRUTH
// Contains:
// Scene 02 actual WhatsApp conversation (from verified screenshots)
// ============================================================

export interface QuotedMessage {
  sender: 'Samikshaa MIT' | 'You';
  text: string;
  color?: string; // accent bar color
}

export interface Scene02Message {
  id: string;
  sender: 'samiksha' | 'me';
  type: 'text' | 'image-attachment' | 'link-attachment';
  text?: string;
  time: string;
  status?: 'sent' | 'delivered' | 'read';
  isEdited?: boolean;
  isHighlight?: boolean; // green PRN link text
  quotedMessage?: QuotedMessage;
  attachment?: {
    type: 'sheet-download' | 'spreadsheet-preview';
    size?: string;
    linkUrl?: string;
  };
}

// ------------------------------------------------------------
// SCENE 02: Real Chronological WhatsApp Conversation
// 30 September 2024 (Exact sequence from screenshots 1, 2, 3)
// ------------------------------------------------------------
export const scene02Messages: Scene02Message[] = [
  // Screenshot 1
  {
    id: 'm1',
    sender: 'samiksha',
    type: 'text',
    text: 'Heyy',
    time: '4:50 pm',
  },
  {
    id: 'm2',
    sender: 'me',
    type: 'text',
    text: 'Hello',
    time: '4:50 pm',
    status: 'read',
  },
  {
    id: 'm3',
    sender: 'samiksha',
    type: 'image-attachment',
    attachment: {
      type: 'sheet-download',
      size: '98 kB',
    },
    time: '4:51 pm',
  },
  {
    id: 'm4',
    sender: 'samiksha',
    type: 'text',
    text: 'Why is my prn no. Visible on other roll\nnumbers😭😭',
    time: '4:51 pm',
  },
  {
    id: 'm5',
    sender: 'samiksha',
    type: 'text',
    text: 'Can you just see once',
    time: '4:51 pm',
  },
  {
    id: 'm6',
    sender: 'me',
    type: 'text',
    text: "What's your roll number ?",
    time: '4:52 pm',
    isEdited: true,
    status: 'read',
  },
  {
    id: 'm7',
    sender: 'samiksha',
    type: 'text',
    text: '47',
    time: '4:52 pm',
  },

  // Screenshot 2
  {
    id: 'm8',
    sender: 'me',
    type: 'text',
    quotedMessage: {
      sender: 'Samikshaa MIT',
      text: '47',
      color: '#b388ff',
    },
    text: 'Okay',
    time: '4:52 pm',
    status: 'read',
  },
  {
    id: 'm9',
    sender: 'me',
    type: 'text',
    text: 'Your prn ?',
    time: '4:52 pm',
    status: 'read',
  },
  {
    id: 'm10',
    sender: 'samiksha',
    type: 'text',
    text: '2024████████',
    isHighlight: true, // green text format
    time: '4:52 pm',
  },
  {
    id: 'm11',
    sender: 'samiksha',
    type: 'text',
    text: 'See',
    time: '4:52 pm',
  },
  {
    id: 'm12',
    sender: 'me',
    type: 'text',
    text: 'Ya !!',
    time: '4:53 pm',
    status: 'read',
  },
  {
    id: 'm13',
    sender: 'me',
    type: 'text',
    text: 'Now check it once',
    time: '4:53 pm',
    status: 'read',
  },
  {
    id: 'm14',
    sender: 'me',
    type: 'text',
    text: 'Is it resolved ? 🤔',
    time: '4:53 pm',
    status: 'read',
  },
  {
    id: 'm15',
    sender: 'samiksha',
    type: 'text',
    text: 'Ig noo',
    time: '4:53 pm',
  },
  {
    id: 'm16',
    sender: 'me',
    type: 'text',
    text: 'Wait...',
    time: '4:54 pm',
    status: 'read',
  },
  {
    id: 'm17',
    sender: 'me',
    type: 'link-attachment',
    text: 'https://1drv.ms/x/s!AkehCYRQnTjbgSPsyrPHLOTuE-s9?e=HNlgmc',
    attachment: {
      type: 'spreadsheet-preview',
      linkUrl: 'https://1drv.ms/x/s!AkehCYRQnTjbgSPsyrPHLOTuE-s9?e=HNlgmc',
    },
    time: '4:54 pm',
    status: 'read',
  },

  // Screenshot 3
  {
    id: 'm18',
    sender: 'me',
    type: 'text',
    quotedMessage: {
      sender: 'You',
      text: 'https://1drv.ms/x/s!AkehCYRQnTjbgSPsyrPHLOTuE-s9?e=HNlgmc',
      color: '#00a884',
    },
    text: 'Visit this link once again',
    time: '4:54 pm',
    status: 'read',
  },
  {
    id: 'm19',
    sender: 'samiksha',
    type: 'text',
    quotedMessage: {
      sender: 'You',
      text: 'https://1drv.ms/x/s!AkehCYRQnTjbgSPsyrPHLOTuE-s9?e=HNlgmc',
      color: '#00a884',
    },
    text: 'Cool Thankyouuu!!',
    time: '4:55 pm',
  },
  {
    id: 'm20',
    sender: 'me',
    type: 'text',
    quotedMessage: {
      sender: 'Samikshaa MIT',
      text: 'Cool Thankyouuu!!',
      color: '#b388ff',
    },
    text: 'Welcome !!',
    time: '4:56 pm',
    status: 'read',
  },
  {
    id: 'm21',
    sender: 'samiksha',
    type: 'text',
    text: 'Ha donee',
    time: '4:56 pm',
  },
];
