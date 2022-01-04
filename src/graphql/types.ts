export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A field whose value is a Currency: https://en.wikipedia.org/wiki/ISO_4217. */
  Currency: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: moment.Moment;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Time: moment.Moment;
  /** A field whose value is a UTC Offset: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones */
  UtcOffset: any;
};

export type AccountCreateInput = {
  amplua?: Maybe<Scalars['String']>;
  expires_at?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  role: AccountRolesEnum;
};

export type AccountFilterInput = {
  is_deactivated?: Maybe<Scalars['Boolean']>;
  is_pending_invite?: Maybe<Scalars['Boolean']>;
  roles?: Maybe<Array<AccountRolesEnum>>;
};

export type AccountPublicType = {
  __typename?: 'AccountPublicType';
  role: AccountRolesEnum;
};

/** Роль аккаунта */
export enum AccountRolesEnum {
  Admin = 'ADMIN',
  Guest = 'GUEST',
  Owner = 'OWNER',
  Worker = 'WORKER'
}

export type AccountScheduleCreateInput = {
  end_time?: Maybe<Scalars['Time']>;
  start_time?: Maybe<Scalars['Time']>;
  weekday: WeekDaysEnum;
};

export type AccountScheduleType = {
  __typename?: 'AccountScheduleType';
  end_time?: Maybe<Scalars['Time']>;
  id: Scalars['ID'];
  start_time?: Maybe<Scalars['Time']>;
  weekday: WeekDaysEnum;
};

export type AccountScheduleUpdateInput = {
  end_time?: Maybe<Scalars['Time']>;
  start_time?: Maybe<Scalars['Time']>;
  weekday?: Maybe<WeekDaysEnum>;
};

export type AccountType = {
  __typename?: 'AccountType';
  amplua?: Maybe<Scalars['String']>;
  archived_at?: Maybe<Scalars['DateTime']>;
  created_at: Scalars['DateTime'];
  deactivated_at?: Maybe<Scalars['DateTime']>;
  expires_at?: Maybe<Scalars['DateTime']>;
  has_active_tracker: Scalars['Boolean'];
  house: HouseType;
  house_id: Scalars['ID'];
  id: Scalars['ID'];
  invite?: Maybe<InviteType>;
  is_active: Scalars['Boolean'];
  is_pending_invite: Scalars['Boolean'];
  name?: Maybe<Scalars['String']>;
  owned_house_id?: Maybe<Scalars['ID']>;
  rewards: Array<RewardType>;
  role: AccountRolesEnum;
  salary?: Maybe<SalaryType>;
  salary_id?: Maybe<Scalars['ID']>;
  schedules?: Maybe<Array<AccountScheduleType>>;
  user?: Maybe<UserType>;
  user_id?: Maybe<Scalars['ID']>;
};

export type AccountTypeRewardsArgs = {
  limit?: Maybe<Scalars['Int']>;
};

export type AccountUpdateInput = {
  accountSchedules?: Maybe<Array<AccountScheduleUpdateInput>>;
  amplua?: Maybe<Scalars['String']>;
  expires_at?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  salary?: Maybe<SalaryUpdateInput>;
};

export type AttachmentType = {
  __typename?: 'AttachmentType';
  id: Scalars['ID'];
  /** URL файла */
  url: Scalars['String'];
};

export type AuthResponseType = {
  __typename?: 'AuthResponseType';
  accessToken: Scalars['String'];
  refreshToken: UserAuthTokenType;
  user: UserType;
};

export type ContactCreateInput = {
  additional_info?: Maybe<Scalars['String']>;
  phone: Scalars['String'];
  title: Scalars['String'];
};

