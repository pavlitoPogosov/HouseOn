import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useHistory } from 'react-router';

import { useToggle } from '@proscom/ui-react';
import { ReactComponent as ChevronLeftIcon } from 'assets/icons/chevronLeft.svg';
import { Fade } from 'common/components/ui/_animations/Fade/Fade';
import { Button } from 'common/components/ui/Button/Button';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { SortByPopup, SortByPopupOption } from 'common/components/ui/SortByPopup/SortByPopup';
import { IUsualTab, UsualTabs } from 'common/components/ui/Tabs';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useUpdateEffect } from 'common/hooks/useUpdateEffect';
import { HOUSE_DATA_INBOX_ROUTE } from 'utils/routes';

import { AddDocumentModal } from '../../components/AddDocumentModal/AddDocumentModal';

import { DocumentTypeCard, IDocumentTypeCard } from './DocumentTypeCard/DocumentTypeCard';
import { IFolderCard, FolderCard } from './FolderCard/FolderCard';
import { IProjectDataCard, ProjectDataCard } from './ProjectDataCard/ProjectDataCard';

import s from './HouseDataContent.module.scss';

export interface HouseDataContentProps {}

enum TabsValues {
  PROJECTS = '1',
  DOCUMENTS = '2'
}

const TABS: IUsualTab[] = [
  { text: 'Projects', value: TabsValues.PROJECTS },
  { text: 'Types of documents', value: TabsValues.DOCUMENTS }
];

const SORT_POPUP_OPTIONS: SortByPopupOption[] = [
  { text: 'No matter', value: 'no matter' },
  { text: 'Admins', value: 'admins' },
  { text: 'Albert', value: 'albert' }
];

// TODO remove useless data
export const PROJECT_DATA_CARDS: IProjectDataCard[] = [
  { title: 'Inbox', filesCount: 12, isInbox: true },
  ...new Array(5).fill({
    title: 'Server room - House',
    foldersCount: 3,
    filesCount: 12,
    isInbox: false,
    image: ''
  })
];

export const DOCUMENT_TYPE_CARDS: IDocumentTypeCard[] = new Array(8).fill({
  title: 'Real estate documents',
  tags: ['Bills', 'Clothing']
});

export const PROJECT_DATA_FOLDERS: IFolderCard[] = [
  { title: 'Inbox', filesCount: 0 },
  ...new Array(6).fill({
    title: 'Layout schemes',
    filesCount: 2
  })
];

export const HouseDataContent: React.FC<HouseDataContentProps> = () => {
  const [activeTabValue, setActiveTabValue] = useState(TABS[0].value);
  const [selectedProject, setSelectedProject] = useState<IProjectDataCard | null>(null);

  const intl = useIntl();

  const history = useHistory();
  const addModalToggler = useToggle();

  const foundTitle = intl.formatMessage(
    {
      id: 'houseData.projects.found',
      defaultMessage: '{projects, plural, =1 {Found {htmlProjects} project} other {Found {htmlProjects} projects}}',
      description: 'Need to translate word `found` and `project/projects` (singular and plural)'
    },
    { projects: 6, htmlProjects: '<span>6</span>' }
  );

  const handleSortPopupChange = () => {};

  const handleSelectedProjectChange = (project: IProjectDataCard | null) => {
    return () => setSelectedProject(project);
  };

  const handleInboxClick = () => {
    history.push(HOUSE_DATA_INBOX_ROUTE);
  };

  const isDocumentsSelected = activeTabValue === TabsValues.DOCUMENTS;
  const isFoldersSelected = selectedProject && activeTabValue === TabsValues.PROJECTS;

  const renderContent = () => {
    if (isDocumentsSelected) {
      return (
        <div className={s.HouseDataContent__documentsWrapper}>
          {DOCUMENT_TYPE_CARDS.map((card, i) => (
            <DocumentTypeCard key={i} card={card} containerClassName={s.HouseDataContent__documentsCard} />
          ))}
        </div>
      );
    }

    if (isFoldersSelected) {
      return (
        <>
          <Text variant={TextPropsVariantsEnum.H3} as="div" className={s.HouseDataContent__returnBackTitle}>
            <IconCircle
              width={32}
              height={32}
              icon={<ChevronLeftIcon />}
              onClick={handleSelectedProjectChange(null)}
              className={s.HouseDataContent__returnBackIcon}
            />
            Server room - House
          </Text>

          <div className={s.HouseDataContent__cardsWrapper}>
            {PROJECT_DATA_FOLDERS.map((card, i) => (
              <FolderCard key={i} card={card} />
            ))}
          </div>
        </>
      );
    }

    return (
      <div className={s.HouseDataContent__cardsWrapper}>
        {PROJECT_DATA_CARDS.map((card, i) => (
          <ProjectDataCard
            key={i}
            card={card}
            onClick={card.isInbox ? handleInboxClick : handleSelectedProjectChange(card)}
          />
        ))}
      </div>
    );
  };

  useUpdateEffect(() => {
    setSelectedProject(null);
  }, [activeTabValue]);

  return (
    <div className={s.HouseDataContent__container}>
      <AddDocumentModal isOpen={addModalToggler.value} onClose={addModalToggler.unset} />

      <div className={s.HouseDataContent__header}>
        <UsualTabs
          tabs={TABS}
          value={activeTabValue}
          onChange={setActiveTabValue}
          containerClassName={s.HouseDataContent__tabsContainer}
          tabClassName={s.HouseDataContent__tab}
        />

        <SortByPopup
          options={SORT_POPUP_OPTIONS}
          selectedOption={SORT_POPUP_OPTIONS[0]}
          onChange={handleSortPopupChange}
          selectedTextPrefix="Created by:"
          containerClassName={s.HouseDataContent__sortPopup}
          size="sm"
        />
        <Button color="orange" className={s.HouseDataContent__addBtn} size="s" onClick={addModalToggler.set}>
          <FormattedMessage id="houseData.button.addDocument" defaultMessage="Add document" />
        </Button>
      </div>

      {!isFoldersSelected && (
        <Text variant={TextPropsVariantsEnum.BODY_M} className={s.HouseDataContent__foundTitle} as="div">
          <div dangerouslySetInnerHTML={{ __html: foundTitle }} />
        </Text>
      )}

      <Fade key={activeTabValue + selectedProject?.title} isActive>
        {renderContent()}
      </Fade>
    </div>
  );
};
