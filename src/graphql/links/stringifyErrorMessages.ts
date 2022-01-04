import { produce } from 'immer';
import { throwError } from 'rxjs';

import { ApolloLink } from '@apollo/client';
import { catchError, map } from 'rxjs/operators';

import { wrapForwardOperation } from './wrapForwardOperation';

/**
 * Выполняет JSON.stringify на error.message для всех ошибок graphql
 *
 * Это нужно, потому что Apollo оборачивает ошибки GraphQL в ApolloError, где вызывается error.message.toString()
 * nestjs в этом поле возвращает объект, который при конвертации в строку становится [Object object] что неудобно
 */
export const createStringifyErrorMessagesLink = (): ApolloLink =>
  new ApolloLink((operation, forward): any => {
    const correctErrors = produce((errors) => {
      errors.forEach((error: any) => {
        if (typeof error.message !== 'string') {
          error.message = JSON.stringify(error.message);
        }
      });
    });

    return wrapForwardOperation(forward, operation).pipe(
      map((result) => {
        if (result.errors) {
          result.errors = correctErrors(result.errors);
        }
        return result;
      }),
      catchError((error) => {
        if (error && error.result && error.result.errors) {
          error.result.errors = correctErrors(error.result.errors);
        }
        return throwError(error);
      })
    );
  });
