import { Operation } from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';

function operationHasMutation(operation: Operation): boolean {
  try {
    return operation.query.definitions.some((def) => 'operation' in def && def.operation === 'mutation');
  } catch {
    return true;
  }
}

export function createRetryOnNetworkErrorLink(): RetryLink {
  return new RetryLink({
    delay: {
      initial: 300,
      max: 30000,
      jitter: true
    },
    attempts: {
      max: Infinity,
      retryIf: (error, _operation) => {
        // Если есть хоть одна мутация в запросе - не повторяем,
        // т.к. может изменение внестись два раза
        if (operationHasMutation(_operation)) {
          return false;
        }
        // Ошибка может быть как ошибкой graphql, так и ошибкой сети
        if (error) {
          // Иногда fetch возвращает TypeError, если запрос не удается выполнить
          if (error instanceof TypeError) {
            return error.message === 'Failed to fetch';
          }
          // Если ошибка сервера, то пробуем повторить
          if (error.statusCode >= 500 && error.statusCode <= 599) {
            return true;
          }
        }
        return false;
      }
    }
  });
}
