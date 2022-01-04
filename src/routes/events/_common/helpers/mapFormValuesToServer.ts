import { ContactCreateInput, HouseEventCreateInput } from 'graphql/types';

import { EventFormFields } from '../EventForm/EventForm';
import { TEventData } from '../types';

export const mapFormValuesToServer = (values: TEventData): HouseEventCreateInput => {
  const isAllDay = values[EventFormFields.IS_ALL_DAY];

  const startsAt = values[EventFormFields.DATE].startDate
    .clone()
    .set({
      hours: isAllDay ? 0 : values[EventFormFields.STARTS_AT].hours(),
      milliseconds: 0,
      minutes: isAllDay ? 0 : values[EventFormFields.STARTS_AT].minutes(),
      seconds: 0
    })
    .utc();

  const endsAt = (values[EventFormFields.DATE]?.endDate || values[EventFormFields.DATE].startDate)
    .clone()
    .set({
      hours: isAllDay ? 23 : values[EventFormFields.ENDS_AT].hours(),
      milliseconds: 0,
      minutes: isAllDay ? 59 : values[EventFormFields.ENDS_AT].minutes(),
      seconds: 0
    })
    .utc();

  const contactsForm = values[EventFormFields.CONTACTS] as ContactCreateInput[];
  const contacts = contactsForm?.map((contact) => ({
    additional_info: contact.additional_info,
    // id: contact.id,
    phone: contact.phone,
    title: contact.title
  }));

  const valuesToReturn: HouseEventCreateInput = {
    contacts,
    description: values[EventFormFields.DESCRIPTION],
    ends_at: endsAt,
    starts_at: startsAt,
    title: values[EventFormFields.TITLE],
    uses_house_direction: values[EventFormFields.USES_HOUSE_DIRECTION]
  };

  const direction = values[EventFormFields.DIRECTION];

  if (!values[EventFormFields.USES_HOUSE_DIRECTION]) {
    valuesToReturn.direction = {
      additional_info: values[EventFormFields.ADDITIONAL_INFO],
      address: direction.address as string,
      latitude: direction.coordinates?.latitude as number,
      longitude: direction.coordinates?.longitude as number
    };
  }

  return valuesToReturn;
};
