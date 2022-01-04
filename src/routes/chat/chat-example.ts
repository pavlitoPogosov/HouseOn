import moment from 'moment';

import ImgPlaceholder from 'common/components/ui/_cards/TeamMemberCard/TeamMemberAvatar.png';
import { TChat, EChatDataTypes, EChatLanguagesTypes } from 'routes/chat/types';
import { MEMBERS } from 'routes/houseTeam/HouseTeamViewMembers/tempData';
import { EMediaTypes } from 'variables/media';

export const author5001 = MEMBERS[1];
export const author5002 = MEMBERS[2];
export const author5003 = MEMBERS[3];
export const author5004 = MEMBERS[4];
export const author5005 = MEMBERS[5];
export const author5006 = MEMBERS[6];
export const author5007 = MEMBERS[7];

export const CHAT_PERSONAL: TChat = {
  chatHouseHold: {
    image: ImgPlaceholder,
    name: 'Household name'
  },
  creator: { id: author5001.id },
  data: {
    content: [
      {
        author: author5001,
        date: moment().subtract(15, 'minutes'),
        id: 6001,
        text: 'Hi dude! How is your pension going?',
        type: EChatDataTypes.MESSAGE
      },
      {
        author: author5002,
        date: moment().subtract(14, 'minutes'),
        id: 6002,
        text: 'Hi dude! Hunky-Dory ))',
        type: EChatDataTypes.MESSAGE
      },
      {
        author: author5002,
        date: moment().subtract(13, 'minutes'),
        id: 6003,
        text: 'Opened a barbershop on Mars.',
        type: EChatDataTypes.MESSAGE
      },
      {
        author: author5001,
        date: moment().subtract(12, 'minutes'),
        id: 6004,
        text: 'Nice ))',
        type: EChatDataTypes.MESSAGE
      },
      {
        author: author5002,
        date: moment().subtract(11, 'minutes'),
        id: 6005,
        text: 'What did Obi-Wan tell Luke when his young apprentice was having a difficult time using chopsticks at the Chinese restaurant?',
        type: EChatDataTypes.MESSAGE
      },
      {
        author: author5001,
        date: moment().subtract(10, 'minutes'),
        id: 6006,
        text: 'Hmm... What?',
        type: EChatDataTypes.MESSAGE
      },
      {
        author: author5002,
        date: moment().subtract(9, 'minutes'),
        id: 6007,
        text: 'Use the forks, Luke.',
        type: EChatDataTypes.MESSAGE
      },
      {
        author: author5001,
        date: moment().subtract(8, 'minutes'),
        id: 6008,
        text: 'OMG. LOL.',
        type: EChatDataTypes.MESSAGE
      },
      {
        date: moment().subtract(7, 'minutes'),
        id: 6009,
        text: `${author5001.name} upgraded his Jedi skill`,
        type: EChatDataTypes.ACTION
      },
      {
        author: author5002,
        date: moment().subtract(6, 'minutes'),
        files: [
          {
            id: 7001,
            link: 'https://parentinfluence.com/wp-content/uploads/2021/02/23-8.jpg',
            type: EMediaTypes.IMAGE
          }
        ],
        id: 6010,
        text: 'Just check it out ))0',
        type: EChatDataTypes.MESSAGE
      },
      {
        author: author5001,
        date: moment().subtract(5, 'minutes'),
        files: [
          {
            id: 7001,
            link: 'https://i.kym-cdn.com/entries/icons/original/000/000/554/picard-facepalm.jpg',
            type: EMediaTypes.IMAGE
          }
        ],
        id: 6011,
        text: '',
        type: EChatDataTypes.MESSAGE
      },
      {
        author: author5002,
        date: moment().subtract(4, 'minutes'),
        files: [
          {
            id: 7001,
            link: 'https://youtu.be/4cJpiOPKH14',
            type: EMediaTypes.VIDEO
          }
        ],
        id: 6012,
        text: '',
        type: EChatDataTypes.MESSAGE
      },
      {
        author: author5001,
        date: moment().subtract(3, 'minutes'),
        files: [
          {
            id: 7002,
            link: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
            type: EMediaTypes.VIDEO
          },
          {
            id: 7003,
            link: 'https://media.contentapi.ea.com/content/dam/gin/images/2017/01/star-wars-battlefront-key-art.jpg.adapt.crop3x5.533p.jpg',
            type: EMediaTypes.IMAGE
          },
          {
            id: 7004,
            link: 'https://i.ytimg.com/vi/ngElkyQ6Rhs/hqdefault.jpg',
            type: EMediaTypes.IMAGE
          }
        ],
        id: 6013,
        text: '',
        type: EChatDataTypes.MESSAGE
      },
      {
        author: author5002,
        date: moment().subtract(2, 'minutes'),
        files: [
          {
            id: 7005,
            link: 'https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf',
            type: EMediaTypes.DOC
          },
          {
            id: 7006,
            link: 'https://lumiere-a.akamaihd.net/v1/images/leia-organa-feature-image_d0f5e953.jpeg?region=0%2C0%2C1280%2C720&width=960',
            type: EMediaTypes.IMAGE
          }
        ],
        id: 6014,
        text: '',
        type: EChatDataTypes.MESSAGE
      }
    ],
    date: moment().subtract(20, 'minutes'),
    translations: {
      [EChatLanguagesTypes.DE]: [
        {
          id: 6005,
          text: 'Wat vertelde Obi-Wan aan Luke toen zijn jonge leerling het moeilijk had om eetstokjes te gebruiken in het Chinese restaurant?',
          updated: moment().subtract(1, 'minutes')
        }
      ]
    }
  },
  date: moment().subtract(1, 'days'),
  id: 4001,
  image: author5002.avatar || '',
  isGroup: false,
  isPersonal: true,
  isSystem: false,
  members: [
    {
      ...author5001,
      avatar: author5001.avatar,
      id: author5001.id,
      isAdmin: true,
      isGuest: true,
      name: author5001.name
    },
    {
      ...author5002,
      avatar: author5002.avatar,
      id: author5002.id,
      isAdmin: false,
      isGuest: true,
      name: author5002.name
    }
  ],
  name: author5002.name,
  unread: 1
};