export type ContactInput = {
  additional_info?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  phone?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ContactOptionalInput = {
  additional_info?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  phone?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ContactPublicType = {
  __typename?: 'ContactPublicType';
  phone: Scalars['String'];
  title: Scalars['String'];
};

export type ContactType = {
  __typename?: 'ContactType';
  additional_info?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  phone: Scalars['String'];
  title: Scalars['String'];
};

export type ContactUpdateInput = {
  additional_info?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  phone?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type DirectionPublicType = {
  __typename?: 'DirectionPublicType';
  additional_info?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  geo_json?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type DirectionType = {
  __typename?: 'DirectionType';
  additional_info?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  geo_json?: Maybe<Scalars['JSON']>;
  house_id?: Maybe<Scalars['ID']>;
  id: Scalars['ID'];
  /** Файлы изображения */
  images?: Maybe<Array<AttachmentType>>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export enum DurationEnum {
  Hours = 'HOURS',
  Month = 'MONTH'
}

export type EmailChangeInput = {
  new_email: Scalars['String'];
};

export type EmailSignupInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export enum EventSortingFieldsEnum {
  StartsAt = 'starts_at'
}

/** Единица измерения площади домовладения */
export enum FloorSpaceUnitsEnum {
  /** Квадратные футы */
  Feet = 'FEET',
  /** Квардатные метры */
  Meter = 'METER'
}

export type HouseDirectionInput = {
  additional_info?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  geo_json?: Maybe<Scalars['JSON']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type HouseEventCreateInput = {
  additional_info?: Maybe<Scalars['String']>;
  contacts: Array<ContactOptionalInput>;
  description?: Maybe<Scalars['String']>;
  direction?: Maybe<HouseDirectionInput>;
  ends_at: Scalars['DateTime'];
  starts_at: Scalars['DateTime'];
  title: Scalars['String'];
  uses_house_direction?: Maybe<Scalars['Boolean']>;
};

export type HouseEventFilter = {
  ends_at?: Maybe<Scalars['DateTime']>;
  starts_at?: Maybe<Scalars['DateTime']>;
};

export type HouseEventPageInput = {
  filter?: Maybe<HouseEventFilter>;
  pagination?: Maybe<PaginationInput>;
  sorting?: Maybe<Array<HouseEventPageSorting>>;
};

export type HouseEventPageSorting = {
  direction?: Maybe<SortingDirectionEnum>;
  field: EventSortingFieldsEnum;
  nulls?: Maybe<SortingNullsEnum>;
};

export type HouseEventPublicType = {
  __typename?: 'HouseEventPublicType';
  contacts?: Maybe<Array<ContactPublicType>>;
  creator?: Maybe<UserPublicType>;
  creator_account_id?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  direction?: Maybe<DirectionPublicType>;
  direction_id?: Maybe<Scalars['ID']>;
  ends_at: Scalars['DateTime'];
  id: Scalars['ID'];
  starts_at: Scalars['DateTime'];
  title: Scalars['String'];
};

export type HouseEventType = {
  __typename?: 'HouseEventType';
  additional_info?: Maybe<Scalars['String']>;
  contacts?: Maybe<Array<ContactType>>;
  creator?: Maybe<UserType>;
  creator_account_id?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  direction?: Maybe<DirectionType>;
  direction_id?: Maybe<Scalars['ID']>;
  ends_at: Scalars['DateTime'];
  house_id: Scalars['ID'];
  id: Scalars['ID'];
  public_uuid: Scalars['String'];
  starts_at: Scalars['DateTime'];
  title: Scalars['String'];
  uses_house_direction: Scalars['Boolean'];
};

export type HouseEventUpdateInput = {
  additional_info?: Maybe<Scalars['String']>;
  contacts?: Maybe<Array<ContactOptionalInput>>;
  description?: Maybe<Scalars['String']>;
  direction?: Maybe<HouseDirectionInput>;
  ends_at?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  starts_at?: Maybe<Scalars['DateTime']>;
  title?: Maybe<Scalars['String']>;
  uses_house_direction?: Maybe<Scalars['Boolean']>;
};

export type HouseEventsPageType = {
  __typename?: 'HouseEventsPageType';
  header: PaginationHeaderType;
  list: Array<HouseEventType>;
};

export type HouseInitializationInput = {
  comments?: Maybe<Scalars['String']>;
  /**
   * Площадь домовладения в единице измерения, указываемой в поле floor_space_unit.
   *       Валидация:
   *       - до 4 знаков до запятой
   *       - до 2 знаков после запятой
   *       - положительное число
   */
  floor_space?: Maybe<Scalars['Float']>;
  floor_space_unit?: Maybe<FloorSpaceUnitsEnum>;
  ownership_type?: Maybe<OwnershipTypesEnum>;
  rent_expire_at?: Maybe<Scalars['DateTime']>;
  timezone: Scalars['UtcOffset'];
  title: Scalars['String'];
};

/** Результат создания домовладения */
export type HouseInitializationResult = {
  __typename?: 'HouseInitializationResult';
  account: AccountType;
  house: HouseType;
};

export type HouseInstructionsUpdateInput = {
  instructions: Array<InstructionCreateInput>;
};

export type HousePublicType = {
  __typename?: 'HousePublicType';
  title: Scalars['String'];
};

export type HouseStatusCreateInput = {
  expires_at?: Maybe<Scalars['DateTime']>;
  text: Scalars['String'];
  title: Scalars['String'];
};

export type HouseStatusType = {
  __typename?: 'HouseStatusType';
  created_at: Scalars['DateTime'];
  expires_at?: Maybe<Scalars['DateTime']>;
  house_id: Scalars['ID'];
  id: Scalars['ID'];
  text: Scalars['String'];
  title: Scalars['String'];
};

export type HouseStatusUpdate = {
  expires_at?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type HouseStatusUpdateInput = {
  expires_at?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  text: Scalars['String'];
  title: Scalars['String'];
};

export type HouseType = {
  __typename?: 'HouseType';
  comments?: Maybe<Scalars['String']>;
  /** Контакты, привязанные к домовладению */
  contacts?: Maybe<Array<ContactType>>;
  count_events: Scalars['Int'];
  /** Информация о расположении домовладения */
  direction?: Maybe<DirectionType>;
  events?: Maybe<Array<HouseEventType>>;
  /**
   * Площадь домовладения в единице измерения, указываемой в поле floor_space_unit.
   *       Валидация:
   *       - до 4 знаков до запятой
   *       - до 2 знаков после запятой
   *       - положительное число
   */
  floor_space?: Maybe<Scalars['Float']>;
  floor_space_unit?: Maybe<FloorSpaceUnitsEnum>;
  id: Scalars['ID'];
  /** Файл изображения */
  image?: Maybe<AttachmentType>;
  instructions: Array<InstructionType>;
  owner_account_id?: Maybe<Scalars['ID']>;
  ownership_type?: Maybe<OwnershipTypesEnum>;
  rent_expire_at?: Maybe<Scalars['DateTime']>;
  statuses: Array<HouseStatusType>;
  timezone: Scalars['UtcOffset'];
  title: Scalars['String'];
};

export type HouseUpdateInput = {
  comments?: Maybe<Scalars['String']>;
  /**
   * Площадь домовладения в единице измерения, указываемой в поле floor_space_unit.
   *       Валидация:
   *       - до 4 знаков до запятой
   *       - до 2 знаков после запятой
   *       - положительное число
   */
  floor_space?: Maybe<Scalars['Float']>;
  floor_space_unit?: Maybe<FloorSpaceUnitsEnum>;
  ownership_type?: Maybe<OwnershipTypesEnum>;
  rent_expire_at?: Maybe<Scalars['DateTime']>;
  statuses?: Maybe<Array<HouseStatusUpdate>>;
  timezone?: Maybe<Scalars['UtcOffset']>;
  title?: Maybe<Scalars['String']>;
};

export type InstructionCreateInput = {
  description?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type InstructionType = {
  __typename?: 'InstructionType';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type InstructionUpdateInput = {
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type InvitePublicType = {
  __typename?: 'InvitePublicType';
  account: AccountPublicType;
  creator: UserPublicType;
  house: HousePublicType;
  public_uuid: Scalars['String'];
};

export type InviteToHouseCreateInput = {
  account: AccountCreateInput;
  accountSchedules?: Maybe<Array<AccountScheduleCreateInput>>;
  salary?: Maybe<SalaryCreateInput>;
};

export type InviteType = {
  __typename?: 'InviteType';
  account: AccountType;
  creator: UserType;
  house: HouseType;
  id: Scalars['ID'];
  public_uuid: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptHouseInvite: AccountType;
  addDirectionImage: DirectionType;
  archiveAccount: Scalars['Boolean'];
  /** Мутация для смены пароля */
  changePassword: AuthResponseType;
  /** Мутация для смены телефона */
  changePhone: Scalars['Boolean'];
  createAvatarOtt: Scalars['String'];
  createDirectionImageOtt: Scalars['String'];
  createHouseContact: ContactType;
  createHouseEvent: HouseEventType;
  createHouseImageOtt: Scalars['String'];
  createHouseInvite: InviteType;
  createHouseStatus: HouseStatusType;
  createInstruction: InstructionType;
  createOAuthOneTimeToken: Scalars['String'];
  createProject: ProjectType;
  createReward: RewardType;
  deactivateAccount: AccountType;
  deleteAccount: Scalars['Boolean'];
  deleteDirectionImage: DirectionType;
  deleteHouseContact: ContactType;
  deleteHouseEvent: Scalars['Boolean'];
  deleteHouseStatus: Scalars['Boolean'];
  deleteInstruction: Scalars['Boolean'];
  /** Создаёт новое домовладение и первый аккаунт пользователя в доме с ролью домовладельца */
  initializeHouse: HouseInitializationResult;
  logout: Scalars['Boolean'];
  recoverPassword: AuthResponseType;
  setHouseImage: HouseType;
  setUserAvatar: UserType;
  /** Авторизация при помощи почты и пароля */
  signInWithEmail: AuthResponseType;
  /** Create user with email and password */
  signUpWithEmail: AuthResponseType;
  startEmailChangingFlow: Scalars['Boolean'];
  /** Мутация для восстановления пароля */
  startPasswordRecoverFlow: Scalars['Boolean'];
  /** Начинает flow для смены номера телефона */
  startPhoneChangeFlow: Scalars['Int'];
  /**
   * Начинает flow для аутентификации при помощи телефона.
   *     В результате выполнения возвращает время жизни сгенерированного одноразового пароля
   */
  startSmsAuthFlow: Scalars['Int'];
  /** Старт трекера времени. Для одного аккаунта одновременно активным может быть только один трекер, поэтому мутация вернет либо активный трекер, либо инициализирует новый и вернет его */
  startTacking: TrackerType;
  /** Остановка трекера времени. При отсутствии активного трекера, будет возвращена ошибка BadRequest */
  stopTacking: TrackerType;
  updateAccount: AccountType;
  /** Создаёт новое домовладение и первый аккаунт пользователя в доме с ролью домовладельца */
  updateHouse: HouseType;
  updateHouseContact: ContactType;
  /** Универсальное обновление телефонной книги домовладения. Создание новых, обновление старых, удаление ненужных */
  updateHouseContacts: Array<ContactType>;
  /** Обновление информации о расположении домовладения */
  updateHouseDirection: DirectionType;
  updateHouseEvent: HouseEventType;
  updateHouseInstructions: HouseType;
  updateHouseStatus: HouseStatusType;
  updateInstruction: InstructionType;
  updateProfile: UserType;
  useRefreshToken: AuthResponseType;
  /** Позволяет обменять пару из номера телефона и одноразового пароля на данные для авторизации */
  verifySmsAuthCode: AuthResponseType;
};

export type MutationAcceptHouseInviteArgs = {
  public_uuid: Scalars['String'];
};

export type MutationAddDirectionImageArgs = {
  direction_id: Scalars['ID'];
  uuid: Scalars['String'];
};

export type MutationArchiveAccountArgs = {
  id: Scalars['ID'];
};

export type MutationChangePasswordArgs = {
  input: PasswordChangeInput;
};

export type MutationChangePhoneArgs = {
  code: Scalars['String'];
};

export type MutationCreateHouseContactArgs = {
  input: ContactCreateInput;
};

export type MutationCreateHouseEventArgs = {
  input: HouseEventCreateInput;
};

export type MutationCreateHouseInviteArgs = {
  input: InviteToHouseCreateInput;
};

export type MutationCreateHouseStatusArgs = {
  input: HouseStatusCreateInput;
};

export type MutationCreateInstructionArgs = {
  input: InstructionCreateInput;
};

export type MutationCreateProjectArgs = {
  input: ProjectCreateInput;
};

export type MutationCreateRewardArgs = {
  input: RewardInput;
};

export type MutationDeactivateAccountArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteAccountArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteDirectionImageArgs = {
  attachment_id: Scalars['ID'];
  direction_id: Scalars['ID'];
};

export type MutationDeleteHouseContactArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteHouseEventArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteHouseStatusArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteInstructionArgs = {
  id: Scalars['ID'];
};

export type MutationInitializeHouseArgs = {
  input: HouseInitializationInput;
};

export type MutationLogoutArgs = {
  token: Scalars['String'];
};

export type MutationRecoverPasswordArgs = {
  input: PasswordRecoverInput;
};

export type MutationSetHouseImageArgs = {
  house_id: Scalars['ID'];
  uuid: Scalars['String'];
};

export type MutationSetUserAvatarArgs = {
  uuid: Scalars['String'];
};

export type MutationSignInWithEmailArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationSignUpWithEmailArgs = {
  input: EmailSignupInput;
};

export type MutationStartEmailChangingFlowArgs = {
  input: EmailChangeInput;
};

export type MutationStartPasswordRecoverFlowArgs = {
  email: Scalars['String'];
};

export type MutationStartPhoneChangeFlowArgs = {
  input: SmsAuthInput;
};

export type MutationStartSmsAuthFlowArgs = {
  input: SmsAuthInput;
};

export type MutationUpdateAccountArgs = {
  input: AccountUpdateInput;
};

export type MutationUpdateHouseArgs = {
  input: HouseUpdateInput;
};

export type MutationUpdateHouseContactArgs = {
  input: ContactUpdateInput;
};

export type MutationUpdateHouseContactsArgs = {
  input: UpdateHouseContactsInput;
};

export type MutationUpdateHouseDirectionArgs = {
  input: HouseDirectionInput;
};

export type MutationUpdateHouseEventArgs = {
  input: HouseEventUpdateInput;
};

export type MutationUpdateHouseInstructionsArgs = {
  input: HouseInstructionsUpdateInput;
};

export type MutationUpdateHouseStatusArgs = {
  input: HouseStatusUpdateInput;
};

export type MutationUpdateInstructionArgs = {
  input: InstructionUpdateInput;
};

export type MutationUpdateProfileArgs = {
  input: UserUpdateInput;
};

export type MutationUseRefreshTokenArgs = {
  token: Scalars['String'];
};

export type MutationVerifySmsAuthCodeArgs = {
  input: SmsAuthVerificationInput;
};

/** Типы владения домом */
export enum OwnershipTypesEnum {
  /** Пользователь является владельцем дома */
  Owner = 'OWNER',
  /** Пользователь арендует дом */
  Rented = 'RENTED'
}

export type PaginationHeaderType = {
  __typename?: 'PaginationHeaderType';
  hasNext: Scalars['Boolean'];
  onePage: Scalars['Int'];
  page: Scalars['Int'];
  totalCount: Scalars['Int'];
};

/** Данные пагинации */
export type PaginationInput = {
  onePage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};

export type PasswordChangeInput = {
  new_password: Scalars['String'];
  old_password: Scalars['String'];
};

export type PasswordRecoverInput = {
  new_password: Scalars['String'];
  token: Scalars['String'];
};

export type ProjectCreateInput = {
  description?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
  status: Status;
  title?: Maybe<Scalars['String']>;
  type: Type;
};

export type ProjectType = {
  __typename?: 'ProjectType';
  description?: Maybe<Scalars['String']>;
  house_id: Scalars['ID'];
  id: Scalars['ID'];
  picture?: Maybe<Scalars['String']>;
  status: Status;
  title?: Maybe<Scalars['String']>;
  type: Type;
};

export type Query = {
  __typename?: 'Query';
  account: AccountType;
  accountById: AccountType;
  /** Получение трекеров указенного аккаунта за все время */
  accountTrackers: Array<TrackerType>;
  availableAccounts: Array<AccountType>;
  event?: Maybe<HouseEventType>;
  /** Получение домовладения по его ID */
  house?: Maybe<HouseType>;
  houseAccounts: Array<AccountType>;
  houseContacts: Array<ContactType>;
  houseEventPublic: HouseEventPublicType;
  houseEventsPage?: Maybe<HouseEventsPageType>;
  houseStatuses: Array<HouseStatusType>;
  invite: InviteType;
  invitePublic: InvitePublicType;
  /** Получение трекеров текущего аккаунта за текущий день */
  todayTrackers: Array<TrackerType>;
  user?: Maybe<UserType>;
  usersPage?: Maybe<UserPageType>;
};

export type QueryAccountByIdArgs = {
  id: Scalars['ID'];
};

export type QueryAccountTrackersArgs = {
  account_id: Scalars['ID'];
};

export type QueryEventArgs = {
  id: Scalars['ID'];
};

export type QueryHouseAccountsArgs = {
  input?: Maybe<AccountFilterInput>;
};

export type QueryHouseEventPublicArgs = {
  public_uuid: Scalars['String'];
};

export type QueryHouseEventsPageArgs = {
  input?: Maybe<HouseEventPageInput>;
};

export type QueryInviteArgs = {
  public_uuid: Scalars['String'];
};

export type QueryInvitePublicArgs = {
  public_uuid: Scalars['String'];
};

export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type QueryUsersPageArgs = {
  input?: Maybe<UserPageInput>;
};

export type RewardInput = {
  amount: Scalars['Float'];
  currency: Scalars['Currency'];
  receiver_account_id: Scalars['ID'];
};

export type RewardType = {
  __typename?: 'RewardType';
  amount: Scalars['Float'];
  created_at: Scalars['DateTime'];
  creator: AccountType;
  creator_account_id: Scalars['ID'];
  currency: Scalars['Currency'];
  id: Scalars['ID'];
  receiver: AccountType;
  receiver_account_id: Scalars['ID'];
};

export type SalaryCreateInput = {
  amount: Scalars['Int'];
  currency: Scalars['Currency'];
  duration: DurationEnum;
};

export type SalaryType = {
  __typename?: 'SalaryType';
  account_id: Scalars['ID'];
  amount: Scalars['Int'];
  currency: Scalars['Currency'];
  duration: DurationEnum;
  id: Scalars['ID'];
};

export type SalaryUpdateInput = {
  amount?: Maybe<Scalars['Int']>;
  currency?: Maybe<Scalars['Currency']>;
  duration?: Maybe<DurationEnum>;
};

export type SmsAuthInput = {
  phone: Scalars['String'];
};

export type SmsAuthVerificationInput = {
  code: Scalars['String'];
  phone: Scalars['String'];
};

export enum SortingDirectionEnum {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum SortingNullsEnum {
  First = 'FIRST',
  Last = 'LAST'
}

/** Status of the project a given time */
export enum Status {
  Active = 'ACTIVE',
  Expired = 'EXPIRED',
  Suspended = 'SUSPENDED'
}

export type Subscription = {
  __typename?: 'Subscription';
  statusAdded: HouseStatusType;
  statusDeleted: Scalars['ID'];
  statusUpdated: HouseStatusType;
};

export enum TokenType {
  Refresh = 'REFRESH'
}

export type TrackerType = {
  __typename?: 'TrackerType';
  end_time?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  start_time: Scalars['DateTime'];
};

/** Type of the project a given time */
export enum Type {
  Extra = 'EXTRA',
  Periodic = 'PERIODIC'
}

export type UpdateHouseContactsInput = {
  contacts: Array<ContactInput>;
};

export type UserAuthTokenType = {
  __typename?: 'UserAuthTokenType';
  expires_at?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  token: Scalars['String'];
  type: TokenType;
};

export type UserFilter = {
  creator_user_ids?: Maybe<Scalars['ID']>;
  exclude_ids?: Maybe<Scalars['ID']>;
  ids?: Maybe<Scalars['ID']>;
  search: Scalars['String'];
};

export type UserPageInput = {
  filter?: Maybe<UserFilter>;
  pagination?: Maybe<PaginationInput>;
};

export type UserPageType = {
  __typename?: 'UserPageType';
  header: PaginationHeaderType;
  list: Array<UserType>;
};

export type UserPublicType = {
  __typename?: 'UserPublicType';
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type UserType = {
  __typename?: 'UserType';
  /** Аккаунты пользователя в разных домовладениях */
  accounts?: Maybe<Array<AccountType>>;
  /** Файл аватара */
  avatar?: Maybe<AttachmentType>;
  date_of_birth?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  email_verified: Scalars['String'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

export type UserUpdateInput = {
  date_of_birth?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
};

/** Дни недели */
export enum WeekDaysEnum {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY'
}
