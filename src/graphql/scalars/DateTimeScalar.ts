import { GraphQLScalarType } from 'graphql';
import moment, { Moment } from 'moment';

export const DateTimeScalar = new GraphQLScalarType({
  name: 'DateTime',
  description: 'Date custom scalar type',

  serialize(value: Moment): string {
    if (value.isValid()) {
      return value.utc().toISOString();
    } else {
      throw new TypeError(`DateTime cannot represent an invalid Moment object ${value}.`);
    }
  },

  parseValue(value: string): Moment {
    const date = moment(value);
    if (date.isValid()) {
      return date.local();
    } else {
      throw new TypeError(`DateTime cannot represent an invalid date-time-string ${value}.`);
    }
  }
});
