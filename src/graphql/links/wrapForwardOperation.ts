import { from, Subscribable } from 'rxjs';

import { FetchResult, NextLink, Operation } from '@apollo/client';

/**
 * Оборачивает вызов forward(operation) из apollo-link в Observable
 */
export function wrapForwardOperation(forward: NextLink, operation: Operation) {
  // Исправляем ошибку типов (а может это не только ошибка типов?)
  return from(forward(operation) as any as Subscribable<FetchResult>);
}
