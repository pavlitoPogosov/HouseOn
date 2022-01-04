import { pathToRegexp } from 'path-to-regexp';

// Authorization
export const INDEX_PAGE_ROUTE = '/';
export const HOUSE_PAGE_ROUTE = '/house/:id(\\d+)';
export const LOGIN_PAGE_ROUTE = '/login';
export const SIGNUP_PAGE_ROUTE = '/signup';
export const PASSWORD_RECOVERY_PAGE_ROUTE = '/password-recovery';
export const PASSWORD_RESET_PAGE_ROUTE = PASSWORD_RECOVERY_PAGE_ROUTE + '/:token';

export const AUTH_URLS = [LOGIN_PAGE_ROUTE, SIGNUP_PAGE_ROUTE, PASSWORD_RECOVERY_PAGE_ROUTE, PASSWORD_RESET_PAGE_ROUTE];

// Wizard
export const WIZARD_PAGE_ROUTE = '/wizard';

// Events
export const EVENTS_PAGE_ROUTE = '/events';
export const CREATE_EVENT_PAGE_ROUTE = `${EVENTS_PAGE_ROUTE}/create-event`;
export const EDIT_EVENT_PAGE_ROUTE = `${EVENTS_PAGE_ROUTE}/edit/:id(\\d+)`;
export const VIEW_EVENT_PAGE_ROUTE = `${EVENTS_PAGE_ROUTE}/view/:id(\\d+)?`;

// House Team
export const HOUSE_TEAM_PAGE_ROUTE = '/house-team';
export const HOUSE_TEAM_MEMBER_CREATION_PAGE_ROUTE = `${HOUSE_TEAM_PAGE_ROUTE}/create-member`;
export const HOUSE_TEAM_MEMBER_EDIT_PAGE_ROUTE = `${HOUSE_TEAM_PAGE_ROUTE}/:id(\\d+)`;

// Projects and Tasks
export const PROJECTS_PAGE_ROUTE = '/projects';
export const PROJECTS_PAGE_SINGLE_PROJECT = `${PROJECTS_PAGE_ROUTE}/:id(\\d+)`;
export const TASKS_PAGE_ROUTE = '/tasks';
export const TASKS_CREATE_ROUTE = `${TASKS_PAGE_ROUTE}/create-task`;

// Support
export const SUPPORT_PAGE_ROUTE = '/support';

// Info
export const TERMS_OF_SERVICE_ROUTE = '/';
export const PRIVACY_POLICY_ROUTE = '/';
export const NOTIFICATION_SETTING_ROUTE = '/';

// Settings
export const SETTINGS_PAGE_ROUTE = '/settings';
export const SETTINGS_PROFILE_PAGE_ROUTE = `${SETTINGS_PAGE_ROUTE}/profile`;
export const SETTINGS_HOUSE_PAGE_ROUTE = `${SETTINGS_PAGE_ROUTE}/house`;

// House Data
export const HOUSE_DATA_INDEX_PAGE_ROUTE = '/house-data';
export const HOUSE_DATA_FOLDER_PAGE_ROUTE = `${HOUSE_DATA_INDEX_PAGE_ROUTE}/folder/:id(\\d+)`;
export const HOUSE_DATA_INBOX_ROUTE = `${HOUSE_DATA_INDEX_PAGE_ROUTE}/inbox`;
export const HOUSE_DATA_DOCUMENTS_ROUTE = `${HOUSE_DATA_INDEX_PAGE_ROUTE}/documents/:id(\d+)`;

// Chat
export const CHAT_PAGE_ROUTE = '/chat';

// Subscription
export const SUBSCRIPTION_PAGE_ROUTE = '/subscription';

// Dashboard page
export const DASHBOARD_PAGE_ROUTE = '/dashboard';

// Invite page
export const INVITE_PAGE_ROUTE = '/invite/:inviteId';

// Public
export const PUBLIC_EVENTS_VIEW = '/public/events/view/:id';
export const PUBLIC_ROUTES = [PUBLIC_EVENTS_VIEW];

export const isPublicEventPage = () => pathToRegexp(PUBLIC_EVENTS_VIEW).test(window.location.pathname);
export const isIndexPage = () => pathToRegexp(INDEX_PAGE_ROUTE).test(window.location.pathname);
export const isHousePage = () => pathToRegexp(HOUSE_PAGE_ROUTE).test(window.location.pathname);
