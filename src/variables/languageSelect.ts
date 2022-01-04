import ESFlagImg from 'assets/images/flags/ES.png';
import FRFlagImg from 'assets/images/flags/FR.png';
import GEFlagImg from 'assets/images/flags/GE.png';
import ITFlagImg from 'assets/images/flags/IT.png';
import PTFlagImg from 'assets/images/flags/PT.png';
import RUFlagImg from 'assets/images/flags/RU.png';
import USFlagImg from 'assets/images/flags/US.png';
import { ISelectLanguageOption, ISelectPrimaryOption } from 'common/components/ui/Select';
import { EChatLanguagesTypes, EChatLanguagesFull, EChatLanguagesShort } from 'routes/chat/types';

export const LANGUAGE_SELECT_OPTIONS: ISelectPrimaryOption[] = [
  { text: EChatLanguagesFull.RU, value: EChatLanguagesTypes.RU },
  { text: EChatLanguagesFull.EN, value: EChatLanguagesTypes.EN },
  { text: EChatLanguagesFull.DE, value: EChatLanguagesTypes.DE },
  { text: EChatLanguagesFull.FR, value: EChatLanguagesTypes.FR },
  { text: EChatLanguagesFull.SP, value: EChatLanguagesTypes.SP },
  { text: EChatLanguagesFull.IT, value: EChatLanguagesTypes.IT },
  { text: EChatLanguagesFull.ES, value: EChatLanguagesTypes.ES }
];

export const LANGUAGE_SELECT_OPTIONS_WITH_IMGS: ISelectLanguageOption[] = [
  {
    image: RUFlagImg,
    text: EChatLanguagesShort.RU,
    value: EChatLanguagesTypes.RU
  },
  {
    image: USFlagImg,
    text: EChatLanguagesShort.EN,
    value: EChatLanguagesTypes.EN
  },
  {
    image: GEFlagImg,
    text: EChatLanguagesShort.DE,
    value: EChatLanguagesTypes.DE
  },
  {
    image: FRFlagImg,
    text: EChatLanguagesShort.FR,
    value: EChatLanguagesTypes.FR
  },
  {
    image: ESFlagImg,
    text: EChatLanguagesShort.SP,
    value: EChatLanguagesTypes.SP
  },
  {
    image: ITFlagImg,
    text: EChatLanguagesShort.IT,
    value: EChatLanguagesTypes.IT
  },
  {
    image: PTFlagImg,
    text: EChatLanguagesShort.ES,
    value: EChatLanguagesTypes.ES
  }
];
