import { Routes, RouteType } from 'common/components/utils/Routes';
import {
  INDEX_PAGE_ROUTE,
  AUTH_URLS,
  WIZARD_PAGE_ROUTE,
  HOUSE_TEAM_PAGE_ROUTE,
  CREATE_EVENT_PAGE_ROUTE,
  VIEW_EVENT_PAGE_ROUTE,
  EVENTS_PAGE_ROUTE,
  HOUSE_TEAM_MEMBER_CREATION_PAGE_ROUTE,
  HOUSE_TEAM_MEMBER_EDIT_PAGE_ROUTE,
  SETTINGS_PROFILE_PAGE_ROUTE,
  PROJECTS_PAGE_ROUTE,
  TASKS_PAGE_ROUTE,
  SUPPORT_PAGE_ROUTE,
  PROJECTS_PAGE_SINGLE_PROJECT,
  TASKS_CREATE_ROUTE,
  HOUSE_DATA_INDEX_PAGE_ROUTE,
  HOUSE_DATA_FOLDER_PAGE_ROUTE,
  HOUSE_DATA_INBOX_ROUTE,
  SETTINGS_HOUSE_PAGE_ROUTE,
  SUBSCRIPTION_PAGE_ROUTE,
  EDIT_EVENT_PAGE_ROUTE,
  CHAT_PAGE_ROUTE,
  HOUSE_PAGE_ROUTE,
  DASHBOARD_PAGE_ROUTE,
  INVITE_PAGE_ROUTE,
  PUBLIC_EVENTS_VIEW
} from 'utils/routes';

// Pages
import { AuthPage } from './authRoutes/AuthPage';
import { ChatPage } from './chat/ChatPage';
import { DashboardPage } from './dashboard/DashboardPage';
import { AllEventsPage } from './events/allEvents/AllEventsPage';
import { EventCreationPage } from './events/eventCreation/EventCreationPage';
import { EventEditPage } from './events/eventEdit/EventEditPage';
import { EventViewPrivatePage } from './events/eventViewPrivate/EventViewPrivatePage';
import { HouseDataFolderPage } from './houseData/HouseDataFolder/HouseDataFolderPage';
import { HouseDataInboxPage } from './houseData/HouseDataInbox/HouseDataInboxPage';
import { HouseDataIndexPage } from './houseData/HouseDataIndex/HouseDataIndexPage';
import { HouseTeamCreateMemberPage } from './houseTeam/HouseTeamCreateMember/HouseTeamCreateMemberPage';
import { HouseTeamEditMemberPage } from './houseTeam/HouseTeamEditMember/HouseTeamEditMemberPage';
import { HouseTeamViewMembersPage } from './houseTeam/HouseTeamViewMembers/HouseTeamViewMembersPage';
import { IndexPage } from './index/IndexPage';
import { InvitePage } from './invite/InvitePage';
import { NotFoundPage } from './notFound/NotFoundPage';
import { AllProjectsPage } from './projects/allProjects/AllProjectsPage';
import { SingleProjectPage } from './projects/singleProject/SingleProjectPage';
import { EventViewPublicPage } from './public/events/EventViewPublicPage';
import { HouseSettingsPage } from './settings/houseSettings/HouseSettingsPage';
import { ProfileSettingsPage } from './settings/profileSettings/ProfileSettingsPage';
import { SubscriptionPage } from './subscription/SubscriptionPage';
import { SupportPage } from './support/SupportPage';
import { AllTasksPage } from './tasks/allTasks/AllTasksPage';
import { CreateTaskPage } from './tasks/createTask/CreateTaskPage';
import { WizardPage } from './wizard/WizardPage';

// Defined routes
const routes: RouteType[] = [
  {
    component: IndexPage,
    exact: true,
    path: INDEX_PAGE_ROUTE
  },
  {
    component: IndexPage,
    exact: true,
    path: HOUSE_PAGE_ROUTE
  },
  {
    component: AuthPage,
    exact: true,
    path: AUTH_URLS
  },
  {
    component: WizardPage,
    exact: true,
    path: WIZARD_PAGE_ROUTE
  },
  {
    component: HouseTeamViewMembersPage,
    exact: true,
    path: HOUSE_TEAM_PAGE_ROUTE
  },
  {
    component: HouseTeamCreateMemberPage,
    exact: true,
    path: HOUSE_TEAM_MEMBER_CREATION_PAGE_ROUTE
  },
  {
    component: HouseTeamEditMemberPage,
    exact: true,
    path: HOUSE_TEAM_MEMBER_EDIT_PAGE_ROUTE
  },
  {
    component: AllEventsPage,
    exact: true,
    path: EVENTS_PAGE_ROUTE
  },
  {
    component: EventCreationPage,
    exact: true,
    path: CREATE_EVENT_PAGE_ROUTE
  },
  {
    component: EventEditPage,
    exact: true,
    path: EDIT_EVENT_PAGE_ROUTE
  },
  {
    component: EventViewPrivatePage,
    exact: true,
    path: VIEW_EVENT_PAGE_ROUTE
  },
  {
    component: ProfileSettingsPage,
    exact: true,
    path: SETTINGS_PROFILE_PAGE_ROUTE
  },
  {
    component: HouseSettingsPage,
    exact: true,
    path: SETTINGS_HOUSE_PAGE_ROUTE
  },
  {
    component: AllProjectsPage,
    exact: true,
    path: PROJECTS_PAGE_ROUTE
  },
  {
    component: SingleProjectPage,
    exact: true,
    path: PROJECTS_PAGE_SINGLE_PROJECT
  },
  {
    component: AllTasksPage,
    exact: true,
    path: TASKS_PAGE_ROUTE
  },
  {
    component: SupportPage,
    exact: true,
    path: SUPPORT_PAGE_ROUTE
  },
  {
    component: CreateTaskPage,
    exact: true,
    path: TASKS_CREATE_ROUTE
  },
  {
    component: HouseDataIndexPage,
    exact: true,
    path: HOUSE_DATA_INDEX_PAGE_ROUTE
  },
  {
    component: HouseDataFolderPage,
    exact: true,
    path: HOUSE_DATA_FOLDER_PAGE_ROUTE
  },
  {
    component: HouseDataInboxPage,
    exact: true,
    path: HOUSE_DATA_INBOX_ROUTE
  },
  {
    component: SubscriptionPage,
    exact: true,
    path: SUBSCRIPTION_PAGE_ROUTE
  },
  {
    component: ChatPage,
    exact: true,
    path: CHAT_PAGE_ROUTE
  },
  {
    component: InvitePage,
    exact: true,
    path: INVITE_PAGE_ROUTE
  },
  {
    component: DashboardPage,
    exact: true,
    path: DASHBOARD_PAGE_ROUTE
  },
  {
    component: EventViewPublicPage,
    exact: true,
    path: PUBLIC_EVENTS_VIEW
  },
  {
    component: NotFoundPage,
    exact: true
  }
];

const AppRoutes = Routes(routes);

export default AppRoutes;