export const CHAT_GROUP: TChat = {
  ...CHAT_PERSONAL,
  creator: { id: author5001.id },
  data: {
    ...CHAT_PERSONAL.data,
    content: [
      ...CHAT_PERSONAL.data.content,
      {
        author: author5003,
        date: moment().subtract(10, 'minutes').subtract(30, 'seconds'),
        id: 6015,
        text: 'Nice ))',
        type: EChatDataTypes.MESSAGE
      },
      {
        author: author5004,
        date: moment().subtract(10, 'minutes').subtract(29, 'seconds'),
        id: 6016,
        text: 'What did Obi-Wan tell Luke when his young apprentice was having a difficult time using chopsticks at the Chinese restaurant?',
        type: EChatDataTypes.MESSAGE
      },
      {
        author: author5005,
        date: moment().subtract(10, 'minutes').subtract(28, 'seconds'),
        id: 6017,
        text: 'Hmm... What?',
        type: EChatDataTypes.MESSAGE
      },
      {
        author: author5006,
        date: moment().subtract(10, 'minutes').subtract(27, 'seconds'),
        id: 6018,
        text: 'Hmm... What?',
        type: EChatDataTypes.MESSAGE
      }
    ]
  },
  image:
    'https://images.vexels.com/media/users/3/157512/isolated/lists/d737a872708b488d89d0341ac9b8bc5a-people-contact-icon-people.png',
  isGroup: true,
  members: [...(CHAT_PERSONAL.members || []), author5003, author5004, author5005, author5006],
  name: 'Group chat'
};

export const CHAT_SYSTEM: TChat = {
  ...CHAT_PERSONAL,
  creator: { id: author5001.id },
  data: {
    ...CHAT_PERSONAL.data,
    content: [
      {
        author: author5001,
        date: moment().subtract(10, 'minutes').subtract(30, 'seconds'),
        id: 6020,
        text: 'Hi, I need to prepare my house for the biggest party ever. My own party with blackjack and so on...',
        type: EChatDataTypes.MESSAGE
      },
      {
        author: author5007,
        date: moment().subtract(9, 'minutes').subtract(29, 'seconds'),
        id: 6021,
        text: 'Yeah, we will help you )',
        type: EChatDataTypes.MESSAGE
      }
    ]
  },
  image: author5007.avatar || '',
  isSystem: true,
  members: [author5001, author5007],
  name: 'System chat'
};
