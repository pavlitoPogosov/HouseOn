import { GraphQLScalarType } from 'graphql';
import moment, { Moment } from 'moment';

export const TimeScalar = new GraphQLScalarType({
  name: 'Time',
  description: 'Time custom scalar type',

  serialize(value: Moment): string {
    if (value.isValid()) {
      return value.utc().format('HH:mm:ss.SSSZ');
    } else {
      throw new TypeError(`Time cannot represent an invalid Moment object ${value}.`);
    }
  },

  parseValue(value: string): Moment {
    const date = moment(value, 'HH:mm:ss.SSSZ');
    if (date.isValid()) {
      return date.local();
    } else {
      throw new TypeError(`Time cannot represent an invalid time-string ${value}.`);
    }
  }
});
