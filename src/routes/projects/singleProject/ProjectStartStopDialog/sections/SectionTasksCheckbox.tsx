import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import { useFormikContext } from 'formik';

import { IProject } from 'common/components/ui/_cards/ProjectCard/types';
import { CheckboxField } from 'common/components/ui/_formikComponents/CheckboxField/CheckboxField';
import { Accordion } from 'common/components/ui/Accordion/Accordion';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { createTaskFieldName } from 'routes/projects/singleProject/ProjectStartStopDialog/createTaskFieldName';
import s from 'routes/projects/singleProject/ProjectStartStopDialog/sections/styles.module.scss';
import {
  EProjectStartedContentFields,
  TProjectStartedDielogForm
} from 'routes/projects/singleProject/ProjectStartStopDialog/types';

type TSectionTasksCheckbox = {
  isTasks: boolean;
  project: IProject | undefined;
  tasksFields: string[];
  tasksTitle: string;
};

export const SectionTasksCheckbox: React.FC<TSectionTasksCheckbox> = (props) => {
  const { isTasks, project, tasksFields, tasksTitle } = props;

  const mainCheckboxName = EProjectStartedContentFields.ALL_TASKS;

  const { setFieldValue, values } = useFormikContext<TProjectStartedDielogForm>();

  const mainCheckboxField = values[mainCheckboxName];

  const isAccordionOpen = typeof mainCheckboxField === 'boolean' && !mainCheckboxField;

  useEffect(() => {
    if (typeof mainCheckboxField === 'boolean') {
      if (mainCheckboxField) {
        tasksFields?.forEach((field) => setFieldValue(field, true));
      } else {
        tasksFields?.forEach((field) => setFieldValue(field, false));
      }
    }
  }, [mainCheckboxField]);

  return (
    <div className={s.ProjectStartedContent__tasks_wrapper}>
      <Text className={s.tasks__title} color="textSecondary" variant={TextPropsVariantsEnum.BODY_M}>
        <FormattedMessage defaultMessage="You can:" id="project.modal.starting.tasks.title" />
      </Text>

      {isTasks && (
        <div className={s.tasks__container}>
          <Accordion
            checkBoxName={mainCheckboxName}
            containerClassName={s.tasks__accordion}
            headerCheckboxTextClassName={s.tasks__accordion_header_checkbox_text}
            headerClassName={s.tasks__accordion_header}
            headerIconClassName={s.tasks__accordion_header_icon}
            isOpen={isAccordionOpen}
            title={tasksTitle}
            toggleableClassName={s.tasks__accordion_toggleable}>
            <div className={s.tasks__list}>
              {project?.tasks.map((task) => (
                <CheckboxField
                  containerClassName={s.tasks__task_container}
                  key={task.id}
                  name={createTaskFieldName(task)}
                  text={task.title}
                  textClassName={s.tasks__task_text}
                />
              ))}
            </div>
          </Accordion>
        </div>
      )}
    </div>
  );
};
